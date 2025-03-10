import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  age: "",
  avatar: "",
  id: "",
  access_token: "",
  password: "",
  
  updatedAt:" ",
  createdAt:" ",
  
  isAuthenticated: false,
  role:" ",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        phone = "",
        _id = "",
        address = "",
        age = "",
        avatar = "",
        access_token = "",
        password = "",
        
        createdAt="",
        updatedAt="",
        role=" ",
        
      } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.age = age;
      state.id = _id;
      state.role=role;
      state.avatar = avatar;
      state.password = password;
      
      state.updatedAt = updatedAt;
      state.createdAt = createdAt;
      state.access_token = access_token;
      state.isAuthenticated = !!access_token; // Ensure authentication
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.age = "";
      state.id = "";
      state.avatar = "";
      state.access_token = "";
      state.role="";
      
      state.isAuthenticated = false; // Reset authentication
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;