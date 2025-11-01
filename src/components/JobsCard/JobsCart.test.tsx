import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import JobsCart from './JobsCard'
import type { JobItem } from '../../types/hh'
import { MemoryRouter } from 'react-router-dom'

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

const mockJob: JobItem = {
  id: '1',
  name: 'Frontend Developer',
  salary: {
    from: 100000,
    to: 150000,
    currency: 'RUR'
  },
  area: { name: 'Москва' },
  employer: { name: 'Tech Company' },
  experience: { name: '1-3 года' },
  alternate_url: 'https://hh.ru/vacancy/1',
  work_format: [{ id: 'REMOTE', name: 'Удаленная работа' }]
}

const renderWithMantine = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <MantineProvider>
        {component}
      </MantineProvider>
    </MemoryRouter>
  )
}

describe('JobsCart Component', () => {
  it('Отображает название вакансии', () => {
    renderWithMantine(<JobsCart {...mockJob} />)
    
    const title = screen.getByText('Frontend Developer')
    expect(title).toBeInTheDocument()
  })

  it('Отображает зарплату в правильном формате', () => {
    renderWithMantine(<JobsCart {...mockJob} />)
    
    const salary = screen.getByText('100 000 - 150 000 ₽')
    expect(salary).toBeInTheDocument()
  })

  it('Отображает название компании', () => {
    renderWithMantine(<JobsCart {...mockJob} />)
    
    const company = screen.getByText('Tech Company')
    expect(company).toBeInTheDocument()
  })

  it('Отображает город', () => {
    renderWithMantine(<JobsCart {...mockJob} />)
    
    const city = screen.getByText('Москва')
    expect(city).toBeInTheDocument()
  })

  it('Отображает формат работы', () => {
    renderWithMantine(<JobsCart {...mockJob} />)
    
    const workFormat = screen.getByText('Можно удалённо')
    expect(workFormat).toBeInTheDocument()
  })

  it('Отображает опыт работы', () => {
    renderWithMantine(<JobsCart {...mockJob} />)
    
    const experience = screen.getByText('1-3 года')
    expect(experience).toBeInTheDocument()
  })
})