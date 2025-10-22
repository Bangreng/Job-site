import { useTypedSelector,useTypedDispatch } from "../../../hooks/redux"
import { useState, useEffect } from "react"
import JobsCard from "../../JobsCard/JobsCard";
import { Stack, Pagination } from "@mantine/core";
import { fetchJobs } from "./../../../store/reducer/JobThunks";

export default function JobList(){
    const { jobs, status, error } = useTypedSelector((state) => state.jobs);
    const [page, setPage] = useState(1);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (jobs.length === 0) {
            dispatch(fetchJobs({}));
        }
    }, [dispatch, jobs.length]);



    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedJobs = jobs.slice(startIndex, endIndex);

    if (status === "error") return <div>Ошибка: {error}</div>;

    return(
        <Stack gap='16px'>
        {displayedJobs .map((vacancy) => (
            <JobsCard key ={vacancy.id} {...vacancy}/>
        ))}

        <Pagination value={page} onChange={setPage} total={Math.ceil(jobs.length / itemsPerPage)}/>
        </Stack>
    )
}