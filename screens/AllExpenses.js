import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expenses-context";

function AllExpenses()
{
    const expensesCtx = useContext(ExpenseContext);
    return (
        // <ExpensesOutput expensesPeriod="Total" />
        // after doing reducer
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />
    )
}

export default AllExpenses;