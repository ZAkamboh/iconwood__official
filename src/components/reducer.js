

export const initialState = {
  basket: [],
  user: null,
}

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
  switch (action.type) {

    // without saving in local storage
    // case 'ADD_TO_BASKET':
    //   console.log("new push ",action.payload)
    //   return {
    //     ...state,
    //     basket: [...state.basket, action.payload],
    //   }


    case 'GET_BASKET_FROM_LOCALSTORAGE':
      return {
        ...state,
        basket: action.payload,
      }


        // with saving in local storag
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: action.payload,
      }

   


      case 'REMOVE_FROM_BASKET':
        console.log("new remove items",action.payload)
         // without local storage
      // const index = state.basket.findIndex(
      //   (basketItem)=>basketItem.id === action.id
      // )
      // let newBasket = [...state.basket]

      // if(index >= 0){
      //   newBasket.splice(index,1)
      // }
      // else{
      //   console.warn(
      //     `cant remove product (id : ${action.id}) as its not in basket!`
      //   )
      // }
      //   return {
      //     ...state,
      //     basket: newBasket,
      //   }

      //with local storage
    
      return {
        ...state,
        basket: action.payload,
      }


      case "EMPTY_BASKET":
        return {
          ...state,
          basket: action.payload,
        }







        case "SET_USER":
          return {
            ...state,
            user: action.user
          }

    default:
      return state
  }
}

export default reducer
