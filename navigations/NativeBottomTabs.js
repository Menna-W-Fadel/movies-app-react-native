import Routers from "../utils/routes/routers";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import BrowseScreen from "../screens/BrowseScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../utils/theme/Theme"; 
import { mainStyles } from "../utils/theme/styles";
import { HomeStack } from "./StackNavigation";

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: "home",
  Browse: "grid",
  Favorites: "heart",
};

const LumiereTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={40} tint="dark" style={[styles.blurContainer, { backgroundColor: Theme.colors.card + 'D9' }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem}>
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={TAB_ICONS[route.name] || "alert-circle"}
                  size={24}
                  color={isFocused ? Theme.colors.primary : Theme.colors.mutedForeground}
                />
                {isFocused && <View style={[styles.activeGlow, mainStyles.shadowElegant]} />}
              </View>
              <Text style={[
                mainStyles.textSans, 
                { fontSize: 10, marginTop: 4, color: isFocused ? Theme.colors.primary : Theme.colors.mutedForeground }
              ]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

function NativeBottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <LumiereTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={Routers.home} component={HomeStack} />
      <Tab.Screen name={Routers.browse} component={BrowseScreen} />
      <Tab.Screen name={Routers.favorite} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 35,
    left: 20,
    right: 20,
  },
  blurContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70, 
    borderRadius: Theme.radius.xl, 
    borderWidth: 1,
    borderColor: Theme.colors.border,
    elevation: 20,
    overflow: 'hidden',
  },
  tabItem: { alignItems: "center", justifyContent: "center", flex: 1 },
  iconWrapper: { alignItems: "center", justifyContent: "center" },
  activeGlow: {
    position: "absolute",
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary + '26', 
  },
});

export default NativeBottomTabs;
