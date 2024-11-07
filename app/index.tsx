import React from 'react'
import { Provider } from 'react-redux'
import {store} from './src/redux/store'
import TaskInput from './src/components/TaskInput'
import TaskList from './src/components/TaskList'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, padding: 10 }}>
      <Provider store={store}>
        <TaskInput />
        <TaskList />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App
