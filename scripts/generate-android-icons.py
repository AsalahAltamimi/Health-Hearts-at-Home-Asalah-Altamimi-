#!/usr/bin/env python3
"""
Android Adaptive Icon Generator
Generates Android 13-compliant adaptive launcher icons from a source icon.
Creates foreground, background, and monochrome variants for all mipmap densities.
"""

import argparse
import sys
from pathlib import Path
from PIL import Image, ImageEnhance
import json

# Android 13 Adaptive Icon Specifications
SAFE_ZONE_DP = 108  # Outer bounds
INNER_SAFE_ZONE_DP = 66  # Inner safe zone to prevent cropping

# Mipmap density multipliers
MIPMAP_DENSITIES = {
    'mdpi': 1.0,      # 108x108px
    'hdpi': 1.5,      # 162x162px
    'xhdpi': 2.0,     # 216x216px
    'xxhdpi': 3.0,    # 324x324px
    'xxxhdpi': 4.0    # 432x432px
}


def load_app_config():
    """Load background color from app.json"""
    app_json_path = Path(__file__).parent.parent / 'app.json'
    try:
        with open(app_json_path, 'r') as f:
            config = json.load(f)
            bg_color = config.get('expo', {}).get('android', {}).get('adaptiveIcon', {}).get('backgroundColor', '#4ECDC4')
            return bg_color
    except Exception as e:
        print(f"Warning: Could not load app.json, using default color: {e}")
        return '#4ECDC4'


