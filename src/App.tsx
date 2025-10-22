import './App.css'
import Header from './components/Header/Header'
import SearchComponent from './components/Search/SearchComponent';
import Main from './components/Main/Main';
import {useState} from 'react'
import { useTypedDispatch } from './hooks/redux';
import { fetchJobs } from './store/reducer/JobThunks';

function App() {

  const [filters, setFilters] = useState({
  searchText: '',
  city: '' as string | null
  });
  const dispatch = useTypedDispatch();

  function handleSearch() {
    dispatch(fetchJobs({
      searchText: filters.searchText,
      city: filters.city || ''
    }));
  }

  return (
    <>
      <Header />
      <div style={{ borderBottom: '1px solid #0F0F1033' }}>
        <div className="wrapper">
          <SearchComponent 
            searchText={filters.searchText}
            onSearchTextChange={(text: string) => 
              setFilters(prev => ({...prev, searchText: text}))
            }
            onSearch={handleSearch}/>
        </div>
      </div>
      <div className='wrapper'>
        <Main 
          selectedCity={filters.city}
          onCityChange={(city: string | null) => 
            setFilters(prev => ({...prev, city}))
          }
          currentSearchText={filters.searchText}/>
      </div>
    </>
  );
}

export default App
