import { createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "./JobThunks";
import type { JobItem } from "../../types/hh";

type JobState = {
  jobs: JobItem[];
  status: "loading" | "resolved" | "error" | null;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  status: null,
  error: null,
};


const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "resolved";
        state.jobs = action.payload.items;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  },
});

export default jobSlice.reducer;