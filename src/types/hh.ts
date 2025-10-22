export type HhSalary = {
  from: number | null;
  to: number | null;
  currency: string | null;
};

export function transformCurrencySymbol(currency: string | null): string{
  const mapCurrensy: Record<string, string> = {
    'RUR': '₽',
    'RUB': '₽',
    'USD': '$',
    'EUR': '€',
    'KGS': 'C',
    'KZT': '₸',
    'UZS': 'сўм'
  }

  return mapCurrensy[currency || ''] || currency || ''
}

export type HhArea = {
  name: string;
};

export type HhEmployer = {
  name: string;
};

export type HhExperience = {
  name: string;
};

export type HhWorkFormat = {
  id: string;
  name: string;
};

export type JobItem = {
  id: string;
  name: string;
  salary: HhSalary | null;
  area: HhArea;
  employer: HhEmployer;
  experience: HhExperience;
  alternate_url: string;
  work_format: HhWorkFormat[];
};

export type HhResponse = {
  items: JobItem[];
  found: number;
  page: number;
  pages: number;
};