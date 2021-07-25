import React from 'react'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/auth'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'

import { Platform, SafeAreaView, Button, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import ProductsOverviewScreen, {
  screenOptions as productOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen, {
  screenOptions as productDetailsScreenOptions,
} from '../screens/shop/ProductDetailScreen'
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from '../screens/user/UserProductsScreen'
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen'
import AuthScreen, {
  screenOptions as authScreenOptions,
} from '../screens/user/AuthScreen'
import CartScreen, {
  screenOptions as cartScreenOptions,
} from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import StartupScreen from '../screens/StartupScreen'

import Colors from '../constants/Colors'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const ProductStackNavigator = createStackNavigator()

export const ProductsNavigator = () => {
  return (
    <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={productDetailsScreenOptions}
      />
      <ProductStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductStackNavigator.Navigator>
  )
}

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// )

const OrdersStackNavigation = createStackNavigator()

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigation.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigation.Screen name='Orders' component={OrdersScreen} />
    </OrdersStackNavigation.Navigator>
  )
}

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// )

const AdminStackNavigator = createStackNavigator()

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name='userProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='editProduct'
        component={EditProductScreen}
        options={editProductScreenOptions}
        initialParams={{prodId: null}}
      />
    </AdminStackNavigator.Navigator>
  )
}

// const AdminNavigator = createStackNavigator(
//   {
//     userProducts: UserProductsScreen,
//     editProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   }
// )

const ShopDrawerNavigator = createDrawerNavigator()

export const ShopNavigator = () => {
  const dispatch = useDispatch()
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 25 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout())
                  // props.navigation.navigate('Auth')
                }}
              />
            </SafeAreaView>
          </View>
        )
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  )
}

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch()
//       return (
//         <View style={{ flex: 1, paddingTop: 25 }}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title='Logout'
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(authActions.logout())
//                 // props.navigation.navigate('Auth')
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       )
//     },
//   }
// )

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  )
}

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// )

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// })

// export default createAppContainer(MainNavigator)