def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def create_foreground_icon(source_icon, size):
    """
    Create foreground icon by centering the source icon within safe zone.
    Icon is resized to fit within 66dp inner safe zone to prevent cropping.
    """
    # Calculate inner safe zone size (66dp)
    inner_size = int(size * (INNER_SAFE_ZONE_DP / SAFE_ZONE_DP))
    
    # Resize source icon to fit inner safe zone while maintaining aspect ratio
    source_icon.thumbnail((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Create transparent canvas
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Calculate position to center the icon
    x_offset = (size - source_icon.width) // 2
    y_offset = (size - source_icon.height) // 2
    
    # Paste icon onto canvas
    if source_icon.mode == 'RGBA':
        canvas.paste(source_icon, (x_offset, y_offset), source_icon)
    else:
        canvas.paste(source_icon, (x_offset, y_offset))
    
    return canvas


def create_background_icon(source_icon, size, bg_color):
    """
    Create background icon by extracting background from source or using solid color.
    """
    # Try to extract background from edges of the icon
    # Get corner pixels to determine background
    width, height = source_icon.size
    corners = [
        source_icon.getpixel((0, 0)),
        source_icon.getpixel((width-1, 0)),
        source_icon.getpixel((0, height-1)),
        source_icon.getpixel((width-1, height-1))
    ]
    
    # Check if we can extract a background color
    # If corners are similar, use that color; otherwise use provided bg_color
    if source_icon.mode == 'RGBA':
        # Check if corners have similar RGB values (within threshold)
        corner_colors = [c[:3] for c in corners if len(c) >= 3]
        if corner_colors and len(set(corner_colors)) == 1:
            bg_rgb = corner_colors[0]
        else:
            bg_rgb = hex_to_rgb(bg_color)
    else:
        # For non-RGBA images, try to use corner color or fallback
        if len(set(corners)) == 1:
            bg_rgb = corners[0] if isinstance(corners[0], tuple) else hex_to_rgb(bg_color)
        else:
            bg_rgb = hex_to_rgb(bg_color)
    
    # Create solid color background
    if isinstance(bg_rgb, tuple) and len(bg_rgb) == 3:
        background = Image.new('RGB', (size, size), bg_rgb)
    else:
        # Fallback to hex color
        background = Image.new('RGB', (size, size), hex_to_rgb(bg_color))
    
    return background


def create_monochrome_icon(source_icon, size):
    """
    Create monochrome icon by converting to grayscale.
    """
    # Calculate inner safe zone size
    inner_size = int(size * (INNER_SAFE_ZONE_DP / SAFE_ZONE_DP))
    
    # Resize source icon to fit inner safe zone
    source_icon.thumbnail((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Convert to grayscale
    if source_icon.mode != 'L':
        grayscale = source_icon.convert('L')
    else:
        grayscale = source_icon
    
    # Enhance contrast for better visibility
    enhancer = ImageEnhance.Contrast(grayscale)
    grayscale = enhancer.enhance(1.2)  # Increase contrast by 20%
    
    # Create transparent canvas
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Convert grayscale to RGBA for transparency support
    if grayscale.mode == 'L':
        grayscale = grayscale.convert('RGBA')
    
    # Calculate position to center the icon
    x_offset = (size - grayscale.width) // 2
    y_offset = (size - grayscale.height) // 2
    
    # Paste grayscale icon onto canvas
    canvas.paste(grayscale, (x_offset, y_offset), grayscale)
    
    return canvas


def generate_mipmap_icons(source_icon_path, output_dir, bg_color):
    """
    Generate all mipmap density icons for foreground, background, and monochrome.
    """
    # Load source icon
    try:
        source_icon = Image.open(source_icon_path)
        print(f"Loaded source icon: {source_icon_path} ({source_icon.size[0]}x{source_icon.size[1]})")
    except Exception as e:
        print(f"Error loading source icon: {e}")
        sys.exit(1)
    
    # Ensure source icon has alpha channel for proper processing
    if source_icon.mode != 'RGBA':
        source_icon = source_icon.convert('RGBA')
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Generate base icons (xxxhdpi size for highest quality)
    base_size = int(SAFE_ZONE_DP * MIPMAP_DENSITIES['xxxhdpi'])  # 432px
    
    print("Generating base icons...")
    foreground_base = create_foreground_icon(source_icon.copy(), base_size)
    background_base = create_background_icon(source_icon.copy(), base_size, bg_color)
    monochrome_base = create_monochrome_icon(source_icon.copy(), base_size)
    
    # Save base icons to assets/images/
    foreground_base.save(output_path / 'android-icon-foreground.png', 'PNG')
    background_base.save(output_path / 'android-icon-background.png', 'PNG')
    monochrome_base.save(output_path / 'android-icon-monochrome.png', 'PNG')
    print(f"Saved base icons to {output_path}")
    
    # Generate mipmap density versions
    android_res_path = Path(__file__).parent.parent / 'android' / 'app' / 'src' / 'main' / 'res'
    
    for density, multiplier in MIPMAP_DENSITIES.items():
        size = int(SAFE_ZONE_DP * multiplier)
        mipmap_dir = android_res_path / f'mipmap-{density}'
        mipmap_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"Generating {density} icons ({size}x{size}px)...")
        
        # Resize base icons to this density
        foreground = foreground_base.resize((size, size), Image.Resampling.LANCZOS)
        background = background_base.resize((size, size), Image.Resampling.LANCZOS)
        monochrome = monochrome_base.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save to mipmap directory
        foreground.save(mipmap_dir / 'ic_launcher_foreground.png', 'PNG')
        background.save(mipmap_dir / 'ic_launcher_background.png', 'PNG')
        monochrome.save(mipmap_dir / 'ic_launcher_monochrome.png', 'PNG')
        
        # Create combined launcher icon (foreground + background)
        # For adaptive icons, Android combines these at runtime, but we can create a preview
        combined = Image.new('RGB', (size, size))
        combined.paste(background, (0, 0))
        if foreground.mode == 'RGBA':
            combined.paste(foreground, (0, 0), foreground)
        else:
            combined.paste(foreground, (0, 0))
        combined.save(mipmap_dir / 'ic_launcher.png', 'PNG')
        
        print(f"  Saved to {mipmap_dir}")
    
    print("\n✓ All icons generated successfully!")
    print(f"\nGenerated files:")
    print(f"  - {output_path / 'android-icon-foreground.png'}")
    print(f"  - {output_path / 'android-icon-background.png'}")
    print(f"  - {output_path / 'android-icon-monochrome.png'}")
    print(f"\nAndroid mipmap structure created at:")
    print(f"  {android_res_path}")


def main():
    parser = argparse.ArgumentParser(
        description='Generate Android 13 adaptive launcher icons from a source icon',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/generate-android-icons.py
  python scripts/generate-android-icons.py --input assets/images/icon.png
  python scripts/generate-android-icons.py --input icon.png --output assets/images/
        """
    )
    
    parser.add_argument(
        '--input',
        '-i',
        type=str,
        default='assets/images/icon.png',
        help='Path to source icon image (default: assets/images/icon.png)'
    )
    
    parser.add_argument(
        '--output',
        '-o',
        type=str,
        default='assets/images',
        help='Output directory for base icons (default: assets/images)'
    )
    
    parser.add_argument(
        '--background-color',
        '-b',
        type=str,
        default=None,
        help='Background color in hex format (e.g., #4ECDC4). If not provided, will try to extract from icon or use app.json value.'
    )
    
    args = parser.parse_args()
    
    # Validate input file
    input_path = Path(__file__).parent.parent / args.input
    if not input_path.exists():
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)
    
    # Get background color
    if args.background_color:
        bg_color = args.background_color
    else:
        bg_color = load_app_config()
    
    print(f"Using background color: {bg_color}")
    
    # Generate icons
    output_dir = Path(__file__).parent.parent / args.output
    generate_mipmap_icons(input_path, output_dir, bg_color)


if __name__ == '__main__':
    main()

