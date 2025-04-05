import { Text, TextInput, View } from "react-native";

function Input( {label, textInputConfig})
{
    <View>
        <Text>
            Label 
        </Text>
        {/* <TextInput keyboardType={type} maxLength={maxLength} /> */}
        {/* instead of having alot of props, you use spread */}
        <TextInput {...textInputConfig} />
    </View>
}

export default Input;