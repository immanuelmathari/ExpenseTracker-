import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';

// 02
const Stack = createNativeStackNavigator(); // this is what gives us the navigator component and the one for registering screens
const BottomTabs = createBottomTabNavigator();

// 04
function ExpensesOverview() {
  // return <BottomTabs.Navigator screenOptions={{
  //   headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
  //   headerTintColor: 'white',
  //   tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
  //   tabBarActiveTintColor: GlobalStyles.colors.accent500,
  //   // we want to use headerTintColor for the icon color and React Native exposes a prop for that
  //   headerRight: ({tintColor}) => <IconButton icon="add" size={24} color={tintColor} onPress={() => { }} />,
  // }}>
  return <BottomTabs.Navigator screenOptions={({ navigation}) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    // we want to use headerTintColor for the icon color and React Native exposes a prop for that
    headerRight: ({tintColor}) => <IconButton icon="add" size={24} color={tintColor} onPress={() => {
      navigation.navigate('ManageExpense');
     }} />,
  })}>
    {/* goto styles.js */}
    {/* now we register the different screens we need */}
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => (
      <Ionicons name="hourglass" size={size} color={color} />
      )
      }}  />
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
      title: 'All Expenses',
      tabBarLabel: 'All Expenses',
      tabBarIcon: ({color, size}) => (
      <Ionicons name="calendar" size={size} color={color} />
      )
      }}  />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    {/* 01 */}
    <NavigationContainer>
      {/* 03 */}
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
      }}>
        {/* 05 we want also the bottom tabs  */}
        <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{ headerShown: false}} />
        <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
          presentation: 'modal',
        }} />
        {/* go back to 4 at the screen options */}
        
      </Stack.Navigator>

    </NavigationContainer>
    </>
  );
}

