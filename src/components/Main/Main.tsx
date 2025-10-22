import { Box } from "@mantine/core"
import JobList from "./JobList/JobList"
import FilterSidebar from "./FilterSidebar/FilterSidebar"
import styles from './Main.module.scss'

type MainProps = {
  currentSearchText: string
}

export default function Main({currentSearchText}:MainProps){
    return(
        <Box className={styles.container}>
            <FilterSidebar currentSearchText={currentSearchText}/>
            <JobList />
        </Box>
    )
}