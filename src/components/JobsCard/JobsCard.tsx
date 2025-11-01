import type { JobItem, HhSalary, HhWorkFormat} from '../../types/hh';
import { Box, Text, Button } from "@mantine/core";
import { transformCurrencySymbol, workFormat  } from '../../types/hh';
import styles from './JobsCard.module.scss'
import { Link } from 'react-router-dom';

type JobsCardProps = JobItem & {isOpenVacancyPage?: boolean}

export default function JobsCart({ id, name, employer, salary, experience, alternate_url, area, work_format, isOpenVacancyPage }: JobsCardProps){
    function returnSalary(salary: HhSalary | null){
        if(!salary) return 'Зарплата не указана'

        const {from, to, currency} = salary;

        const currencySymbol = transformCurrencySymbol(currency);

        const formatNum = (num: number | null) => num !== null ? new Intl.NumberFormat('ru-RU').format(num) : '';

        if(from && to){
            return `${formatNum(from)} - ${formatNum(to)} ${currencySymbol}`
        }

        if(from && !to){
            return `От ${formatNum(from)} ${currencySymbol}`
        }

        if(!from && to){
            return `До ${formatNum(to)} ${currencySymbol}`
        }

        return 'Зарплата не указана'
    }

    function getWorkFormatInfo(work_format: HhWorkFormat[]) {
        if (!work_format || work_format.length === 0) {
            return { 
                text: 'Не указано', 
                className: 'workFormatDefault'
            };
        }
        
        const formatId = work_format[0].id;
        const formatFromDict = workFormat[formatId as keyof typeof workFormat];
        
        if (formatFromDict) {
            return formatFromDict;
        }
        
        return {
            text: work_format[0].name,
            className: 'workFormatDefault'
        };
    }

    const workFormatInfo = getWorkFormatInfo(work_format);

    return(
        <Box bg="white" w={659} h={248} className={styles.card}>
            <Text fw={600} fz="20px" lh="24px" c="#364FC7"> {name}</Text>
            <Box className={styles.salaryExperience}>
                <Text>{returnSalary(salary)}</Text>
                <Text fz="14px" c='#0F0F1080'>{experience.name}</Text>
            </Box>

            <Box mt='16px' display='flex' className={styles.companyInfo}>
                <Text fz="14px" c='#0F0F1080'>{employer.name}</Text>
                <Text size='sm' className={`${styles.workFormat} ${styles[workFormatInfo.className]}`}>
                    {workFormatInfo.text}
                </Text>
                <Text>{area.name}</Text>
            </Box>

            <Box mt='16px' className={styles.buttons}>
                {!isOpenVacancyPage && (
                    <Button size="sm" radius="sm" color="#000000" component={Link} to={`/vacancies/${id}`}>Смотреть вакансию</Button>
                )}
                <Button size="sm" color={isOpenVacancyPage ? "#000000" : "#0F0F101A"} c={isOpenVacancyPage ? "white" : "black"}  fz='14px' onClick={() => window.open(alternate_url)}>{isOpenVacancyPage ? "Откликнуться на hh.ru" : "Откликнуться"}</Button>
            </Box>
        </Box>
    )

}