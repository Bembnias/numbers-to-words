import { LanguageConfig, CurrencyConfig, Locale, Currency } from './types'

// Polish language configuration
const PL_CONFIG: LanguageConfig = {
  ones: ['', 'jeden ', 'dwa ', 'trzy ', 'cztery ', 'pięć ', 'sześć ', 'siedem ', 'osiem ', 'dziewięć '],
  teens: [
    'dziesięć ',
    'jedenaście ',
    'dwanaście ',
    'trzynaście ',
    'czternaście ',
    'piętnaście ',
    'szesnaście ',
    'siedemnaście ',
    'osiemnaście ',
    'dziewiętnaście ',
  ],
  tens: [
    '',
    'dziesięć ',
    'dwadzieścia ',
    'trzydzieści ',
    'czterdzieści ',
    'pięćdziesiąt ',
    'sześćdziesiąt ',
    'siedemdziesiąt ',
    'osiemdziesiąt ',
    'dziewięćdziesiąt ',
  ],
  hundreds: [
    '',
    'sto ',
    'dwieście ',
    'trzysta ',
    'czterysta ',
    'pięćset ',
    'sześćset ',
    'siedemset ',
    'osiemset ',
    'dziewięćset ',
  ],
  magnitudes: [
    ['', '', '', ''],
    ['', 'tysiąc ', 'tysiące ', 'tysięcy '],
    ['', 'milion ', 'miliony ', 'milionów '],
    ['', 'miliard ', 'miliardy ', 'miliardów '],
    ['', 'bilion ', 'biliony ', 'bilionów '],
    ['', 'biliard ', 'biliardy ', 'biliardów '],
    ['', 'trylion ', 'tryliony ', 'trylionów '],
    ['', 'tryliard ', 'tryliardy ', 'tryliardów '],
    ['', 'kwadrylion ', 'kwadryliony ', 'kwadrylionów '],
  ],
}

// English language configuration
const EN_CONFIG: LanguageConfig = {
  ones: ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine '],
  teens: [
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ],
  tens: ['', 'ten ', 'twenty ', 'thirty ', 'forty ', 'fifty ', 'sixty ', 'seventy ', 'eighty ', 'ninety '],
  hundreds: [
    '',
    'one hundred ',
    'two hundred ',
    'three hundred ',
    'four hundred ',
    'five hundred ',
    'six hundred ',
    'seven hundred ',
    'eight hundred ',
    'nine hundred ',
  ],
  magnitudes: [
    [''],
    ['thousand '],
    ['million '],
    ['billion '],
    ['trillion '],
    ['quadrillion '],
    ['quintillion '],
    ['sextillion '],
    ['septillion '],
  ],
}

// German language configuration
const DE_CONFIG: LanguageConfig = {
  ones: ['', 'eins ', 'zwei ', 'drei ', 'vier ', 'fünf ', 'sechs ', 'sieben ', 'acht ', 'neun '],
  teens: [
    'zehn ',
    'elf ',
    'zwölf ',
    'dreizehn ',
    'vierzehn ',
    'fünfzehn ',
    'sechzehn ',
    'siebzehn ',
    'achtzehn ',
    'neunzehn ',
  ],
  tens: ['', 'zehn ', 'zwanzig ', 'dreißig ', 'vierzig ', 'fünfzig ', 'sechzig ', 'siebzig ', 'achtzig ', 'neunzig '],
  hundreds: [
    '',
    'einhundert ',
    'zweihundert ',
    'dreihundert ',
    'vierhundert ',
    'fünfhundert ',
    'sechshundert ',
    'siebenhundert ',
    'achthundert ',
    'neunhundert ',
  ],
  magnitudes: [
    [''],
    ['tausend '],
    ['Million ', 'Millionen '],
    ['Milliarde ', 'Milliarden '],
    ['Billion ', 'Billionen '],
    ['Billiarde ', 'Billiarden '],
    ['Trillion ', 'Trillionen '],
    ['Trilliarde ', 'Trilliarden '],
    ['Quadrillion ', 'Quadrillionen '],
  ],
}

// PLN currency configuration
const PLN_CONFIG: CurrencyConfig = {
  forms: ['złoty', 'złote', 'złotych'],
  getFormIndex: (amount: number) => {
    if (amount === 1) return 0
    const lastTwoDigits = amount % 100
    const lastDigit = amount % 10
    if (lastTwoDigits >= 10 && lastTwoDigits < 20) {
      return 2
    }
    if ([2, 3, 4].includes(lastDigit)) {
      return 1
    }
    return 2
  },
}

// USD currency configuration
const USD_CONFIG: CurrencyConfig = {
  forms: ['dollar', 'dollars'],
  getFormIndex: (amount: number) => {
    return amount === 1 ? 0 : 1
  },
}

// EUR currency configuration
const EUR_CONFIG: CurrencyConfig = {
  forms: ['Euro', 'Euro'], // Euro is the same in singular and plural in German
  getFormIndex: (amount: number) => {
    return 0 // Always use 'Euro'
  },
}

export const LANGUAGE_CONFIGS: Record<Locale, LanguageConfig> = {
  'pl-PL': PL_CONFIG,
  'en-US': EN_CONFIG,
  'de-DE': DE_CONFIG,
}

export const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  PLN: PLN_CONFIG,
  USD: USD_CONFIG,
  EUR: EUR_CONFIG,
}

export const DEFAULT_LOCALE: Locale = 'pl-PL'
export const DEFAULT_CURRENCY: Currency = 'PLN'
