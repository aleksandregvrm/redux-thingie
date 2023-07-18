import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage(),
}
export const registerUser = createAsyncThunk('user/registerUser',async (user,thunkAPI) => {
    try {
        const resp = await customFetch.post('/auth/register',user);
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/loginUser", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',async(user,thunkAPI) => {
    try {
      const resp = await customFetch.patch("/auth/updateUser", user,{
        headers:{
          authorization:`Bearer ${thunkAPI.getState().user.user.token}`
        }
      });
      return resp.data;
    } catch (error) {
      if(error.response.status === 401){
          thunkAPI.dispatch(logoutUser())
          return thunkAPI.rejectWithValue('Unauthorized Attempt')
      }
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      addUserToLocalStorage(payload.user);
    },
    [registerUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      addUserToLocalStorage(payload.user);
    },
    [loginUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});
export const {toggleSidebar,logoutUser} = userSlice.actions;
export default userSlice.reducer;

