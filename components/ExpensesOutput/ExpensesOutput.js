import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

// const DUMMY_EXPENSES = [
//     {id: 'e1', description: 'A pair of shoes', amount: 59.999, date: new Date('2025-01-01')},
//     {id: 'e2', description: 'A pair of pants', amount: 39.99, date: new Date('2025-02-01')},
//     {id: 'e3', description: 'A pair of socks', amount: 19.99, date: new Date('2025-03-01')},
//     {id: 'e4', description: 'A Car', amount: 59.99, date: new Date('2025-04-01')},
//     {id: 'e5', description: 'A House', amount: 39.99, date: new Date('2025-05-01')},
//     {id: 'e6', description: 'A Bitch', amount: 19.99, date: new Date('2025-06-01')},
//     {id: 'e7', description: 'Another Bitch', amount: 29.99, date: new Date('2025-06-01')},
//     {id: 'e8', description: 'Yet another Bitch', amount: 39.99, date: new Date('2025-06-01')},
//     {id: 'e9', description: 'A Beech', amount: 1999.99, date: new Date('2025-06-01')},
// ]

function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (expenses.length > 0)
    {
        content = <ExpensesList expenses={expenses} /> ;
    } 
    return (
        <View style={styles.container}>
            {/* <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />  */}
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {/* <ExpensesList expenses={expenses} />  */}
            {content}
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
})