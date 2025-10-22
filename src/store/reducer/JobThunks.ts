import { createAsyncThunk } from "@reduxjs/toolkit";
import type { HhResponse } from "../../types/hh";

export const fetchJobs = createAsyncThunk<
    HhResponse,
    { searchText?: string; city?: string },
    { rejectValue: string }
>(
    'jobs/fetchJobs',

    async function (params = {}, {rejectWithValue}){
        try{
            
            const searchQuery = params.searchText ? `&text=${encodeURIComponent(params.searchText)}` : '';
            const cityQuery = params.city ? `&area=${params.city}` : '';
            
            const url = `https://api.hh.ru/vacancies?industry=7&professional_role=96&search_field=name${searchQuery}${cityQuery}`;
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Server Error!');
            }

            const data = await response.json();
            return data
        } catch(error: any) {
            return rejectWithValue(error.message)
        }
    }
)