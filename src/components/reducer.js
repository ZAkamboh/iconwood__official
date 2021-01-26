export const initialState = {
  wishlist: [],
  Userorders:[],
  section4Items: [],
  users: null,
}

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
  switch (action.type) {
    case 'SECTION4_DATA':
      return {
        ...state,
        section4Items: action.payload,
      }

    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: action.payload,
      }

    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        wishlist: action.payload,
      }

      case 'SHOPNOW':
        return {
          ...state,
          Userorders: action.payload,
        }

    case "SET_USER":
      return {
        ...state,
        users: action.payload
      }

    default:
      return state
  }
}

export default reducer
