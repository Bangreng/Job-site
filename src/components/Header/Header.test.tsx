import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header Component', () => {
  it('Отображает логотип на странице', () => {
    render(<Header />)
    
    const logo = screen.getByAltText('Логотип')
    expect(logo).toBeInTheDocument()
  })

    it('Отображает ссылку на страницу "Вакансии FE"', () => {
    render(<Header />)
    
    const vacanciesLink = screen.getByText('Вакансии FE')
    expect(vacanciesLink).toBeInTheDocument()
  })

    it('Отображает ссылку на страницу "Обо мне"', () => {
    render(<Header />)
    
    const aboutLink = screen.getByText('Обо мне')
    expect(aboutLink).toBeInTheDocument()
  })
})