import React, { useState, useEffect } from 'react'
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import * as ordersActions from '../../store/actions/orders'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import CartItem from '../../components/shop/CartItem'
import Colors from '../../constants/Colors'

const OrdersScreen = (props) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  // useEffect(() => {
  //   setIsLoading(true)
  //   setError(null)
  //   const getOrders = async () => {
  //     await dispatch(ordersActions.fetchOrders())
  //   }
  //   getOrders()
  //   setIsLoading(false)
  // }, [dispatch])

  useEffect(() => {
    setIsLoading(true)
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  const orders = useSelector((state) => state.orders.orders)

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No orders found. May be start ordering something?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          key={CartItem.productId}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default OrdersScreen
