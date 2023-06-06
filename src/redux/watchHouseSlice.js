import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    productData: [],
    userInfo: null,
}

export const watchHouseSlice = createSlice({
    name: 'watchHouse',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = state.productData.find((product) =>product._id === action.payload._id)
            if(product) {
                product.quantity += action.payload.quantity
            }else {
                state.productData.push(action.payload)
            }
        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter(product =>product._id !== action.payload)
        },
        resetCart: (state) => {
            state.productData = []
        },
        incrementQuantity: (state, action) => {
            const product = state.productData.find(product => product._id === action.payload._id)
            if(product) {
                product.quantity++
            }
        },
        decrementQuantity: (state, action) => {
            const product = state.productData.find(product => product._id === action.payload._id)
            if(product.quantity===1) {
                product.quantity = 1    
            }else {
                product.quantity--
            }
        },
        addUser: (state, action) => {
            state.userInfo = action.payload
        },
        removeUser: (state) => {
            state.userInfo = null
        }
    }
})

export const {addToCart, deleteProduct, resetCart, incrementQuantity, decrementQuantity, addUser, removeUser} = watchHouseSlice.actions
export default watchHouseSlice.reducer