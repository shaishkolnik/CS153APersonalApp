import React, { useState, useEffect }  from 'react';
import { SafeAreaView, ScrollView, View, Button,
         FlatList, StyleSheet, Text, TextInput, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import RNRestart from 'react-native-restart';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const WorkItem = (props) => {

  const item = props.item;
  const [isDone, setIsDone] = useState(item.isDone);

  return (
    <View style={styles.container, {border:'solid black'} }>
      <Text style={styles.todoItem}>
         <Text>{item.todo} </Text>
         <Text>using {item.tool}, </Text>
         <Text>do {item.dueDate} sets</Text>
         <Text> of {item.comment} reps each. </Text>
         <Button
           onPress={() => {item.isDone = !item.isDone; setIsDone(item.isDone)}}
           title={!isDone ? "Completed?" : "Done! Try Again?"}
         />
      </Text>
    </View>
  )
}

const workPlan = (props) => {
  const [todo,setTodo] = useState("")
  const [tool, setTool] = useState("")
  const [dueDate,setDueDate] = useState("")
  const [comment,setComment] = useState("")
  const [todoItems,setToDoItems]= useState([])
  const [isDone, setIsDone] = useState(false);

  const forceUpdate = useForceUpdate();

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@todo_list')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setToDoItems(data)
            console.log('just set toDoItems')
          } else {
            console.log('just read a null value from Storage')
            setToDoItems([])
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
          await AsyncStorage.setItem('@todo_list', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const clear = async (key) => {
      try {
          await AsyncStorage.removeItem('@todo_list');
          return true;
      }
      catch(e) {
          return false;
      }
  }


  const renderTodoItem = ({item}) => {

    return(
      <WorkItem item={item}/>
    )

  }

  let debug=false
  const debugView =
    (<View>
      <Text style={styles.headerText}>
        DEBUGGING INFO
      </Text>
      <Text>
         todo is ({todo})
      </Text>
      <Text>
         dueDate is ({dueDate})
      </Text>
      <Text>
         comment is ({comment})
      </Text>
      <Text>
         todoItems is {JSON.stringify(todoItems)}
      </Text>
  </View>);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Workout Planner </Text>
      <View>
        <TextInput
          style={styles.txtInput}
          placeholder="Excercise"
          onChangeText={text => {
               setTodo(text);
             }}
          value = {todo}
          borderColor = 'black'
        />
      </View>
      <View>
        <TextInput
          style={styles.txtInput}
          placeholder="Equipment"
          onChangeText={text => {
               setTool(text);
             }}
          value = {tool}
        />
      </View>
      <View>
        <TextInput
          style={styles.txtInput}
          placeholder="Sets"
          onChangeText={text => {
               setDueDate(text);
             }}
          value = {dueDate}
        />
      </View>
      <View>
        <TextInput
          style={styles.txtInput}
          placeholder="Reps"
          onChangeText={text => {
               setComment(text);
             }}
          value = {comment}
        />
      </View>
      <View style={styles.rowContainer}>
        <Icon
          raised
          name='add-circle-outline'
          type='ionicons'
          color='blue'
          onPress={() => {
            const newToDoItems =
              todoItems.concat(
                {'todo':todo,
                'tool':tool,
                'dueDate':dueDate,
                'comment':comment,
                'date':new Date(),
                'isDone': false,
              })
            setToDoItems(newToDoItems)
            storeData(newToDoItems)
            setTodo("")
            setTool("")
            setDueDate("")
            setComment("")
          }}
         />
         <Icon
           raised
           name='remove-circle-outline'
           type='ionicons'
           color='red'
           onPress={() => {clear()
                           getData()}}
          />
      </View>
      <FlatList
        data={todoItems}
        renderItem={renderTodoItem}
        keyExtractor={item => item}
      />
      {debug?debugView: <Text></Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign:'left',
    marginTop:20,
    padding:20,
    backgroundColor: '#28ad21'
  },
  todoItem:{
    justifyContent:'center',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'black',
    fontSize: 16,
    padding:10,
    color: 'green'
  },
  rowContainer: {
    flexDirection:'row',
    justifyContent: 'center'
  },
  txtInput: {
    height: 30,
    fontSize: 25,
    borderColor: 'black',
    borderWidth: 1,
    placeholderTextColor: 'black',
    marginBottom: 10
  }

});


export default workPlan;
