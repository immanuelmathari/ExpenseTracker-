created on 5th April 2025

8.126
> npx create-expo-app@latest --template blank ExpenseTracker 
- add screens and components folder
- we will have three screens a) recent expenses b) all overall expenses c) manage expenses (add expense, delete expense)
- add the AllExpenses.js, ManageExpense.js, RecentExpenses.js

> npm install @react-navigation/native
> expo install react-native-screens react-native-safe-area-context

- this time we want to use bottom navigator
> npm install @react-navigation/native-stack
> npm install @react-navigation/bottom-tabs

8.127 Adding Navigation & configuring it.
- so as you well know, we need to install NavigationContainer 
- we want to create a stack and a bottom tab 

- we want manageexpense always available and not to have bottom navigators
App.js
- so the logic is that we want to have a screen that can have two pages of RecentExpenses and All Expenses with a bottom navigator and then stacked ontop of it is the ManageExpense

8.128 Adding Global Colors & Editing Navigation
App.js
- we want to see header of tabs navigator not stack navigator so that we dont have two navigators
- we use at the Stack.Screen options={{headerShown: false}} to remove the header for the Stack Screen one
- then in 04 we have ScreenOptions which comes after doing 05
- we create a file
constants/styles.js 
to hold Global constants
then goback to 
App.js @//02 to do screenOptions
- now with what we have done so far with the options of the BottomsTabs.Navigator, we have something that is becoming. 
- set options of BottomTabs.Screen
- for the icons, we use Ionicons

8.129 Creating key app components to show expenses