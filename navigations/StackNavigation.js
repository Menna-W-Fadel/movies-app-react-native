import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import Routers from "../utils/routes/routers";
import CategoryResultsScreen from "../screens/CategoryResultsScreen";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routers.homeStack} component={HomeScreen} />
      <Stack.Screen
        name={Routers.movieDetails}
        component={MovieDetailsScreen}
      />
      <Stack.Screen
        name={Routers.categoryResults}
        component={CategoryResultsScreen}
      />
    </Stack.Navigator>
  );
}
