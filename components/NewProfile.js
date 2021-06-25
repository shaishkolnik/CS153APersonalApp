import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NewProfile = (props) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState();
  const [name, setName] = useState(props.name);
  const [text, setText] = useState();


      return (
  <View style={styles.container}>
    <Text style={styles.header}>
        {name}'s Profile
    </Text>

    <Text>
        Your BMI is {bmi}
    </Text>

    <View style={styles.rowContainer}>
      <Text>Name:</Text>
      <TextInput
            style={styles.textinput}
            onChangeText={text => {setText(text)}}
        />
      <Button
              color='green' title='Change Name'
              onPress = {() => {
                setName(text)
                storeData(name)
              }}
        />
    </View>

    <View style={styles.rowContainer}>
      <View>
        <View style={styles.rowContainer}>
          <Text>Height (in):</Text>
          <TextInput
                style={styles.textinput}
                onChangeText={text => {setHeight(text)}}
            />
        </View>

        <View style={styles.rowContainer}>
          <Text>Weight (lb):</Text>
          <TextInput
                style={styles.textinput}
                onChangeText={text => {setWeight(text)}}
            />
        </View>
      </View>
      <Button
            color='brown' title='Add BMI'
            onPress = {() => {
              const newBMI = (weight/height/height)*703
              setBMI(newBMI)
              storeData(bmi)
            }}
            value = {bmi}
        />
    </View>

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
      fontSize:20,
      backgroundColor: '#d3d3d3',
      paddingLeft: 15,
      paddingRight: 15
    },
    header: {
      fontSize:40,
      color:'green'
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
  });

export default NewProfile;
