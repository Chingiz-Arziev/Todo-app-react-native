import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleComplete, toggleUrgent, removeTask } from '../redux/tasksSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

interface TaskItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    isUrgent: boolean;
    isCompleted: boolean;
  };
  drag: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, drag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();

  // Используем useRef для сохранения анимационных значений
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Анимация появления
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRemove = () => {
    // Анимация удаления
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => dispatch(removeTask(item.id)));
  };

  const handlePressIn = () => {
    setIsDragging(true);
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsDragging(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ scale }, { translateY }],
      }}
    >
      <Pressable
        style={[
          styles.taskContainer,
          item.isCompleted ? styles.completedTask : item.isUrgent ? styles.urgentTask : styles.defaultTask,
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={() => dispatch(toggleComplete(item.id))}>
            <Icon
              name={'check-circle'}
              size={30}
              color={item.isCompleted ? 'green' : '#b0abab'}
              style={styles.icon}
            />
          </Pressable>

          <Pressable onPress={() => dispatch(toggleUrgent(item.id))}>
            <Icon
              name={'exclamation-circle'}
              size={30}
              color={item.isUrgent ? 'red' : '#b0abab'}
              style={styles.icon}
            />
          </Pressable>

          <Pressable style={styles.icon} onPress={handleRemove}>
            <Icon name="trash" size={28} color="#b0abab" />
          </Pressable>

          {/* Добавляем иконку для перетаскивания */}
          <Pressable
            onLongPress={drag}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <IconM name="drag-indicator" size={24} color="#b0abab" style={styles.dragIcon} />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
    marginVertical: 10,
    shadowColor: '#b0abab',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  dragIcon: {
    marginHorizontal: 5,
    padding: 5,
  },
  defaultTask: {
    borderLeftWidth: 5,
    borderLeftColor: '#b0abab', // серый для обычной задачи
  },
  urgentTask: {
    borderLeftWidth: 5,
    borderLeftColor: 'red',
  },
  completedTask: {
    borderLeftWidth: 5,
    borderLeftColor: 'green',
  },
});

export default TaskItem;
