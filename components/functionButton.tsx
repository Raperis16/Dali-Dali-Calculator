import React from 'react';
import { TouchableOpacity, Text,StyleSheet, ColorSchemeName } from "react-native"
import colors from '../constants/colors';
import { functionTypes, styles } from '../screens/main';


export const FunctionButton = ({text, colorScheme, functionButtonPressed, onFunctionButtonPressed, type}:{text:string, colorScheme:ColorSchemeName,functionButtonPressed:functionTypes, onFunctionButtonPressed:any, type: functionTypes}) =>{

    const innerStyle = StyleSheet.create({
        buttonGenericStyle: {
            ...styles.buttonGenericStyle,
            color: colors[colorScheme || "light"].actionButtonColor
        }
    });

    return(
        <TouchableOpacity
            onPress={() => onFunctionButtonPressed(type)}
            style={
                functionButtonPressed == type && type != "equals"? {
                    borderRadius: 10,
                    backgroundColor: colors[colorScheme || "light"].actionButtonColorSelected
                }: null
            }
        >
            <Text
                style={innerStyle.buttonGenericStyle}
            >{text}</Text>
        </TouchableOpacity>
    )
}
