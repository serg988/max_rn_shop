import { StatusBar } from 'expo-status-bar'
import { useFonts } from '@use-expo/font'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'

import AppNavigator from './navigation/AppNavigator'

import { LogBox } from 'react-native'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
})

// const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
)

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

LogBox.ignoreLogs([
  'Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).',
])
