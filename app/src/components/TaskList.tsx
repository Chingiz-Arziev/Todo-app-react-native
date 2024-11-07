import { View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { reorderTasks } from '../redux/tasksSlice'

import DraggableFlatList from 'react-native-draggable-flatlist'

import TaskItem from './TaskItem'

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.list);
  const dispatch = useDispatch()

  const sortedTasks = tasks
  .slice()
  .sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;
    if (a.isCompleted && !b.isCompleted) return 1;
    return 0;
  })

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => dispatch(reorderTasks(data))}
        renderItem={({ item, drag }) => <TaskItem item={item} drag={drag} />}
      />
    </View>
  )
}

export default TaskList
