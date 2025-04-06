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

8.133 App layout and Styling
ExpnesesSummary.js
- working with styles
- remember that default style is column
ExpensesOutput.js

we create
ExpenseItem.js
ExpenseItem.js
ExpenseList.js
- we render expenseItem
here you see we just simply spread the data without passing the props why so
    return <ExpenseItem {...item.item} />
because the 
function ExpenseItem({ description, amount, date }) {
arrangement matches our data
    {id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2025-01-01')},

8.135 Formatting Dates
we create a util folder
util/date.js
date.js
- add +1 at the month because JS sees a month starting from 0
ExpenseItem.js at the amountContainer

8.136 Adding a Header Button & Making Expense Items Tappable
ManageExpense.js
- we want to have a plus button to add expense button and we can tap the single expense to open the same screen in a different mode so that we can edit or delete one of the items
@BottomTabs.Navigator screenOptions
create a folder 
UI/IconButton.js
- this icon button we want to use it to be a reusable component so that can set name elsewhere. even the function that should be triggered when the icon is pressed we want it to be done where its called. 
this myfriend is the power of react native
ExpenseItem.js
@ Pressable onPress and the function
we add pressed style too

8.137 Navigating Programmatically Between Screens
ExpenseItem.js
- you see this ExpneseItem was not amoung the screens set for navigation, so we have to use the useNavigation hook
- with this we can now navigate to a different screen
- now when we tap on an expense we can go and manage it
App.js 
- we need to when we press + we go to manageExpenses. 
@BottomTabs.Navigator
- for the screen options, we could pass a function not only an object

8.138 Styling the expense Management App
App.js
@Stack.Navigator screenOptions
                 Stack.screen
there is a style called Presentation. its the way a screen is opened. we try modal

8.139 Supporting Different Editing Modes & Using Route Parameters adding expense or editing expense effect to the title
ManageExpense.js
- we could be opening an adding expense or editing an expense. but we want to use the same screen. 
- we need to find out why the screen was loaded, either adding or editing. meaning we need to foward some info as we load it in 
ExpenseItem.js 
@navigation.navigate('ManageExpense')
in
ManageExpense.js
we can extract that parameter
function ManageExpense({ route })
use Layout effect is used to add something like setOptions to avoid flickering of the screen when we are navigating to it.

8.140 Adding a delete button
ManageExpense 
@return

8.141 Adding custom buttons
Buttons.js
ManageExpense.js
@ the Button

8.142 Closing a modal programmatically
ManageExpnese 
@ the functions kina cancel Handler

NOTE) goBack means going back to the screen that was there before you opened the modal

8.143 implementing context api for app wide state (hardest || revisit || redo || rewatch )
- create a store folder
create expenses-context.js
expense-context.js
- define ExpenseContext and create the Context, 
- create the ExpenseContextProvider without the useReducer so that you only return, 
- export default
- now define reducer in provider
- define the reducer function we check the type of actions
- then in the contextprovider, pass the expenseReducer as an argument to useReducer
- the useReducer should return a state expenseState that will be managed by the expensesReducer and a dispatch function you can use to execute to dispatch a new function to the reducer function which can manipulate the state which we get a new state.
- add addExpnese
we expect to get expenseData which is an obhect with description, amount, and date and then now in the dispatch, we pass a function, we pass a value to dispatch which will be made available by react inside the reducer function as the second parameter (action). you can dispatch a number string object . you use what you will be checking for.  then you set a payload. then foward expensedata you receive to payload. dispatch will have different actions which will lead to different results. the job of the reducer is to return a new value either default or the cases defined by us
- so you need to know that the switch cases code was added afterwards after ExpenseContextProvider
NOTE) expense is a method in JavaScript JS that is used to find an element in an array and return a boolean value if its the element we are looking for
- in case 'UPDATE', we know we have id because we pass it in dispatch. 
- understand that dispatch comes before the cases. because its what gives the case data to work with

- next init, we create a value object to bundle our data together to expose them to anything that'll consume it 

App.js
- go wrap
in
ExpensesOutput.js
- remove DUMMYDATA
AllExpenses.js && RecentExpenses
- add useContext
date.js
@getDateMinusDays

- hee you have to go over this again and again

8.145 Deleting & Updating Expenses
ManageExpense
- ge the context

8.146 Conditional rendering of content if no recent expense
ExpensesOutput.js
- fallback text
RecentExpenses.js
- add the fallbacktext

SECTION 9 Handling User Input
9.148 Building a Reusable Input Component with speading props
components/ManageExpense/ExpenseForm.js
ExpenseForm.js
create ManageExpense/Input.js
Input.js
NOTE) this should be reusable
{/* <TextInput keyboardType={type} maxLength={maxLength} /> */}
        {/* instead of having alot of props, you use spread what you need */}
- we use a differnet approach

9.149 Creating an overall form

9.150 Configuring form input elements
ExpenseForm.js
@ the inputs
- we talked about the options you could have in ExpenseForm

