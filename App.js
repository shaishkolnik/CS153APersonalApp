import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect} from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateProf from './components/CreateProf';
import workPlan from './components/workPlan';
import CombinedList from './components/combinedList';
import Vids from './components/vids';

const Tab = createBottomTabNavigator();



export default function App () {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'GoActive Home' }}
            backgroundColor = "green"
            tabStyle = "green"
          />
          <Tab.Screen name="My Profile" component={CreateProf} />
          <Tab.Screen name="Workout Planner" component={workPlan} />
          <Tab.Screen name="Recommended Workouts" component={CombinedList} />
          <Tab.Screen name="Videos" component={Vids} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@profile_info')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setName(data.name)
            console.log('just set Info, Name and BMI')
          } else {
            console.log('just read a null value from Storage')
          }


        } catch(e) {
          console.log("error in getData ")
          console.dir(e)
          // error reading value
        }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.helloText}> Welcome {name}! {"\n"} {"\n"} </Text>

        <Image
        source={{uri: "https://cdn.shopify.com/s/files/1/2306/7779/files/Go_Active_-_72352_-_01_405x.png?v=1504137030"}}
        style={{width: 250, height: 120}}
        />

        <Text style={styles.helloText}>{"\n"} {"\n"} Refresh name?</Text>

        <Button title="refresh"
                color="black"
                onPress = {() => {getData()}}/>


      </View>
    </View>


  );
};


const AboutScreen = ({ navigation, route }) => {
  return (
    <View style={styles.modContainer}>
       <Text style={styles.aboutTxt}>This was created by Shai Shkolnik</Text>
       <Text style={styles.aboutTxt}>This will be a fitness and healthy eating planner App</Text>
       <Text style={styles.aboutTxt}>Copyright 2021 All Rights Reserved</Text>
       <View style={styles.rowContainer}>
         <Image
           source={{uri: "https://www.sponser.com/media/catalog/product/h/e/header_pre_workout_booster.png"}}
           style={{width: 300, height: 400}}
         />
         <Image
           source={{uri: "https://i.redd.it/hftw6oavmfi11.jpg"}}
           style={{width: 300, height: 400}}
         />

        </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28ad21',
    padding: 1,
  },
  rowContainer: {
    flexDirection:'row',
  },
  helloText: {
    fontSize: 25,
  },
  aboutTxt: {
    color: 'green',
    fontSize: 30
  },
  modContainer: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
