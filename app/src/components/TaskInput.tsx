import { useState } from 'react'
import { View, TextInput, StyleSheet, Switch, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useDispatch } from 'react-redux'
import { addTask } from '../redux/tasksSlice'

import uuid from 'react-native-uuid'

const TaskInput = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)

  const dispatch = useDispatch()

  const handleAddTask = () => {
    if (title && description) {
      dispatch(addTask(
        { 
          id: uuid.v4().toString(), 
          title, 
          description, 
          isCompleted: false, 
          isUrgent 
        }
      )
    )

      setTitle('')
      setDescription('')
      setIsUrgent(false)
    }
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.urgentContainer}>
        <Text>Mark as Urgent</Text>
        <Switch 
          trackColor={{ false: '#ababab', true: '#424242' }} 
          thumbColor={isUrgent ? '#303030' : '#f4f3f4'} 
          value={isUrgent} 
          onValueChange={setIsUrgent} 
        />
      </View>

      <TouchableOpacity style={styles.buttonAddTask} onPress={handleAddTask}>
        <Text style={styles.buttonAddText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: { 
    borderColor: 'gray', 
    borderWidth: 0.4, 
    borderRadius: 8, 
    padding: 8, 
    marginVertical: 5 
  },
  urgentContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',  
  },
  buttonAddTask: {
    alignItems: 'center',
    backgroundColor: '#131313', 
    borderRadius: 8, 
    paddingVertical: 14, 
    marginVertical: 20, 
  },
  buttonAddText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default TaskInput
