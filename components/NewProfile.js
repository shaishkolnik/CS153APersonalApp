import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';


const NewProfile = (props) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState(props.name);


      return (
  <View style={styles.container}>
    <Text style={styles.header}>
        {name}'s Profile
    </Text>

    <View style={styles.rowContainer}>
      <Text>Name:</Text>
      <TextInput
            style={styles.textinput}
            onChangeText={text => {setName(text)}}
        />
    </View>
    <Button
          color='red' title='Calculate BMI'
      />

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

export default NewProfile;
