import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import SearchComponent from './SearchComponent'

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
})

const mockProps = {
  searchText: '',
  onSearchTextChange: vi.fn(),
  onSearchTextUpdate: vi.fn(),
}

const renderWithMantine = (component: React.ReactNode) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  )
}

describe('SearchComponent', () => {

  it('Отображает поле ввода поиска', () => {
    renderWithMantine(<SearchComponent {...mockProps} />)
    
    const input = screen.getByPlaceholderText('Должность или название компании')
    expect(input).toBeInTheDocument()
  })

  it('Отображает кнопку "Найти"', () => {
    renderWithMantine(<SearchComponent {...mockProps} />)
    
    const button = screen.getByRole('button', { name: 'Найти' })
    expect(button).toBeInTheDocument()
  })

  it('Вызывает onSearch при клике на кнопку', () => {
    renderWithMantine(<SearchComponent {...mockProps} />)
    
    const button = screen.getByRole('button', { name: 'Найти' })
    fireEvent.click(button)
    
    expect(mockProps.onSearchTextUpdate).toHaveBeenCalledTimes(1)
  })

})