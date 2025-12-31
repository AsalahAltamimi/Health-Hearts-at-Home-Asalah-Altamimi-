# Health Hearts at Home - CHD Caregiver Support App

A comprehensive React Native mobile application designed to support caregivers of children with Congenital Heart Disease (CHD). This bilingual (English/Arabic) app provides essential resources, tracking tools, and support information for families navigating CHD care.

## Features

- 🌐 **Bilingual Support**: Full English and Arabic language support with RTL layout
- 🔐 **User Authentication**: Secure login/signup with Firebase Authentication
- 📊 **Health Tracking**: Track feeding, weight, blood pressure, and pulse oximetry
- 📈 **Charts & Trends**: Visualize health data over time
- 📚 **Educational Resources**: Articles, videos, tutorials, and reliable medical information
- 🏥 **Hospital Information**: Access to hospital details, contacts, and cafeteria menus
- 👥 **Support Groups**: Connect with caregiver support groups and communities
- 📝 **Journal**: Keep personal notes and records
- 📞 **Emergency Contacts**: Quick access to emergency and personal contacts
- 🎥 **Video Library**: Educational videos and patient stories
- 📖 **Spiritual Resources**: Devotionals and spiritual support materials

## Technology Stack

- **React Native** with Expo
- **Firebase** (Authentication & Firestore)
- **React Navigation** (Drawer & Stack navigators)
- **React Native Paper** (UI components)
- **i18next** (Internationalization)
- **AsyncStorage** (Local data persistence)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase project configured

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AsalahAltamimi/Health-Hearts-at-Home-Asalah-Altamimi-.git
   cd Health-Hearts-at-Home-Asalah-Altamimi-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Update `config/firebase.js` with your Firebase configuration

4. Start the app:
   ```bash
   npx expo start
   ```

## Project Structure

```
├── components/          # Reusable UI components
├── config/             # Configuration files (Firebase)
├── context/            # React Context providers
├── data/               # JSON data files (articles, contacts, etc.)
├── screens/            # Screen components
├── translations/       # i18n translation files
└── assets/             # Images and static assets
```

## Development

This project uses:
- **Expo SDK 54**
- **React Navigation 6**
- **Firebase SDK 10**

## Contributing

This is a project for supporting CHD caregivers. Contributions and feedback are welcome.

## License

This project is created for educational and support purposes.

## Support

For questions or support, please contact the development team.

---

**Health Hearts at Home** - Supporting caregivers, one heartbeat at a time ❤️
