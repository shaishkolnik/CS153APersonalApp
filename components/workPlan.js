import React, { useState, useEffect }  from 'react';
import { SafeAreaView, ScrollView, View, Button,
         FlatList, StyleSheet, Text, TextInput, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkItem = (props) => {

  const item = props.item;
  const [isDone, setIsDone] = useState(item.isDone);

  return (
    <View style={styles.container, {border:'solid black'} }>
      <Text style={styles.todoItem}>
         <Text>{item.todo} </Text>
         <Text>{item.dueDate} sets</Text>
         <Text> {item.comment} each. </Text>
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
  const [dueDate,setDueDate] = useState("")
  const [comment,setComment] = useState("")
  const [todoItems,setToDoItems]= useState([])
  const [isDone, setIsDone] = useState(false);

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

  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
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
      <Text style={styles.headerText}> Workout Plan </Text>
      <View>
        <TextInput
          style={{height: 20}}
          placeholder="Excercise"
          onChangeText={text => {
               setTodo(text);
             }}
          value = {todo}
        />
      </View>
      <View>
        <TextInput
          style={{height: 20}}
          placeholder="Sets"
          onChangeText={text => {
               setDueDate(text);
             }}
          value = {dueDate}
        />
      </View>
      <View>
        <TextInput
          style={{height: 20}}
          placeholder="Reps"
          onChangeText={text => {
               setComment(text);
             }}
          value = {comment}
        />
      </View>
      <View>
        <Button
           title={"add"}
           color="blue"
           onPress = {() => {
             const newToDoItems =
               todoItems.concat(
                 {'todo':todo,
                 'dueDate':dueDate,
                 'comment':comment,
                 'date':new Date(),
                 'isDone': false,
               })
             setToDoItems(newToDoItems)
             storeData(newToDoItems)
             setTodo("")
             setDueDate("")
             setComment("")
           }}
        />
       <Button
          title={"clear"}
          color="red"
          onPress = {() => {clearAll()
          }}
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
  },
  todoItem:{
    justifyContent:'center',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'#aaa',
    fontSize: 16,
    padding:10,
    color: 'blue'
  },

});


export default workPlan;