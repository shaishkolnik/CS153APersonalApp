import React from 'react';
import {View, StyleSheet, Text, FlatList, Switch, SafeAreaView, TouchableOpacity, Modal } from 'react-native';

export default (props) => {
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState([
    { label: 'chest', selected:false },
    { label: 'triceps', },
    { label: 'back', },
    { label: 'biceps', },
    { label: 'legs', },
    { label: 'shoulders', },
    { label: 'abs', },

  ])
  const openList = () => setOpen(true)
  const closeList = () => setOpen(false)
  const onUpdateValue = (index, value) => { data[index].selected = value; return setData([...data]);}
  const renderItem = ({ item, index }) => <ItemRenderer key={index} index={index} selected={item.selected} label={item.label} onUpdateValue={onUpdateValue} />

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#FFF', padding: 16 }}>
        <TouchableOpacity onPress={openList}>
          <View style={{ padding: 16, borderWidth: 1, borderColor: '#000' }}>
            <Text>Select Body Part</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>Recommended Workouts</Text>
          {data.filter(item => item.selected).map(item => <Text key={item.label}>{item.label}</Text>)}
        </View>
      </View>
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
    </SafeAreaView>
  );
}

const ItemRenderer = ({ index, label, selected, onUpdateValue }) => <View style={styles.item}>
  <Text style={styles.title}>{label}</Text>
  <Switch value={selected} onValueChange={(value) => onUpdateValue(index, value)} />
</View>

const styles = StyleSheet.create({
  container: {
  },
  listWrapper: {
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: .5,
    elevation: 10,
    shadowRadius: 5
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFF',
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
