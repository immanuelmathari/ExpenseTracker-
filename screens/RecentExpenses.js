import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses()
{
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpenseContext);
    // const [fetchedExpenses, setFetchedExpenses] = useState([]);

    

    // useEffect(() => {
    //     // you dont turn useEffect into an async function
    //     async function getExpenses() {
    //         setIsFetching(true);
    //         const expenses = await fetchExpenses();
    //         setIsFetching(false);
    //         // setFetchedExpenses(expenses);
    //         expensesCtx.setExpenses(expenses);
    //     }
    //     getExpenses();
    // }, [])

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could Not fetch expenses')
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    if(isFetching) {
        return <LoadingOverlay />
    }

    function errorHandler() {
        setError(null);
    }

    if(error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    // we want recent expneses
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
    // const recentExpenses = fetchedExpenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });
    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Total"  fallbackText="no expenses registered for the past 7 days"/>
    )
}

export default RecentExpenses;