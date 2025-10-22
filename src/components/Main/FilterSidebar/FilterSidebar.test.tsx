import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import FilterSidebar from './FilterSidebar'
import jobReducer from '../../../store/reducer/JobSlice'


beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

const createMockStore = () => {
  return configureStore({
    reducer: {
      jobs: jobReducer
    }
  })
}

const mockProps = {
  selectedCity: null,
  onCityChange: vi.fn(),
  currentSearchText: '',
}

const renderWithProviders = (component: React.ReactNode) => {
  const store = createMockStore()
  
  return render(
    <Provider store={store}>
      <MantineProvider>
        {component}
      </MantineProvider>
    </Provider>
  )
}

describe('FilterSidebar', () => {
  it('Отображает заголовок "Ключевые навыки"', () => {
    renderWithProviders(<FilterSidebar {...mockProps} />)
    
    const title = screen.getByText('Ключевые навыки')
    expect(title).toBeInTheDocument()
  })

  it('Отображает поле для добавления навыков', () => {
    renderWithProviders(<FilterSidebar {...mockProps} />)
    
    const input = screen.getByPlaceholderText('Добавить навык')
    expect(input).toBeInTheDocument()
  })

  it('Отображает кнопку добавления навыка', () => {
    renderWithProviders(<FilterSidebar {...mockProps} />)
    
    const button = screen.getByText('+')
    expect(button).toBeInTheDocument()
  })

  it('Отображает начальные навыки', () => {
    renderWithProviders(<FilterSidebar {...mockProps} />)
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Redux')).toBeInTheDocument()
  })

  it('Добавляет новый навык при клике на кнопку', () => {
    renderWithProviders(<FilterSidebar {...mockProps} />)
    
    const input = screen.getByPlaceholderText('Добавить навык')
    const button = screen.getByText('+')
    
    fireEvent.change(input, { target: { value: 'Vue' } })
    fireEvent.click(button)
    
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('Добавляет новый навык при нажатии Enter', () => {
    renderWithProviders(<FilterSidebar {...mockProps} />)
    
    const input = screen.getByPlaceholderText('Добавить навык')
    
    fireEvent.change(input, { target: { value: 'Angular' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(screen.getByText('Angular')).toBeInTheDocument()
  })


  it('Отображает селект городов', () => {
    renderWithProviders(<FilterSidebar {...mockProps} />)
    
    const select = screen.getByPlaceholderText('Все города')
    expect(select).toBeInTheDocument()
  })
})