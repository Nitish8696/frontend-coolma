import { createSlice } from "@reduxjs/toolkit";


const getUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
        return user;
    }
    else {
        return null
    }
}



const Userslice = createSlice({
    name: "id",
    initialState: {
        user : getUser()
    },
})


export default Userslice.reducer;
