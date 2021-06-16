import React, { useState } from "react";
import { Button, TextInput, SafeAreaView, ScrollView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';


const ToDoList = (props) => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  const [comment, setComment] = useState("");
  const [toDoItems, setToDoItems] = useState([]);

  const renderItem = ({item}) => {
    return (
      <View style = {{border: 'thin solid red', flexDirection: 'row'}}>
        <Text>{item.todo} by </Text>
        <Text> {item.date} </Text>
        <Text> --{item.comment} </Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={({  }, index) => index}
        />
      </SafeAreaView>

      <View style={styles.rowContainer}>
        <Text>Item:</Text>

        <TextInput
          style={styles.textinput}
          placeholder = "add tasks here"
          onChangeText={text => {setText(text)}}
          value = {text}
          />

      </View>

      <View style={styles.rowContainer}>
        <Text>due date:</Text>

        <TextInput
          style={styles.textinput}
          placeholder = "add due date here"
          onChangeText={date => {setDate(date)}}
          value = {date}
          />

      </View>

      <View style={styles.rowContainer}>
        <Text>comment:</Text>

        <TextInput
          style={styles.textinput}
          placeholder = "add comment here"
          onChangeText={comment => {setComment(comment)}}
          value = {comment}
          />

      </View>

      <Button title="add"
              color= 'blue'
              onPress = {() => {setData(data.concat({'todo': text, 'date': date, 'comment': comment }))}}
        />

      <Text>text is ({text})</Text>
      <Text>todo list is {JSON.stringify(data)}</Text>
      <Text>date is {date}</Text>
    </View>
  )
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
  }
});

export default ToDoList;
