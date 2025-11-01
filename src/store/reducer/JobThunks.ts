import { createAsyncThunk } from "@reduxjs/toolkit";
import type { HhResponse, JobItem } from "../../types/hh";

export const fetchJobs = createAsyncThunk<
    HhResponse,
    { searchText?: string; city?: string; page?: number },
    { rejectValue: string }
>(
    'jobs/fetchJobs',

    async function (params = {}, {rejectWithValue}){
        try{
            const searchQuery = params.searchText ? `&text=${encodeURIComponent(params.searchText)}` : '';
            const cityQuery = params.city ? `&area=${params.city}` : '';
            const pageQuery = params.page !== undefined ? `&page=${params.page}` : '&page=0';
            const url = `https://api.hh.ru/vacancies?industry=7&professional_role=96&search_field=name${searchQuery}${cityQuery}${pageQuery}&per_page=10`;
            
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

export const fetchJobById = createAsyncThunk<JobItem, string>(
    'jobs/fetchJobById',
    async (id: string, { rejectWithValue }) => {
    try {
        const res = await fetch(`https://api.hh.ru/vacancies/${id}`);
        if (!res.ok) throw new Error('Ошибка сервера');
        const data = await res.json();

        const job: JobItem = {
        ...data,
        snippet: {
            requirement: data.snippet?.requirement || data.description || 'Не указано',
            responsibility: data.snippet?.responsibility || data.description || 'Не указано',
        },
      };

      return job;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);