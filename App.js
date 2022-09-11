import Categories from "./screens/Categories";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventToggle from "./screens/EventToggle";
import Web from "./screens/Web";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Categories}
          options={{
            title: "ALLEvents.in",
            headerStyle: {
              backgroundColor: "#25316D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name="Toggle"
          component={EventToggle}
          options={({ route }) => ({
            title: route.params.item["category"],
            headerTitleStyle: { fontSize: 30, textTransform: "capitalize" },
          })}
        />
        <Stack.Screen name="Web" component={Web} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
