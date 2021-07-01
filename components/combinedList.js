import React from 'react';
import {View, StyleSheet, Text, FlatList, Switch, SafeAreaView, TouchableOpacity, Modal } from 'react-native';

export default (props) => {
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState([
    { label: 'Chest', selected:false, workouts: '1. Bench Press, 5 sets, 5 reps each\n           2. Incline bench press, 5 sets, 5 reps each\n           3. Incline bench press, 5 sets, 5 reps each\n           4. Incline dumbbell press, 4 sets, 8 reps each\n           5. Incline dumbbell flye, 4 sets, 10 reps each\n           6. Press-up, 4 sets, 12 reps each\n ' },
    { label: 'Triceps', workouts: '1. Diamond Push-ups, 3 sets, 10 reps each\n              2. Kickbacks, 3 sets, 10 reps each\n              3. Dips, 3 sets, 10 reps each\n              4. Overhead Triceps Extension, 3 sets, 8 reps each\n              5. Rope Pushdown, 3 sets, 8 reps each\n ' },
    { label: 'Back', workouts: '1. Pull-up, 5 sets, 5 reps each\n          2. Hammer grip pull-up, 5 sets, 5 reps each\n          3. Prone dumbbell row, 4 sets, 8 reps each\n          4. Prone dumbbell flye, 4 sets, 12-15 reps each\n          5. Underhand lat pull-down, 4 sets, 8-10 reps each\n          6. Seated row, 4 sets, 12-15 reps each\n ' },
    { label: 'Biceps', workouts: '1. Dumbbell curl, 3 sets, 12 reps each\n             2. Hammer curl, 3 sets, 15 reps each\n             3. Preacher Curl, 3 sets, 10 reps each\n             4. Preached reverse curl, 3 sets, 10 reps each\n             5. Cable bar curl, 3 sets, 15 reps each\n             6. Cable hammer curl, 3 sets, 15 reps each\n  ' },
    { label: 'Legs', workouts: '1. Deadlift, 5 sets, 8 reps each\n          2. Leg press, 5 sets, 8 reps each\n          3. Seated hamstring curl, 4 sets, 10 reps each\n          4. Seated leg extension, 4 sets, 10 reps each\n          5. dumbbell lunge, 3 sets, 8 reps each\n          6. Dumbbell squat, 3 sets, 15 reps each\n ' },
    { label: 'Shoulders', workouts: '1. Overhead press, 3 sets, 12 reps each\n                   2. Push press, 3 sets, 12 reps each\n                   3. Barbell shrug, 3 sets, 12 reps each\n                   4. Seated Arnold press, 3 sets, 12 reps each\n                   5. Seated lateral raise, 3 sets, 12 reps each\n                   6. Bent-over reverse flye, 3 sets, 12 reps each\n ' },
    { label: 'Abs', workouts: '1. Dumbbell crunch, 10 reps\n        2. Tuck and crunch, 15 reps\n        3. Modified V-sit, 12 reps\n        4. Crunch, 20 reps\n        5. Seated Russian twist, 12 reps each side\n        6. Bicycle crunches, 15 reps each side\n ' },

  ])
  const openList = () => setOpen(true)
  const closeList = () => setOpen(false)
  const onUpdateValue = (index, value) => { data[index].selected = value; return setData([...data]);}
  const renderItem = ({ item, index }) => <ItemRenderer key={index} index={index} selected={item.selected} label={item.label} workouts={item.workouts} onUpdateValue={onUpdateValue} />

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#FFF', padding: 16 }}>
        <View>
          <Text>Recommended Workouts: {"\n"} </Text>
          {data.filter(item => item.selected).map(item => <Text key={item.label}>{item.label}: {item.workouts}</Text>)}
        </View>
        <TouchableOpacity onPress={openList}>
          <View style={{ padding: 16, borderWidth: 1, borderColor: '#000' }}>
            <Text>Select Body Part:</Text>
          </View>
        </TouchableOpacity>
        <Modal animationType='slide' transparent={true} visible={open === true}>
          <TouchableOpacity activeOpacity={1} onPress={closeList}>
            <View style={{ flex: 1}}>
              <View style={styles.listWrapper}>
                <View style={styles.listContainer}>
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.label}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const ItemRenderer = ({ index, label, selected, onUpdateValue, workouts }) => <View style={styles.item}>
  <Text style={styles.title}>{label}</Text>
  <Switch value={selected} onValueChange={(value) => onUpdateValue(index, value)} />
</View>

const styles = StyleSheet.create({
  container: {
  },
  listWrapper: {
    flex: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: .5,
    elevation: 10,
    shadowRadius: 5
  },
  listContainer: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
  },
  tabHeading: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    textTransform: 'capitalize',
    color: '#000'
  }
});
