import type { JobItem, HhSalary, HhWorkFormat} from '../../types/hh';
import { Box, Text, Button } from "@mantine/core";
import { transformCurrencySymbol } from '../../types/hh';
import styles from './JobsCard.module.scss'

export default function JobsCart({ name, employer, salary, experience, alternate_url, area, work_format }: JobItem){
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

    function transformWorkFormat(work_format: HhWorkFormat[]){
        if (!work_format || work_format.length === 0) {
            return { text: 'Не указано', color: '#0F0F101A' };
        }
        
        const format = work_format[0];
        
        if(format.id === 'ON_SITE'){
            return { text: 'Офис', color: '#0F0F101A' };
        }
        if(format.id === 'REMOTE'){
            return { text: 'Можно удалённо', color: '#4263EB' };
        }
        if(format.id === 'HYBRID'){
            return { text: 'Гибрид', color: '#0F0F10' };
        }
        return { text: format.name, color: '#0F0F101A' };
        
    }

    const workFormatInfo = transformWorkFormat(work_format);

    return(
        <Box bg="white" w={659} h={248} className={styles.card}>
            <Text fw={600} fz="20px" lh="24px" c="#364FC7"> {name}</Text>
            <Box className={styles.salaryExperience}>
                <Text>{returnSalary(salary)}</Text>
                <Text fz="14px" c='#0F0F1080'>{experience.name}</Text>
            </Box>

            <Box mt='16px' display='flex' className={styles.companyInfo}>
                <Text fz="14px" c='#0F0F1080'>{employer.name}</Text>
                <Text size='sm' className={styles.workFormat} style={{ backgroundColor: workFormatInfo.color, color: (workFormatInfo.color === '#0F0F10' || workFormatInfo.color === '#4263EB') ? 'white' : '#0F0F10'}}>
                    {workFormatInfo.text}
                </Text>
                <Text>{area.name}</Text>
            </Box>

            <Box mt='16px' className={styles.buttons}>
                <Button size="sm" radius="sm" color="#000000">Смотреть вакансию</Button>
                <Button size="sm" color="#0F0F101A" c="black" fz='14px' onClick={() => window.open(alternate_url)}>Откликнуться</Button>
            </Box>
        </Box>
    )

}