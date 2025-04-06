import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {id: 'e1', description: 'A pair of shoes', amount: 59.999, date: new Date('2025-01-01')},
    {id: 'e2', description: 'A pair of pants', amount: 39.99, date: new Date('2025-02-01')},
    {id: 'e3', description: 'A pair of socks', amount: 19.99, date: new Date('2025-03-01')},
    {id: 'e4', description: 'A Car', amount: 59.99, date: new Date('2025-04-01')},
    {id: 'e5', description: 'A House', amount: 39.99, date: new Date('2025-05-01')},
    {id: 'e6', description: 'A Bitch', amount: 19.99, date: new Date('2025-06-01')},
    {id: 'e7', description: 'Another Bitch', amount: 29.99, date: new Date('2025-06-01')},
    {id: 'e8', description: 'Yet another Bitch', amount: 39.99, date: new Date('2025-06-01')},
    {id: 'e9', description: 'A Beech', amount: 1999.99, date: new Date('2025-06-01')},
]

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: ({id}) => {},
    updateExpense: ({id, description, amount, date}) => {},

});

function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            // we pass what we receive the expense data and is made into a new data
            return [{...action.payload, id: id}, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpenseContextProvider({ children }) {
    //  the second array in useReducer is default this is for when the first time it renders when we have no data. we want to set initial data
    const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

    // function addExpense({ expenseData }) {
    //     dispatch({ type: 'ADD', payload: expenseData});
    // }

    // function deleteExpense({ id }) {
    //     dispatch({ type: 'DELETE', payload: id});
    // }

    // function updateExpense({ id, expenseData  }) {
    //     dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData }})
    // }

    // i think there is no use of having the inputs as objects
    function addExpense( expenseData ) {
        dispatch({ type: 'ADD', payload: expenseData});
    }

    function deleteExpense({ id }) {
        dispatch({ type: 'DELETE', payload: id});
    }

    function updateExpense({ id, expenseData  }) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData }})
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider