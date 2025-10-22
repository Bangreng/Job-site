import { createSlice } from "@reduxjs/toolkit";
import { fetchJobs } from "./JobThunks";
import type { JobItem } from "../../types/hh";
import type { PayloadAction } from "@reduxjs/toolkit";

type JobState = {
  jobs: JobItem[];
  status: "loading" | "resolved" | "error" | null;
  error: string | null;
  filters: {
    searchText: string;
    city: string | null;
  }
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  }
  skills: string[];
}

const initialState: JobState = {
  jobs: [],
  status: null,
  error: null,
  filters: {
    searchText: '',
    city: null,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
  },
  skills: ['TypeScript', 'React', 'Redux'],
};


const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.filters.searchText = action.payload;
    },
    setCity: (state, action: PayloadAction<string | null>) => {
      state.filters.city = action.payload;
    },
    clearFilters: (state) => {
      state.filters.searchText = '';
      state.filters.city = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      const skill = action.payload.trim();
      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(skill => skill !== action.payload);
    },
    clearSkills: (state) => {
      state.skills = [];
    }
  },
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

export const { setSearchText, setCity, clearFilters, setPage, setItemsPerPage, addSkill, removeSkill, clearSkills } = jobSlice.actions;
export default jobSlice.reducer;