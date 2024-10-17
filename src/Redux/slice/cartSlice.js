import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProducts = state.find((item) => item.id === action.payload.id);
      if (existingProducts) {
        const remainingProducts = state.filter(item=>item.id!=existingProducts.id)
        existingProducts.quantity++;
        existingProducts.totalPrice =existingProducts.price * existingProducts.quantity
          state=[...remainingProducts,existingProducts]
      } else {
        state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
      }
    },
    removeFromCart:(state, action)=>{
      return state.filter(item=>item.id!=action.payload)
    },
    emptyCart:(state)=>{
      return state=[]
    }
  }
});


export const {addToCart,removeFromCart,emptyCart} = cartSlice.actions
export default cartSlice.reducer;
