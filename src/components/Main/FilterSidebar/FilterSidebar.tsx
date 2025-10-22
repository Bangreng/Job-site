import { PillsInput, Pill } from "@mantine/core"
import { useState } from "react";
import { Box, Text, Group, Button, Select, Stack } from "@mantine/core";
import { useTypedDispatch } from "../../../hooks/redux";
import { fetchJobs } from "../../../store/reducer/JobThunks";
import styles from './FilterSidebar.module.scss'


type FilterSidebarProps = {
  selectedCity: string | null;
  onCityChange: (city: string | null) => void;
  currentSearchText: string;
}

export default function FilterSidebar({ selectedCity, onCityChange, currentSearchText }: FilterSidebarProps){
    const [skills, setSkills] = useState(['TypeScript', 'React', 'Redux']);
    const [inputValue, setInputValue] = useState('');

    const dispatch = useTypedDispatch();

    const handleCityChange = (city: string | null) => {
        onCityChange(city);
        dispatch(fetchJobs({
            searchText: currentSearchText,
            city: city || ''
        }));
    };


    const addSkill = () => {
        if (inputValue.trim() && !skills.includes(inputValue.trim())) {
            setSkills([...skills, inputValue.trim()]);
            setInputValue('');
        }
    };

    function removeSkill(skillToRemove: string){
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    function handleKeyDown(e: React.KeyboardEvent){
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };



    return(
        <Stack>
            <Box w='317px' h='206px' bg="white" className={styles.skillsBox}>
                <Text fw={600} lh="20px" mb="12px" fz='14px'>Ключевые навыки</Text>
                    <Group gap="sm" align="flex-start" mb='12px'>
                        <PillsInput style={{ flex: 1 }}>
                            <Pill.Group>
                                <PillsInput.Field
                                    placeholder="Добавить навык"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.currentTarget.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </Pill.Group>
                        </PillsInput>
                        <Button 
                            onClick={addSkill}
                            className={styles.addButton}
                        >
                            +
                        </Button>
                    </Group>

                    <Pill.Group gap='8px'>
                        {skills.map(skill => (
                            <Pill 
                                key={skill} 
                                withRemoveButton 
                                onRemove={() => removeSkill(skill)}
                                size="md"
                            >
                                {skill}
                            </Pill>
                        ))}
                    </Pill.Group>
            </Box>
            <Box w='317px' h='84px' bg="white" className={styles.cityBox}>
                <Select
                    value={selectedCity}
                    onChange={handleCityChange}
                    placeholder="Все города"
                    data={[
                        { value: '', label: 'Все' },
                        { value: '1', label: 'Москва' },
                        { value: '2', label: 'Санкт-Петербург' }
                    ]}
                    styles={{
                        input: {
                            backgroundColor: 'transparent',
                            border: '1px solid #D5D6DC',
                        }
                    }}
                />
            </Box>
        </Stack>
    )
}