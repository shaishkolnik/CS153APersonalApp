import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Icon } from 'react-native-elements';


const STORAGE_KEY = '@save_info'



const NewProfile = (props) => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState();
  const [name, setName] = useState(props.name);
  const [text, setText] = useState();

  const [uri, setURI] = useState('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg');

  const [info, setInfo] = useState({name:'',bmi:'', uri:''});

  useEffect(() => {getData()}
           ,[])

 const getData = async () => {
       try {
         // the '@profile_info' can be any string
         const jsonValue = await AsyncStorage.getItem('@profile_info')
         let data = null
         if (jsonValue!=null) {
           data = JSON.parse(jsonValue)
           setInfo(data)
           setName(data.name)
           setBMI(data.bmi)
           setURI(data.uri)
           console.log('just set Info, Name and BMI')
         } else {
           console.log('just read a null value from Storage')
           setInfo({})
           setName("")
           setEmail("")
         }


       } catch(e) {
         console.log("error in getData ")
         console.dir(e)
         // error reading value
       }
 }

 const storeData = async (value) => {
       try {
         const jsonValue = JSON.stringify(value)
         await AsyncStorage.setItem('@profile_info', jsonValue)
         console.log('just stored '+jsonValue)
       } catch (e) {
         console.log("error in storeData ")
         console.dir(e)
         // saving error
       }
 }


      return (
  <View style={styles.container}>
      <Avatar
      source={{
        uri:uri
      }}
      size={96}
      >
      <Avatar.Accessory
            name="pencil-alt"
            type="font-awesome-5"
            size={16}
            onPress={() => {}}
          />
    </Avatar>


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
            onPress = {() => {setName(text)
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
            color='brown' title='Change BMI'
            onPress = {() => {
              const newBMI = (weight/height/height)*703
              setBMI(newBMI)
            }}
        />
    </View>

    <View style={styles.rowContainer}>
      <Text>New Image URL:</Text>
      <TextInput
            style={styles.textinput}
            onChangeText={text => {setText(text)}}
        />
      <Button
            color='orange' title='Change Image'
            onPress = {() => {setURI(text)}}
        />
    </View>

    <Icon
      raised
      name='save'
      type='fontisto'
      color='#f50'
      onPress={() => {
           console.log("saving profile");
           const theInfo = {name:name,bmi:bmi, uri:uri}
           console.log(`theInfo=${theInfo}`)
           setInfo(theInfo)
           console.log('data='+JSON.stringify(theInfo))
           storeData(theInfo)
         }}
     />
  </View>
      );
    }

  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#31bd36',
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
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
  });

export default NewProfile;
