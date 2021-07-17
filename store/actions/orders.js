import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => async (dispatch, getState) => {
  const userId = getState().auth.userId
  try {
    const response = await fetch(
      `https://react-native-max-guide-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`
    )

    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const resData = await response.json()
    const notSortedOrders = []
    for (const key in resData) {
      notSortedOrders.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        )
      )
    }
    const loadedOrders = notSortedOrders.sort((b, a) =>
      a.date > b.date ? 1 : b.date > a.date ? -1 : 0
    )
    dispatch({ type: SET_ORDERS, orders: loadedOrders })
  } catch (err) {
    throw err
  }
}

export const addOrder = (cartItems, totalAmount) => async (
  dispatch,
  getState
) => {
  const date = new Date()
  const token = getState().auth.token
  const userId = getState().auth.userId
  const response = await fetch(
    `https://react-native-max-guide-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    }
  )
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  const resData = await response.json()

  dispatch({
    type: ADD_ORDER,
    orderData: {
      id: resData.name,
      items: cartItems,
      amount: totalAmount,
      date: date,
    },
  })
}
