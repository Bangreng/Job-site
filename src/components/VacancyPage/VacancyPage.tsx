import { useParams  } from "react-router-dom";
import { useTypedSelector, useTypedDispatch } from "../../hooks/redux";
import {useEffect} from 'react'
import { Box} from "@mantine/core";
import JobsCard  from '../JobsCard/JobsCard'
import styles from './VacancyPage.module.scss'
import { fetchJobById } from "../../store/reducer/JobThunks";


export default function VacancyPage(){
  const { id } = useParams();
  const dispatch = useTypedDispatch();

  const selectedJob = useTypedSelector((s) => s.jobs.selectedJob);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchJobById(id));
    }, [id, dispatch]);

    if (!selectedJob) return <p>Загрузка вакансии...</p>;

    return (
        <Box className={styles.container}>
            <JobsCard {...selectedJob} isOpenVacancyPage={true}/>
            <Box mt="20px"  w={658} bg="white" className={styles.info}> 
                <div dangerouslySetInnerHTML={{ __html: selectedJob.description || '' }} />
            </Box>
        </Box>
    );
}