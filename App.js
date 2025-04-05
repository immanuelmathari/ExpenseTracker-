import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

// 02
const Stack = createNativeStackNavigator(); // this is what gives us the navigator component and the one for registering screens
const BottomTabs = createBottomTabNavigator();

// 04
function ExpensesOverview() {
  return <BottomTabs.Navigator>
    {/* now we register the different screens we need */}
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    {/* 01 */}
    <NavigationContainer>
      {/* 03 */}
      <Stack.Navigator>
        {/* 05 we want also the bottom tabs  */}
        <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
        <Stack.Screen name="ManageExpense" component={ManageExpense} />
        
      </Stack.Navigator>

    </NavigationContainer>
    </>
  );
}

