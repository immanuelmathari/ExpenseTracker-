import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

function ExpenseForm() {
    // const [amountValue, setAmountValue] = useState('');
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: '',
    })

    // function amountChangeHandler(enteredAmount) {
    //     setAmountValue(enteredAmount);
    // }
    function inputChangeHandler(inputIdentifier, enteredAmount) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                // this is vanilla JavaScript
                [inputIdentifier] : enteredValue
            }
        });
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
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputValues.description
            }} />
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
    }
});