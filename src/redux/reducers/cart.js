import { ACTION_TYPES } from "@store/actionTypes";

// **  Initial State
const initialState = {
  numberCart: 0,
  restaurantName: "",
  carts: [],
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_PRODUCT:
      return {
        ...state,
        products: action.data,
      };
    case ACTION_TYPES.GET_NUMBER_CART:
      return {
        ...state,
      };
    case ACTION_TYPES.ADD_CART:
      if (state.numberCart === 0) {
        let cart = {
          productId: action.data.productId,
          quantity: action.data.quantity,
          productName: action.data.productName,
          image: action.data.image,
          price: action.data.price,
        };
        state.carts.push(cart);
      } else {
        let check = false;
        state.carts.forEach((item, key) => {
          if (item.productId === action.data.productId) {
            state.carts[key].quantity = state.carts[key].quantity + action.data.quantity;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            productId: action.data.productId,
            quantity: 1,
            productName: action.data.productName,
            image: action.data.image,
            price: action.data.price,
          };
          state.carts.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
        restaurantName: action.data.restaurantName,
        restaurantId: action.data.restaurantId,
        lat: action.data.lat,
        lng: action.data.lng,
      };
    case ACTION_TYPES.INCREASE_QUANTITY:
      state.carts[action.data].quantity++;

      return {
        ...state,
      };
    case ACTION_TYPES.DECREASE_QUANTITY:
      let quantity = state.carts[action.data].quantity;
      if (quantity > 0) {
        state.carts[action.data].quantity--;
      }

      return {
        ...state,
      };
    case ACTION_TYPES.DELETE_CART:
      let quantity_ = state.carts[action.data].quantity;
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        carts: state.carts.filter((item) => {
          return item.productId !== state.carts[action.data].productId;
        }),
      };
    case ACTION_TYPES.REMOVE_CART:
      return {
        ...state,
        carts: [],
        numberCart: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
