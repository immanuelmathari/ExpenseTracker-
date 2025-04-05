import { FlatList, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
    {id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2025-01-01')},
    {id: 'e2', description: 'A pair of pants', amount: 39.99, date: new Date('2025-02-01')},
    {id: 'e3', description: 'A pair of socks', amount: 19.99, date: new Date('2025-03-01')},
    {id: 'e4', description: 'A Car', amount: 59.99, date: new Date('2025-04-01')},
    {id: 'e5', description: 'A House', amount: 39.99, date: new Date('2025-05-01')},
    {id: 'e6', description: 'A Bitch', amount: 19.99, date: new Date('2025-06-01')},
]

function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList /> 
        </View>
    )
}

export default ExpensesOutput;