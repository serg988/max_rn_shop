import PRODUCTS from './data/dummy-data'

export const init = () => {
  PRODUCTS.forEach((product) => {
    populate(
      product.ownerId,
      product.title,
      product.description,
      product.imageUrl,
      product.price
    )
  })
}

const populate = async (ownerId, title, description, imageUrl, price) => {
  const response = await fetch(
    'https://react-native-max-guide-default-rtdb.europe-west1.firebasedatabase.app/products.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ownerId,
        title,
        description,
        imageUrl,
        price,
      }),
    }
  )
}
