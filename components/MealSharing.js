import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";



const MealSharing = (props) => {
  const [cost, setCost] = useState(0);
  const [tip, setTip] = useState(props.tipRate);
  const [numGuests, setNumGuests] = useState(0);

  const [indCost, setIndCost] = useState(0);

      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       Meal Sharing Calculator for tip rate = {tip}
    </Text>

    <TextInput
          style={styles.textinput}
          onChangeText={text => {setCost(parseFloat(text))}}
          placeholder = "Cost of the Meal"
        />

    <TextInput
          style={styles.textinput}
          onChangeText={text => {setTip(parseFloat(text))}}
          placeholder = "Adjust Tip Rate"
        />

    <TextInput
          style={styles.textinput}
          onChangeText={text => {setNumGuests(parseFloat(text))}}
          placeholder = "Number of Guests"
        />

    <Button
          color='red' title='Calculate Cost Per Guest'
          onPress = {() =>
               setIndCost((cost*(tip/100 + 1))/numGuests)}
      />

    <Text> Each of the guests should pay {indCost} </Text>
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
    }
  });

export default MealSharing;
