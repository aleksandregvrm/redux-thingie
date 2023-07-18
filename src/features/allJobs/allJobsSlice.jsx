import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI) => {
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token} `,
        },
      });
      
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("there has been an error");
    }
  }
);

export const showStats = createAsyncThunk('allJobs/showStats',async(_,thunkAPI)=>{
  try {
    const resp = await customFetch.get('/jobs/stats');
    console.log(resp.data);

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  extraReducers: {
    [getAllJobs.pending] : (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled] : (state,{payload}) => {
      state.isLoading = false;
      state.jobs = payload.jobs
    },
    [getAllJobs.pending] : (state) => {
      state.isLoading = false;
    },
  }
  
});

export default allJobsSlice.reducer;
