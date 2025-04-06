import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    // const [amountValue, setAmountValue] = useState('');
    // const [inputValues, setInputValues] = useState({
    // amount: defaultValues ? defaultValues.amount.toString() : "",
    // // date: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
    // date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    // description: defaultValues ? defaultValues.description : '',
    // })
    const [inputs, setInputs] = useState({
        // amount: { value: defaultValues ? defaultValues.amount.toString() : "", isValid: defaultValues ? true : false },
        // date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: defaultValues ? true : false },
        // description: { value: defaultValues ? defaultValues.description : '', isValid: !!defaultValues },
        amount: { value: defaultValues ? defaultValues.amount.toString() : "", isValid: true  },
        date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true },
    })

    // function amountChangeHandler(enteredAmount) {
    //     setAmountValue(enteredAmount);
    // }
    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                // this is vanilla JavaScript
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }

    function submitHandler() {
        // collecting input values
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        // here we say, if it is not not a number and if it is more than 0 it is valid
        // here a date is valid if it can be converted into that date object. 
        // new Date('Hello') return invalid in console
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        // if we could call new Date(2024-03-29).toString() in console, it would return us a date. 
        // but if we call new Date('Hello').toString() it returns 'Invalid Date' 
        // so we are checking if it does not return this its a valid date
        // should be Date not date
        const descriptionIsValid = expenseData.description.trim().length > 0;
        // when we remove white space, it is not empty

        if (amountIsValid && dateIsValid && descriptionIsValid) {
            // Alert.alert('Invalid Input', 'Please check your input values')
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>

            <Input label="Amount" style={styles.rowInput} textInputConfig={{
                keyboardType: 'decimal-pad',
                // onChangeText: amountChangeHandler,
                // we need the first value needed by inputChangeHandle. the enteredAmount is passed by default
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                // value: amountValue,
                value: inputs.amount.value,
            }} />
            <Input label="Date" style={styles.rowInput} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value,
            }} />
        </View>

        <Input label="Description" textInputConfig={{
            multiline: true,
            // autoCorrect: false,
            // autoCapitalize: 'sentences' 
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
        }} />

        {formIsInvalid && (<Text>Invalid input values. Please check your entered data</Text>)}
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>
                {/* {isEditing ? 'Update' : 'Add'} */}
                {submitButtonLabel}
            </Button>
        </View>
    </View>

}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});