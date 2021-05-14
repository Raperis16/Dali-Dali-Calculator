import React from 'react';
import { TouchableOpacity, Text,StyleSheet, ColorSchemeName } from "react-native"
import colors from '../constants/colors';
import { styles } from '../screens/main';


export const GenericButton = ({item, colorScheme, onNumberButtonPress}:{item:number|string, colorScheme:ColorSchemeName, onNumberButtonPress:any}) =>{
    
    const innerStyle = StyleSheet.create({
        buttonGenericStyle: {
            ...styles.buttonGenericStyle,
            color: colors[colorScheme || "light"].buttonColor
        }
    });

    return(
    <TouchableOpacity
        onPress={() => onNumberButtonPress(item)}
        >
        <Text
            style={innerStyle.buttonGenericStyle}
        >{item}</Text>
    </TouchableOpacity>
    )
}