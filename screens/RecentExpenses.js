import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses()
{
    const expensesCtx = useContext(ExpenseContext);
    useEffect(() => {
        // you dont turn useEffect into an async function
        async function getExpenses() {
            const expenses = await fetchExpenses();
        }
        getExpenses();
    }, [])

    // we want recent expneses
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });
    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Total"  fallbackText="no expenses registered for the past 7 days"/>
    )
}

export default RecentExpenses;