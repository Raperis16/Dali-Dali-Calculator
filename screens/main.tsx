import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,SafeAreaView, Text, View, ColorSchemeName, TouchableOpacity, useColorScheme } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FunctionButton } from '../components/functionButton';
import { GenericButton } from '../components/genericButton';
import colors from '../constants/colors';


export type functionTypes = "%"|"percentage"|"equals"|"plus"|"minus"|"divide"|"multiply"|null


export default function MainScreen() {
    const colorScheme:ColorSchemeName = useColorScheme();
    const insets:EdgeInsets = useSafeAreaInsets();
    
    const [ calculatorValue, setCalculatorValue ] = React.useState("0");
    const [ memoryValue, setMemoryValue ] = React.useState<null|number>(null);
    const [ memoryFunction, setMemoryFunction ] = React.useState<functionTypes>(null);
    const [ functionButtonPressed, setFunctionButtonPressed ] = React.useState<functionTypes>(null);

    const cleanMemory = () =>{
        setCalculatorValue("0");
        setMemoryValue(null);
        setFunctionButtonPressed(null);
        setMemoryFunction(null);
    }

    const onNumberButtonPress = (input:number) =>{
        if(calculatorValue.toString() == "0."){
            setCalculatorValue(calculatorValue + '' + input);
            if(functionButtonPressed != null){
                setFunctionButtonPressed(null);
            }
        }else if(calculatorValue == "0" || functionButtonPressed != null ){
            setCalculatorValue(input.toString());
            setFunctionButtonPressed(null);
        }else{
            if((input != 0 || input == 0 && calculatorValue != "0") && calculatorValue.toString().length < 7 ){
                var setNewCalculatorValue = calculatorValue + '' + input;
                setCalculatorValue(setNewCalculatorValue.toString())
            }
            
        }
    }

    const onCommaPressed = () =>{
        if(calculatorValue == "0" || functionButtonPressed != null ){
            setCalculatorValue( "0." );
        }else{
            if(calculatorValue.includes(".")){
                return null
            }else{
                setCalculatorValue(calculatorValue+".")
            }
        }
    }

    const onFunctionButtonPressed = (type:functionTypes) =>{
        type = (type == "%"? "percentage": type);
        let disposableCalculatorValue = parseFloat(calculatorValue);
        if(disposableCalculatorValue.toString()[disposableCalculatorValue.toString().length-1] == "."){
            disposableCalculatorValue = parseFloat(disposableCalculatorValue.toString().substring(0, disposableCalculatorValue.toString().length-1) );
        }

        if(type == "percentage"){
            let disposableValue = disposableCalculatorValue / 100;
            setCalculatorValue(disposableValue.toString());
        }else if(functionButtonPressed == null){
            if(memoryValue != null){
                let disposableValue = 0.0;
                if(type != "equals"){
                    disposableValue = doCalculations(type , disposableCalculatorValue);
                    setMemoryValue(disposableValue);
                }else{
                    disposableValue = doCalculations(memoryFunction , disposableCalculatorValue);
                    //to clean history
                    setMemoryValue(null);
                }
                setCalculatorValue(disposableValue.toString());
            }else{
                if(type != "equals"){
                    setMemoryValue(disposableCalculatorValue);
                }
            }

            setMemoryFunction( type != "equals"? type : null);
            setFunctionButtonPressed(type != "equals"? type : null);

        }else if( functionButtonPressed != type){
            setFunctionButtonPressed(type)
        }
    }

    const doCalculations = (type:functionTypes, value:number):number =>{
        let disposableValue = 0;
        if(memoryValue != null){
            if(type == "plus"){
                disposableValue = memoryValue + value;
            }else if(type == "minus"){
                disposableValue = memoryValue - value;
            }else if(type == "divide"){
                disposableValue = memoryValue / value;
            }else if(type == "multiply"){
                disposableValue = memoryValue * value;
            }
        }
        return disposableValue;
    }

    const onMinusPlusPressed = () =>{
        setCalculatorValue((parseFloat(calculatorValue) * -1).toString())
    }

    const innerStyle = StyleSheet.create({
        buttonStyleWithDynamicColor: {
            ...styles.buttonGenericStyle,
            color: colors[colorScheme || "light"].buttonColor
        },
        functionStyleTextWithDynamicColor: {
            ...styles.buttonGenericStyle,
            color: colors[colorScheme || "light"].actionButtonColor
        }
    });

  return (
      <View style={{
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: colors[colorScheme || "light"].background
        }}>
        
            <View
                style={
                    [
                    styles.containerText,
                    styles.containerGeneric
                ]
                }
            >
                <Text
                    style={{
                        color: colors[colorScheme || "light"].text,
                        fontSize: 70,
                        fontWeight: "600",
                    }}
                >
                    {calculatorValue}
                </Text>
            </View>
            <View
                style={
                    [
                        styles.containerFunctionButtons,
                        {
                            paddingBottom: insets.bottom,
                            backgroundColor: colors[colorScheme || "light"].backgroundButtons
                        }
                    ]
            }
            >
            
                <View
                    style={[styles.containerButtonRow]}
                >
                    {
                        ["C","±","%"].map((item) =>
                            <GenericButton 
                                item={item}
                                colorScheme={colorScheme}
                                onNumberButtonPress={
                                    item == "C"?
                                        cleanMemory
                                    :
                                    item == "±"?
                                        onMinusPlusPressed
                                    :
                                    item == "%"?
                                        onFunctionButtonPressed
                                    : null
                                }
                            />
                        )
                    }
                    <FunctionButton
                        text={"÷"}
                        colorScheme={colorScheme}
                        functionButtonPressed={functionButtonPressed}
                        onFunctionButtonPressed={onFunctionButtonPressed}
                        type={"divide"}
                    />
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    {
                        [7,8,9].map((item) =>
                            <GenericButton 
                                item={item}
                                colorScheme={colorScheme}
                                onNumberButtonPress={onNumberButtonPress}
                            />
                        )
                    }
                    <FunctionButton
                        text={"×"}
                        colorScheme={colorScheme}
                        functionButtonPressed={functionButtonPressed}
                        onFunctionButtonPressed={onFunctionButtonPressed}
                        type={"multiply"}
                    />
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    {
                        [4,5,6].map((item) =>
                        <GenericButton 
                            item={item}
                            colorScheme={colorScheme}
                            onNumberButtonPress={onNumberButtonPress}
                        />
                        )
                    }
                    <FunctionButton
                        text={"−"}
                        colorScheme={colorScheme}
                        functionButtonPressed={functionButtonPressed}
                        onFunctionButtonPressed={onFunctionButtonPressed}
                        type={"minus"}
                    />
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    {
                        [1,2,3].map((item) =>
                            <GenericButton 
                                item={item}
                                colorScheme={colorScheme}
                                onNumberButtonPress={onNumberButtonPress}
                            />
                        )
                    }
                    <FunctionButton
                        text={"+"}
                        colorScheme={colorScheme}
                        functionButtonPressed={functionButtonPressed}
                        onFunctionButtonPressed={onFunctionButtonPressed}
                        type={"plus"}
                    />
                </View>
                <View
                    style={[styles.containerButtonRow]}
                >
                    <TouchableOpacity
                        disabled={true}
                    >
                        <Text
                            style={[styles.buttonGenericStyle]}
                        > </Text>
                    </TouchableOpacity>
                    {
                        [0, "."].map((item) =>
                            <GenericButton 
                                item={item}
                                colorScheme={colorScheme}
                                onNumberButtonPress={item =="."? onCommaPressed : onNumberButtonPress}
                            />
                        )
                    }
                    <FunctionButton
                        text={"="}
                        colorScheme={colorScheme}
                        functionButtonPressed={functionButtonPressed}
                        onFunctionButtonPressed={onFunctionButtonPressed}
                        type={"equals"}
                    />
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
  );
}

export const styles = StyleSheet.create({
  containerText: {
    flex: 3/8,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  containerGeneric: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  containerButtonRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 20
  },
  containerFunctionButtons: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 5/8,
    justifyContent: "space-around"
  },
  buttonGenericStyle: {
      fontSize: 41,
      padding: 16,
      fontWeight: "500"
  }
});
