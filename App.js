import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CreateProf from './components/CreateProf';
import workPlan from './components/workPlan';
import CombinedList from './components/combinedList';
import Vids from './components/vids';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


export default function App () {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'GoActive' }}
          />
          <Tab.Screen name="CreateProf" component={CreateProf} />
          <Tab.Screen name="workPlan" component={workPlan} />
          <Tab.Screen name="Recommended Workouts" component={CombinedList} />
          <Tab.Screen name="Videos" component={Vids} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

    <View style={styles.container}>
      <Button
        color='red'
        title="Your Profile"
        onPress={() =>
          navigation.navigate('CreateProf')
        }
      />
    </View>

    <View style={styles.container}>
      <Button
        color='orange'
        title="Create Workout Plan"
        onPress={() =>
          navigation.navigate('workPlan')
        }
      />
    </View>

    <View style={styles.container}>
      <Button
        color='grey'
        title="Recommended Workouts"
        onPress={() =>
          navigation.navigate('Recommended Workouts')
        }
    />
    </View>

      <View style={styles.container}>
        <Button
          color='blue'
          title="About"
          onPress={() =>
            navigation.navigate('About')
          }
      />
      </View>

    </View>


  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};


const AboutScreen = ({ navigation, route }) => {
  return (
    <View style={styles.modContainer}>
       <Text>This was created by Shai Shkolnik</Text>
       <Text>This will be a fitness and healthy eating planner App</Text>
       <Text>Copyright 2021 All Rights Reserved</Text>
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
    flex: 0.5,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28ad21'
  },
  rowContainer: {
    flexDirection:'row',
  },
  helloText: {
    fontSize: 48,
  },
  modContainer: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