9.151 Adding style
Input.js 
at the styles
and also the inputStyles and the if below it
- we want to make our styles to have conditions and standard styles and multiline styles.

9.152 Setting the Form Layout
ExpenseForm.js
- wrapping into the second view
Input.js
adding a style prop
- to allow a style prop to be added in ExpenseForm. check the first view

9.153 Handling User Input in a generic way
Input.js xxx
- working when user input change. 
ExpenseForm.js
@useState
- we use an object
@inputChnageHandler
NOTE) we dynamically update
- note how we set the values in the onChangeText

9.154 Managing a form state and submission
- somehow we cut the reset and add from ManageExpense.js to ExpenseForm
- so this guy just want us to use props for everything even cancelFormHandler etc the ones that were in ManageExpense

9.155 Working with Entered Data
ExpenseForm.js
@submitHandler
+inputValues.amount
NOTE) converts string to a number
- so we want in  
ExpenseForm.js
to have a @ submitHandler and inputChangeHandler
- so we use the props of the onSubmit to enter that data
ManageExpenses.js
- we in @ confirmHandler, have to expect expenseData
- this way we pass real user data to the context. 
- now we connect this confirmHandler to the expenseForm using onSubmit

9.156 Setting & using default Values
ManageExpense.js
@selectedExpense
- we want to have prefilled values when we are edititng
- we use the context to find a specific expence
- remember that with reducers, all our app's data is init
@ExpenseForm - defaultValues - pass it as a prop in 
ExpenseForm.js
- we set the default values brought in by ManageExpenses
NOTE) we see how to convert data object into a way we can read it in JS JavaScript
date.js
- we want to use another way to format the data

9.157 Adding Validation
ExpenseForm.js
@submitHandler
NOTE) We see how to do data validation and conversions

9.158 Providing visual validation feedback
- highlight inputs that are invalid by changing their styles
ExpenseForm.js
@useState
- we add isValid property
NOTE) see how we use a shorthand expression to convert a truthy value to a boolean
@inputChangeHandler to change the names of what we have changed
- now in 
@Alert, we do it in a better way to set validity
@above the cancel and update, we want to have validity message @formisInvalid helper function
- but the problem is that we get the error message right from the start when we are adding an expense

9.159 Adding Error Styling
@ExpenseForm styles.errorText
- we want to highlight the invalid inputs
- in the inputs, we interchange. so if the invalid is false, it becomes true. so invalid is true if the input is not valid
Input.js
@invalidLabels
- remember we add an invalid prop in ExpenseForm.js
@if(invalid)
- see how to push styles into an input

SECTION 10: Sending HTTP Requests
10.162 Backend Setup (Firebase)
- we create a project in firebase
- goto realtime database create
- have rules in test mode
https://react-native-express-tracker-default-rtdb.firebaseio.com/
this is the url you'll send requests to

10.163 Installing Axios
- we want to send requests
- we can use fetch() API. 
- we could also use axios
> npm install axiox

10.164 Sending POST HTTP Requests
create
util/http.js
http.js
ManageExpense.js
@confirmHandler
- by adding the storeExpense, we immediately are able to send this request to firestore

10.165 Fetching Backend GET Requests
http.js
@fetchExpenses
RecentExpenses.js
@useEffect

10.166 Transforming & Using Fetched Data
- how to use it in recent expenses
- comment out our context
add usestate for fetchedExpenses
- we still need to use context though in order to update. this will allow us to use data we already have plus the ones we add. because without it, we'll need to refresh everytime we add something
expenses-context.js
- we comment dummy data,
we at createContext, 
have the setExpenses
- we add a new reducer case @expensesReducer SET
- then in ExpensesContextProvider, we add setExpenses
- add this function to our value
- remove dummy_expenses @expensecontextprovider
RecentExpenses.js
- return the context

10.167 Using response data from POST request
- firebase stores records chronologically. older responses are at the top. its the opposite logic of what we had
expenses-context.js
@expensesReducer @SET
- this is reordering 
- then now we need to figure out what to do with the ID
@case ADD
- we want to use the ID returned by firebase
- so we need to get a hold of that id when we send that request in 
http.js
- firebase gives us the id at the @storeExpense in its response
- so in ManageExpense at the confirmHandler, well get the id now
- so anything we get from the firebase we need to async wait for it

10.168 Updating & Deleting Backend Data (UPDATE & DELETE request)
http.js
@updateExpense
@deleteExpense
- somehow we dont need async because we dont need to do anything with the response. because we dont work with the response we remove async. we just return the result of doing the delete function nothing mrore

10.169 Managing the Loaded State
- a loading spinner when the request is on its way
UI/LoadingOverlay.js
NOTE) This is what you can do
LoadingOverlay.js
- to get a loading spinner we use ActivityIndicator
RecentExpenses.js
@useState
@useEffect setIsFetching
@isFetching
ManageExpense.js
- we add it when we do actions. so we add isSubmitting
- isSubmitting