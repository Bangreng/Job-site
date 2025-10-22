import { useTypedSelector,useTypedDispatch } from "../../../hooks/redux"
import { useEffect } from "react"
import JobsCard from "../../JobsCard/JobsCard";
import { Stack, Pagination } from "@mantine/core";
import { fetchJobs } from "./../../../store/reducer/JobThunks";
import { setPage } from "./../../../store/reducer/JobSlice";

export default function JobList(){
    const { jobs, status, error, pagination  } = useTypedSelector((state) => state.jobs);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (jobs.length === 0) {
            dispatch(fetchJobs({}));
        }
    }, [dispatch, jobs.length]);



    const { currentPage, itemsPerPage } = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedJobs = jobs.slice(startIndex, endIndex);

    function handlePageChange(page: number){
        dispatch(setPage(page));
    };

    if (status === "error") return <div>Ошибка: {error}</div>;

    return(
        <Stack gap='16px' align="center">
        {displayedJobs .map((vacancy) => (
            <JobsCard key ={vacancy.id} {...vacancy}/>
        ))}

        <Pagination value={currentPage} onChange={handlePageChange} total={Math.ceil(jobs.length / itemsPerPage)}/>
        </Stack>
    )
}