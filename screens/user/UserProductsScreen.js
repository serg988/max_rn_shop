import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Button,
  Text,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'

import Colors from '../../constants/Colors'

import * as productActions from '../../store/actions/products'

import { init } from '../../populate'

const UserProductsScreen = (props) => {
  // useEffect(() => {
  //   init()
  // }, [])
  const userProducts = useSelector((state) => state.products.userProducts)
  const dispatch = useDispatch()
  const editProductHandler = (id) => {
    props.navigation.navigate('editProduct', { productId: id })
  }
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id))
        },
      },
    ])
  }

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No products found. May be start creating some?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
        >
          <Button
            color={Colors.primary}
            style={styles.button}
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
          />
          <Button
            color={Colors.primary}
            style={styles.button}
            width={'30%'}
            title='Delete'
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  )
}

const styles = StyleSheet.create({})

export const screenOptions = (navData) => {
  // console.log(navData)
  return {
    headerTitle: 'Your Products',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('editProduct')
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default UserProductsScreen
