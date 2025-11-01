import './App.css'
import Header from './components/Header/Header'
import SearchComponent from './components/Search/SearchComponent';
import Main from './components/Main/Main';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import { setSearchText } from './store/reducer/JobSlice';
import { Routes, Route, Navigate, BrowserRouter, useSearchParams, useLocation  } from "react-router-dom";
import VacancyPage from './components/VacancyPage/VacancyPage'

function AppContent() {

  const filters = useTypedSelector((state) => state.jobs.filters);
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const isVacanciesPage = location.pathname === '/vacancies';

  const updateSearchParams = (updates: { searchText?: string }) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (updates.searchText !== undefined) {
      if (updates.searchText) {
        newSearchParams.set('search', updates.searchText);
      } else {
        newSearchParams.delete('search');
      }
      newSearchParams.delete('page')
    }

    setSearchParams(newSearchParams);
  };

  return (
    <>
      <Header />
      {isVacanciesPage && (
        <div style={{ borderBottom: '1px solid #0F0F1033' }}>
          <div className="wrapper">
            <SearchComponent
              searchText={filters.searchText}
              onSearchTextChange={(text: string) =>
                dispatch(setSearchText(text))
              }
              onSearchTextUpdate={(text) => updateSearchParams({ searchText: text })} />
          </div>
        </div>
       )}
      <div className='wrapper'>
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies" replace />} />
          <Route path="/vacancies" element={<Main />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Job-site">
      <AppContent />
    </BrowserRouter>
  );
}

export default App
