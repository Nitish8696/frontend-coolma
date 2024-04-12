import { createSlice } from "@reduxjs/toolkit";



const Searchslices = createSlice({
    name: "id",
    initialState: {
        resId: '',
        address : {},
        searchTerm: '',
    },
    reducers: {
        addId: (state, action) => {
          state.resId = action.payload
        },
        addAddress : (state,action) => {
          state.address = action.payload
        },
        addSearchTerm : (state, action) => {
            state.searchTerm = action.payload
        }
    }
})

export const { addId,addAddress,addSearchTerm} = Searchslices.actions;
export default Searchslices.reducer;
