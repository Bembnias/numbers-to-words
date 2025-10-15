export type Locale = 'pl-PL' | 'en-US' | 'de-DE'
export type Currency = 'PLN' | 'USD' | 'EUR'

export type NumberToWordsProps = {
  number: number
  locale?: Locale
}

export type GetAmountInWordsProps = {
  amount: number
  locale?: Locale
  currency?: Currency
}

export type GetCurrencyFormProps = {
  amount: number
  currency: Currency
  locale: Locale
}

export type LanguageConfig = {
  ones: string[]
  teens: string[]
  tens: string[]
  hundreds: string[]
  magnitudes: string[][]
}

export type CurrencyConfig = {
  forms: string[]
  getFormIndex: (amount: number) => number
}
