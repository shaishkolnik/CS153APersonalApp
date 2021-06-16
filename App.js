import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'HW1 - GoActive Sketch' }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Meal Plan" component={mealPlan} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        color='green'
        title="Your profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Shai' })
        }
      />

      <Button
        color='orange'
        title="Add Meal Plan"
        onPress={() =>
          navigation.navigate('Meal Plan')
        }
      />

      <Button
        color='blue'
        title="About"
        onPress={() =>
          navigation.navigate('About')
        }
      />

    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const mealPlan = ({ navigation, route }) => {

  return(
  <View style={styles.container}>
    <Image
      source={{uri: "https://i.pinimg.com/originals/72/d7/04/72d7049b2f2319f86a2929e8d65a8d9d.png"}}
      style={{width: 500, height: 600}}
    />
  </View>
  );

};

const AboutScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
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
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection:'row',
  },
  helloText: {
    fontSize: 48,
  }
});
