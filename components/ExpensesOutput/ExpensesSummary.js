import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ periodName, expenses}) {
    const expensesSum = expenses.reduce((sum, expense) => {
        // we want to add the amount of each expense to the sum
        return sum + expense.amount; // expense has to have an amount property
    }, 0 ); // 0 is the initial value of the sum
    return (
        <View style={styles.container}>
            <Text style={styles.period}> {periodName} </Text>
            {/* exactly 2dp */}
            <Text style={styles.sum}>$ {expensesSum.toFixed(2)}</Text> 
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50, 
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
})