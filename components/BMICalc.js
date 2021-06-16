import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";



const BMICalculator = (props) => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const [bmi, setBmi] = useState(0);

      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       BMI Calculator
    </Text>

    <View style={styles.rowContainer}>
      <Text>Weight:</Text>
      <TextInput
            style={styles.textinput}
            onChangeText={text => {setWeight(text)}}
          />
    </View>

    <View style={styles.rowContainer}>
      <Text>Height:</Text>
      <TextInput
            style={styles.textinput}
            onChangeText={text => {setHeight(text)}}
          />
    </View>

    <Button
          color='red' title='Calculate BMI'
          onPress = {() =>
               setBmi(703*weight/(height*height))}
      />

    <Text> Your BMI is {bmi} </Text>
  </View>
      );
    }
  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput:{
      margin:20,
      fontSize:20
    },
    header: {
      fontSize:40,
      color:'blue'
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default BMICalculator;
