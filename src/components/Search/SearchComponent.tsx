import { Box, Button, Text, TextInput, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from './SearchComponent.module.scss'



type SearchComponentProps = {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchTextUpdate?: (text: string) => void;
}

export default function SearchComponent({ searchText, onSearchTextChange, onSearchTextUpdate }: SearchComponentProps) {



  function handleKeySearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      onSearchTextUpdate?.(searchText);
    }
  }

  const handleTextChange = (text: string) => {
    onSearchTextChange(text);
  }

  return (
    <Box className={styles.container}>
      <div>
        <h2 className={styles.title}>
          Список вакансий
        </h2>
        <Text
          c="gray"
          size="20px"
          fw={500}
          lh="135%"
          ff="Open Sans, sans-serif"
        >
          по профессии Frontend-разработчик
        </Text>
      </div>
      <Group gap="md">
        <TextInput
          leftSection={<IconSearch size={16} color="gray" />}
          placeholder="Должность или название компании"
          className={styles.searchInput}
          size="md"
          radius="md"
          value={searchText}
          onChange={(e) => handleTextChange(e.currentTarget.value)}
          onKeyDown={handleKeySearch}
        />
        <Button color="#4263EB" radius="md" size="md" onClick={() => { onSearchTextUpdate?.(searchText) }}>
          Найти
        </Button>
      </Group>
    </Box>
  );
}