import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

function ExpenseForm() {
    function amountChangeHandler() {

    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>

            <Input label="Amount" style={styles.rowInput} textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountChangeHandler,
            }} />
            <Input label="Date" style={styles.rowInput} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: () => { },
            }} />
        </View>

            <Input label="Description" textInputConfig={{
                multiline: true,
                // autoCorrect: false,
                // autoCapitalize: 'sentences' 
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