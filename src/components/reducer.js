

export const initialState = {
  wishlist: [],
  section4Items:[],
  user: null,
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


      case 'GET_WISHLIST_FROM_LOCALSTORAGE':
        return {
          ...state,
          wishlist: action.payload,
        }

      


      case "REMOVE_FROM_BASKET":
        return {
          ...state,
          wishlist: action.payload,
        }







        // case "SET_USER":
        //   return {
        //     ...state,
        //     user: action.user
        //   }

    default:
      return state
  }


}

export default reducer
