import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import JobSlice from "./features/job/JobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

export const store = configureStore({
    reducer:{
        user:userSlice,
        job:JobSlice,
        allJobs:allJobsSlice,
    },
})