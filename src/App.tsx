import './App.css'
import Header from './components/Header/Header'
import SearchComponent from './components/Search/SearchComponent';
import Main from './components/Main/Main';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import { fetchJobs } from './store/reducer/JobThunks';
import { setSearchText, setCity } from './store/reducer/JobSlice';

function App() {

  const filters = useTypedSelector((state) => state.jobs.filters);
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
              dispatch(setSearchText(text))
            }
            onSearch={handleSearch}/>
        </div>
      </div>
      <div className='wrapper'>
        <Main 
          selectedCity={filters.city}
          onCityChange={(city: string | null) => 
            dispatch(setCity(city))
          }
          currentSearchText={filters.searchText}/>
      </div>
    </>
  );
}

export default App
