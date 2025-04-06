import axios from "axios";

const BACKEND_URL = 'https://react-native-express-tracker-default-rtdb.firebaseio.com'

// export function storeExpense(expenseData) {
//     // you pass the url where the request will be sent
//     // we add expenses.json at the end. t
//     // this url we get it from firebase realtime database when we create it
//     axios.post(BACKEND_URL + '/expenses.json', expenseData);
//     // this expenses will create a node called expenses. more like a table 
//     // now we define the value we'll send
//     // a unique ID is 
//     // the second argument is the data which is amount description date but not ID.
// }

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    // firebase id is name. thats how the fellas decided
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');

    // we get an object where unique Ids are keys.
    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            // for a given amount
            amount: response.data[key].amount,
            // firebase stores date as a string to we take it back to a date object
            date: new Date(response.data[key].date) ,
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }
    console.log(expenses);
    return expenses;
}