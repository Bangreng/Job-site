import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'
import { MemoryRouter } from 'react-router-dom'

describe('Header Component', () => {
  it('Отображает логотип на странице', () => {
    
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )
    
    const logo = screen.getByAltText('Логотип')
    expect(logo).toBeInTheDocument()
  })

    it('Отображает ссылку на страницу "Вакансии FE"', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    
    const vacanciesLink = screen.getByText('Вакансии FE')
    expect(vacanciesLink).toBeInTheDocument()
  })

    it('Отображает ссылку на страницу "Обо мне"', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    
    const aboutLink = screen.getByText('Обо мне')
    expect(aboutLink).toBeInTheDocument()
  })
})