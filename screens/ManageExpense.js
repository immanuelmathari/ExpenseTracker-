import { useLayoutEffect } from "react";
import { Text } from "react-native";

// function ManageExpense({  })
function ManageExpense({ route, navigation })
{
    // const editedExpenseId = route.params.expenseId; 
    // params could be undefined if we are not passing any params to the screen, so we can use optional chaining to avoid errors
    const editedExpenseId = route.params?.expenseId; 
    // if we are not passing any params, then editedExpenseId will be undefined and it means that we are adding a new expense else if it is defined, then we are editing an existing expense
    const isEditing = !!editedExpenseId; // this will convert the value to a boolean, so if it is undefined, it will be false and if it is defined, it will be true. so now we will have true if we are editing an expnse and false if we are adding a new expense
    // navigation.setOptions({
    //     title: isEditing ? 'Edit Expense' : 'Add Expense',
    // })
    // use Layout effect is used to add something like setOptions to avoid flickering of the screen when we are navigating to it.
    useLayoutEffect(() => {
        navigation.setOptions({
                title: isEditing ? 'Edit Expense' : 'Add Expense',
            })
    }, [navigation, isEditing])
    return (
        <Text>All Expenses Screen</Text>
    )
}

export default ManageExpense