import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isUrgent: boolean;
}

interface TasksState {
  list: Task[];
}

const initialState: TasksState = {
  list: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.list.unshift(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.list.find(task => task.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
      if (task?.isCompleted) task.isUrgent = false;
    },
    toggleUrgent: (state, action: PayloadAction<string>) => {
      const task = state.list.find(task => task.id === action.payload);
      if (task) task.isUrgent = !task.isUrgent;
      if (task?.isUrgent) task.isCompleted = false;
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload;
    },
  },
})

export const { addTask, removeTask, toggleComplete, toggleUrgent, reorderTasks } = tasksSlice.actions
export default tasksSlice.reducer
