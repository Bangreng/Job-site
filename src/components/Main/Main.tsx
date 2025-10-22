import { Box } from "@mantine/core"
import JobList from "./JobList/JobList"
import FilterSidebar from "./FilterSidebar/FilterSidebar"
import styles from './Main.module.scss'

type MainProps = {
  selectedCity: string | null
  onCityChange: (city: string | null) => void
  currentSearchText: string
}

export default function Main({selectedCity, onCityChange, currentSearchText}:MainProps){
    return(
        <Box className={styles.container}>
            <FilterSidebar selectedCity={selectedCity} onCityChange={onCityChange} currentSearchText={currentSearchText}/>
            <JobList />
        </Box>
    )
}