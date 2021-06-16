import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, FlatList } from "react-native";



const COVIDdata = (props) => {
  const [state, setState] = useState('MA');
  const [data, setData] = useState('');

  function covid_before(a,b) {
    var keyA = new Date(a.created_at),
    keyB = new Date(b.created_at);

    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
  }

  useEffect(() => {
    fetch('https://data.cdc.gov/resource/9mfq-cb36.json?state='+state)
      .then((response) => response.json())
      .then((cdata) => {
        //cdata = cdata.sort(covid_before),
        //setData(cdata);
      })
      .catch((error) => console.error(error))
  }, []);

  const render_item = ({new_death, new_case,created_at}) => {
    <Text>new deaths:{new_deaths}, new cases:{new_case}, date:{created_at}</Text>
  }

      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       COVID-19 DEMO
    </Text>

    <View style={styles.rowContainer}>
      <Text style={styles.textinput}> Enter a state abbrev:</Text>
      <TextInput style={styles.textinput}
      onChangeText={state => {setState(parseFloat(state))}}/>
    </View>

    <Button
          color='red' title='Get COVID data'
      />

    <Text> Covid Data for {state} is  </Text>
    <Text> {JSON.stringify(data)} </Text>

    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.slice(0,10)}
        renderItem={renderItem}
        keyExtractor={item => item.date}
      />
    </SafeAreaView>
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

export default COVIDdata;
