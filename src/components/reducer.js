export const initialState = {

  wishlist: [],
  Userorders:[],
  section4Items: [],
  section5Items: [],
  LandingBanners: [],
  section2Items: [],
  section3Items: [],
  contact:[],
  bedsData: [],
  chairsData:[],
  sofasData:[],
  dinningsData:[],
  swingsData:[],
  centertabelsData:[],
  users: null,
  viewProducImage:[],
  allorders:[],
  allusers:[],

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

      

      case 'CONTACT':
        return {
          ...state,
          contact: action.payload,
        }


      case 'Landing_bannners_DATA':
        return {
          ...state,
          LandingBanners: action.payload,
        }


        case 'SECTION2_DATA':
          return {
            ...state,
            section2Items: action.payload,
          }


          case 'SECTION3_DATA':
            return {
              ...state,
              section3Items: action.payload,
            }

      case 'SECTION5_DATA':
        return {
          ...state,
          section5Items: action.payload,
        }

        case 'BEDS':
          return {
            ...state,
            bedsData: action.payload,
          }

          case 'CHAIRS':
            return {
              ...state,
              chairsData: action.payload,
            }

            case 'SOFAS':
              return {
                ...state,
                sofasData: action.payload,
              }

              case 'DINNINGS':
                return {
                  ...state,
                  dinningsData: action.payload,
                }


                case 'SWINGS':
                  return {
                    ...state,
                    swingsData: action.payload,
                  }

                  case 'CENTERTABELS':
                    return {
                      ...state,
                      centertabelsData: action.payload,
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

        case 'ALLORDERS':
          return {
            ...state,
            allorders: action.payload,
          }

          case 'ALLUSERS':
            return {
              ...state,
              allusers: action.payload,
            }
          
        
        case 'PRODUCT_IMAGE':
          return {
            ...state,
            viewProducImage: action.payload,
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
