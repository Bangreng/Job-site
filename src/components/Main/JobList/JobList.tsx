import { useTypedSelector, useTypedDispatch } from "../../../hooks/redux"
import { useEffect } from "react"
import JobsCard from "../../JobsCard/JobsCard";
import { Stack, Pagination, Box } from "@mantine/core";
import { fetchJobs } from "./../../../store/reducer/JobThunks";
import { setPage } from "./../../../store/reducer/JobSlice";

export default function JobList(){
    const { jobs, status, error, pagination } = useTypedSelector((state) => state.jobs);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (jobs.length === 0) {
            dispatch(fetchJobs({ page: 0 }));
        }
    }, [dispatch, jobs.length]);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        dispatch(fetchJobs({ page: page - 1 }));
    };

    if (status === "error") return <div>Ошибка: {error}</div>;

    return(
        <Stack gap='16px' align="center">
            {jobs.map((vacancy) => (
                <JobsCard key={vacancy.id} {...vacancy}/>
            ))}

            <Box mb={50}>
                <Pagination 
                    value={pagination.currentPage}
                    onChange={handlePageChange}
                    total={100}
                />
            </Box>
        </Stack>
    )
}