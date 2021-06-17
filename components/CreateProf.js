import React, { useState } from "react";
import {View,StyleSheet} from 'react-native';
import NewProfile from './NewProfile';


const CreateProf = () => {
  return (
    <View style={{margin:'25%',marginTop:10}}>
      <NewProfile name = 'Your Name Here' />
    </View>
  );
}

export default CreateProf;
