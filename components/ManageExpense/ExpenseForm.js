import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    // const [amountValue, setAmountValue] = useState('');
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : "",
        // date: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : '',
    })

    // function amountChangeHandler(enteredAmount) {
    //     setAmountValue(enteredAmount);
    // }
    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                // this is vanilla JavaScript
                [inputIdentifier] : enteredValue
            }
        });
    }

    function submitHandler() {
        // collecting input values
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        };

        onSubmit(expenseData);
    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>

            <Input label="Amount" style={styles.rowInput} textInputConfig={{
                keyboardType: 'decimal-pad',
                // onChangeText: amountChangeHandler,
                // we need the first value needed by inputChangeHandle. the enteredAmount is passed by default
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                // value: amountValue,
                value: inputValues.amount,
            }} />
            <Input label="Date" style={styles.rowInput} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputValues.date,
            }} />
        </View>

            <Input label="Description" textInputConfig={{
                multiline: true,
                // autoCorrect: false,
                // autoCapitalize: 'sentences' 
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description
            }} />

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