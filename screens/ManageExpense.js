import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

// function ManageExpense({  })
function ManageExpense({ route, navigation }) {
    const expenseCtx = useContext(ExpenseContext);
    // const editedExpenseId = route.params.expenseId; 
    // params could be undefined if we are not passing any params to the screen, so we can use optional chaining to avoid errors
    const editedExpenseId = route.params?.expenseId;
    console.log(editedExpenseId)
    // if we are not passing any params, then editedExpenseId will be undefined and it means that we are adding a new expense else if it is defined, then we are editing an existing expense
    const isEditing = !!editedExpenseId; // this will convert the value to a boolean, so if it is undefined, it will be false and if it is defined, it will be true. so now we will have true if we are editing an expnse and false if we are adding a new expense
    // navigation.setOptions({
    //     title: isEditing ? 'Edit Expense' : 'Add Expense',
    // })
    // use Layout effect is used to add something like setOptions to avoid flickering of the screen when we are navigating to it.

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        })
    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense({ id: editedExpenseId });
        navigation.goBack();

    }

    function cancelHandler() {
        navigation.goBack();
    }

    // function confirmHandler(expenseData) {
    //     if (isEditing) {
    //     //     expenseCtx.updateExpense({
    //     //         id: editedExpenseId, 
    //     //         expneseData:  { description: 'Test', amount: 103.34, date: new Date('2022-05-20') }, 
    //     // });
    //         // expenseCtx.updateExpense(editedExpenseId, expenseData);
    //         expenseCtx.updateExpense({ id: editedExpenseId, expenseData:  expenseData });
    //     } else {
    //         // expenseCtx.addExpense({ 
    //         //     expenseData: {
    //         //         description: 'Testtwo', amount: 403.34, date: new Date('2025-05-20')}
    //         //      });


    //         storeExpense(expenseData);
    //         expenseCtx.addExpense(expenseData);
    //         // expenseCtx.addExpense({expenseData});
    //     }
    //     navigation.goBack();

    // }

    async function  confirmHandler(expenseData) {
        if (isEditing) {
            expenseCtx.updateExpense({expenseData:  expenseData });
        } else {
            const id = await storeExpense(expenseData);
            // now id is part of the object we send to the context
            expenseCtx.addExpense({...expenseData, id: id});
        }
        navigation.goBack();

    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler} defaultValues={selectedExpense}  submitButtonLabel={isEditing ? 'Update' : 'Add'} />
            {/* <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View> */}
            {isEditing && (
                <View style={styles.deleteContainer}>

                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
                </View>
            )}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    // buttons: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // button: {
    //     minWidth: 120,
    //     marginHorizontal: 8,
    // },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',

    }
})