import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { I18nManager, View } from "react-native";
import { useLanguage } from "./context/LanguageContext";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LanguageHeaderToggle from "./components/LanguageHeaderToggle";
import CustomDrawerContent from "./components/CustomDrawerContent";
import { LanguageProvider, useT } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Loader from "./components/Loader";

// Auth Screens
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ResetPassword from "./screens/ResetPassword";

// Main Screens
import AboutCHD from "./screens/AboutCHD";
import CaregiverSupport from "./screens/CaregiverSupport";
import Contacts from "./screens/Contacts";
import GeneralInfo from "./screens/GeneralInfo";
import Home from "./screens/Home";
import HospitalInformation from "./screens/HospitalInformation";
import SpiritualNeeds from "./screens/SpiritualNeeds";
import TrackYourChild from "./screens/TrackYourChild";
import Tutorials from "./screens/Tutorials";

// Sub-screens
import TutorialCategory from "./screens/TutorialCategory";
import Devotionals from "./screens/Devotionals";
import SpiritualResources from "./screens/SpiritualResources";
import LibraryOfInfo from "./screens/LibraryOfInfo";
import DevelopmentByAge from "./screens/DevelopmentByAge";
import VaccinesInfo from "./screens/VaccinesInfo";
import FormulaMixes from "./screens/FormulaMixes";
import NewbornCareWebsites from "./screens/NewbornCareWebsites";
import TrackFeeding from "./screens/TrackFeeding";
import TrackWeight from "./screens/TrackWeight";
import TrackBloodPressure from "./screens/TrackBloodPressure";
import TrackPulseOx from "./screens/TrackPulseOx";
import Journal from "./screens/Journal";
import Charts from "./screens/Charts";
import ExportData from "./screens/ExportData";
import HospitalWeblinks from "./screens/HospitalWeblinks";
import HospitalShowers from "./screens/HospitalShowers";
import CafeteriaMenu from "./screens/CafeteriaMenu";
import FollowUps from "./screens/FollowUps";
import SupportGroups from "./screens/SupportGroups";
import SupportGroupDetail from "./screens/SupportGroupDetail";
import PersonalContacts from "./screens/PersonalContacts";
import EmergencyContacts from "./screens/EmergencyContacts";
import PatientStories from "./screens/PatientStories";
import Articles from "./screens/Articles";
import ReliableWebsites from "./screens/ReliableWebsites";
import CHDVideos from "./screens/CHDVideos";
import LibraryDefects from "./screens/LibraryDefects";
import CHDMedications from "./screens/CHDMedications";
import HospitalDetails from "./screens/HospitalDetails";
import GeneralCareDetail from "./screens/GeneralCareDetail";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Color Palette
const primaryColor = "#4ECDC4";      // Caregiver Teal
const secondaryColor = "#FFB89E";    // Warm Peach
const backgroundColor = "#F4F4F4";   // Soft Grey
const textColor = "#34495E";         // Deep Slate
const accentColor = "#FFE66D";       // Hope Yellow

const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
    surface: "#FFFFFF",
  },
};

const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: primaryColor,
    background: backgroundColor,
    card: "#FFFFFF",
    text: textColor,
    border: "#E0E0E0",
  },
};

function DrawerNavigator() {
  const t = useT();
  const { isRTL } = useLanguage();
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerPosition={isRTL ? "right" : "left"}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: primaryColor },
        headerTintColor: "#FFFFFF",
        headerTitleAlign: "center",
        headerRight: () => <LanguageHeaderToggle />,
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ drawerLabel: t("home"), headerTitle: t("home"), title: t("home"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="home-outline" color={color} size={size} />) }} />
      <Drawer.Screen name="GeneralInfo" component={GeneralInfo} options={{ drawerLabel: t("generalInfo"), headerTitle: t("generalInfo"), title: t("generalInfo"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="information-outline" color={color} size={size} />) }} />
      <Drawer.Screen name="Tutorials" component={Tutorials} options={{ drawerLabel: t("tutorials"), headerTitle: t("tutorials"), title: t("tutorials"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="play-circle-outline" color={color} size={size} />) }} />
      <Drawer.Screen name="SpiritualNeeds" component={SpiritualNeeds} options={{ drawerLabel: t("spiritualNeeds"), headerTitle: t("spiritualNeeds"), title: t("spiritualNeeds"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="hand-heart" color={color} size={size} />) }} />
      <Drawer.Screen name="HospitalInfo" component={HospitalInformation} options={{ drawerLabel: t("hospitalInfo"), headerTitle: t("hospitalInfo"), title: t("hospitalInfo"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="hospital-building" color={color} size={size} />) }} />
      <Drawer.Screen name="CaregiverSupport" component={CaregiverSupport} options={{ drawerLabel: t("caregiverSupport"), headerTitle: t("caregiverSupport"), title: t("caregiverSupport"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="account-heart-outline" color={color} size={size} />) }} />
      <Drawer.Screen name="TrackYourChild" component={TrackYourChild} options={{ drawerLabel: t("trackYourChild"), headerTitle: t("trackYourChild"), title: t("trackYourChild"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="baby-face-outline" color={color} size={size} />) }} />
      <Drawer.Screen name="AboutCHD" component={AboutCHD} options={{ drawerLabel: t("aboutCHD"), headerTitle: t("aboutCHD"), title: t("aboutCHD"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="book-open-page-variant" color={color} size={size} />) }} />
      <Drawer.Screen name="Contacts" component={Contacts} options={{ drawerLabel: t("contacts"), headerTitle: t("contacts"), title: t("contacts"), drawerIcon: ({ color, size }) => (<LanguageToggleIcon name="phone" color={color} size={size} />) }} />
    </Drawer.Navigator>
  );
}

