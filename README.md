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
- we want to output our expenses
- we created a component
ExpensesOutput/ExpensesOutput.js
ExpensesOutput.js
- we want to show the list in its own component
create ExpensesList.js
create ExpensesSummary.js

8.130 Expense related components
ExpensesSummery.js
ExpensesOutput.js
- we are simply adding the props
NB: the periodName used in ExpenseSummery which is called from ExpenseOutput, is set somewhere else not in ExpenseOutput. it will be set in the two screen components that use the ExpenseOutput component which is AllExpenses and RecentExpenses
in 
ExpenseSummary.js we do const expensesSum
- expense is a JS method used for arrays that allows you to combine multiple arrays in an arrays into a single one

8.131 Adding Dummy Expense Data
ExpenseOutput.js 
@DUMMY_EXPENSE
AllExpenses.js

8.132 Displaying a list of expenses
ExpensesOutput.js
@ where we foward expenses to ExpensesList
ExpesesList.js
the renderItem is a function that will be called for everyItem
- at this point of the function id like to say something. this is where if say you had something that had to be used in the function like that time we had options to reduce or increase, wed have the function inside the ExpensesList
- remember that keyExtractor takes a function of which property in the object to consider unique as key