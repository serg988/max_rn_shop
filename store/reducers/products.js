import PRODUCTS from '../../data/dummy-data'

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.userId === 'u1'),
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