function LanguageToggleIcon({ name, color, size }) {
  const { Icon } = require("react-native-paper");
  return <Icon source={name} color={color} size={size} />;
}

function MainStackNavigator() {
  const t = useT();
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: primaryColor }, headerTintColor: "#FFFFFF" }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      
      {/* Tutorials sub-screens */}
      <Stack.Screen name="TutorialCategory" component={TutorialCategory} options={{ headerTitle: t("tutorials") }} />
      
      {/* Spiritual Needs sub-screens */}
      <Stack.Screen name="Devotionals" component={Devotionals} options={{ headerTitle: t("devotionals") }} />
      <Stack.Screen name="SpiritualResources" component={SpiritualResources} options={{ headerTitle: t("resources") }} />
      
      {/* General Info sub-screens */}
      <Stack.Screen name="LibraryOfInfo" component={LibraryOfInfo} options={{ headerTitle: t("library_of_info") }} />
      <Stack.Screen name="DevelopmentByAge" component={DevelopmentByAge} options={{ headerTitle: t("development_by_age") }} />
      <Stack.Screen name="VaccinesInfo" component={VaccinesInfo} options={{ headerTitle: t("vaccines_info") }} />
      <Stack.Screen name="FormulaMixes" component={FormulaMixes} options={{ headerTitle: t("formula_mixes") }} />
      <Stack.Screen name="NewbornCareWebsites" component={NewbornCareWebsites} options={{ headerTitle: t("newborn_care_websites") }} />
      <Stack.Screen name="GeneralCareDetail" component={GeneralCareDetail} options={{ headerTitle: t("general_care_detail") }} />
      
      {/* Track Your Child sub-screens */}
      <Stack.Screen name="TrackFeeding" component={TrackFeeding} options={{ headerTitle: t("feeding") }} />
      <Stack.Screen name="TrackWeight" component={TrackWeight} options={{ headerTitle: t("weight") }} />
      <Stack.Screen name="TrackBloodPressure" component={TrackBloodPressure} options={{ headerTitle: t("blood_pressure") }} />
      <Stack.Screen name="TrackPulseOx" component={TrackPulseOx} options={{ headerTitle: t("pulse_ox") }} />
      <Stack.Screen name="Charts" component={Charts} options={{ headerTitle: t("charts_title") }} />
      <Stack.Screen name="ExportData" component={ExportData} options={{ headerTitle: t("export_title") }} />
      
      {/* Hospital Information sub-screens */}
      <Stack.Screen name="HospitalWeblinks" component={HospitalWeblinks} options={{ headerTitle: t("weblinks") }} />
      <Stack.Screen name="HospitalShowers" component={HospitalShowers} options={{ headerTitle: t("hospital_showers") }} />
      <Stack.Screen name="CafeteriaMenu" component={CafeteriaMenu} options={{ headerTitle: t("cafeteria_menu") }} />
      <Stack.Screen name="FollowUps" component={FollowUps} options={{ headerTitle: t("follow_ups") }} />
      <Stack.Screen name="HospitalDetails" component={HospitalDetails} options={{ headerTitle: t("hospital_details") }} />
      
      {/* Caregiver Support sub-screens */}
      <Stack.Screen name="SupportGroups" component={SupportGroups} options={{ headerTitle: t("support_groups") }} />
      <Stack.Screen name="SupportGroupDetail" component={SupportGroupDetail} options={{ headerTitle: t("support_group_details") }} />
      <Stack.Screen name="Articles" component={Articles} options={{ headerTitle: t("articles") }} />
      <Stack.Screen name="PersonalContacts" component={PersonalContacts} options={{ headerTitle: t("personal_contacts_title") }} />
      <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} options={{ headerTitle: t("emergency_contacts_title") }} />
      <Stack.Screen name="PatientStories" component={PatientStories} options={{ headerTitle: t("patient_stories") }} />
      <Stack.Screen name="Journal" component={Journal} options={{ headerTitle: t("journal_title") }} />
      
      {/* About CHD sub-screens */}
      <Stack.Screen name="ReliableWebsites" component={ReliableWebsites} options={{ headerTitle: t("reliable_websites") }} />
      <Stack.Screen name="CHDVideos" component={CHDVideos} options={{ headerTitle: t("videos_defects") }} />
      <Stack.Screen name="LibraryDefects" component={LibraryDefects} options={{ headerTitle: t("library_defects") }} />
      <Stack.Screen name="CHDMedications" component={CHDMedications} options={{ headerTitle: t("medications") }} />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={MainStackNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  React.useEffect(() => {
    // Ensure app respects RTL if previously set
    I18nManager.allowRTL(I18nManager.isRTL);
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <NavigationContainer theme={navigationTheme}>
              <AuthNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}


