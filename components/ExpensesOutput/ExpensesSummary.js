import { Text, View } from "react-native";

function ExpensesSummary({ periodName, expenses}) {
    const expensesSum = expenses.reduce((sum, expense) => {
        // we want to add the amount of each expense to the sum
        return sum + expense.amount; // expense has to have an amount property
    }, 0 ); // 0 is the initial value of the sum
    return (
        <View>
            <Text> {periodName} </Text>
            {/* exactly 2dp */}
            <Text>$ {expensesSum.toFixed(2)}</Text> 
        </View>
    );
}

export default ExpensesSummary;