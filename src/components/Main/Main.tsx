import { Box } from "@mantine/core"
import JobList from "./JobList/JobList"
import FilterSidebar from "./FilterSidebar/FilterSidebar"
import styles from './Main.module.scss'
import { useSearchParams } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux"
import { setSearchText, setCity, setPage } from "../../store/reducer/JobSlice"
import { fetchJobs } from "../../store/reducer/JobThunks"
import { useEffect } from "react"


export default function Main() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useTypedDispatch()
    const { filters, pagination } = useTypedSelector((state) => state.jobs)


    useEffect(() => {
        const search = searchParams.get("search") || ""
        const city = searchParams.get("city") || ""
        const page = Number(searchParams.get("page") || 1)

        if (search !== filters.searchText) {
            dispatch(setSearchText(search))
        }
        if (city !== (filters.city || "")) {
            dispatch(setCity(city))
        }
        if (page !== pagination.currentPage) {
            dispatch(setPage(page))
        }

        dispatch(fetchJobs({
            searchText: search,
            city: city,
            page: page - 1,
        }))
    }, [searchParams])

    const updateURL = (updates: { searchText?: string; city?: string | null; page?: number }) => {
        const params = new URLSearchParams(searchParams)

        if (updates.searchText !== undefined) {
            if (updates.searchText) {
                params.set("search", updates.searchText);
            } else {
                params.delete("search");
            }
            params.delete("page");
        }

        if (updates.city !== undefined) {
            if (updates.city) {
                params.set("city", updates.city);
            } else {
                params.delete("city");
            }
            params.delete("page");
        }

        if (updates.page !== undefined) {
            if (updates.page > 1) {
                params.set("page", String(updates.page))
            } else {
                params.delete("page")
            }
        }

        setSearchParams(params);
    }

    return (
        <Box className={styles.container}>
            <FilterSidebar onFiltersChange={updateURL} />
            <JobList updateURL={updateURL} />
        </Box>
    )
}