import { LANGUAGE_CONFIGS, CURRENCY_CONFIGS, DEFAULT_LOCALE, DEFAULT_CURRENCY } from './constants'
import { GetAmountInWordsProps, GetCurrencyFormProps, NumberToWordsProps, LanguageConfig } from './types'

/**
 * Converts a monetary amount to words.
 * @example
 * // Polish (default): 43.75 -> "czterdzieści trzy złote, 75/100"
 * getAmountInWords({ amount: 43.75 })
 * @example
 * // English: 43.75 -> "forty three dollars, 75/100"
 * getAmountInWords({ amount: 43.75, locale: 'en-US', currency: 'USD' })
 * @param amount The monetary amount as a floating-point number
 * @param locale The locale for language (default: 'pl-PL')
 * @param currency The currency code (default: 'PLN')
 * @returns The amount in words
 */
export function getAmountInWords({
  amount,
  locale = DEFAULT_LOCALE,
  currency = DEFAULT_CURRENCY,
}: GetAmountInWordsProps): string {
  const integerPart = Math.floor(amount)
  const fractionalPart = Math.round((amount - integerPart) * 100)
  const integerWords = numberToWords({ number: integerPart, locale }).trim()
  const currencyForm = getCurrencyForm({ amount: integerPart, currency, locale })
  const fractionalStr = fractionalPart.toString().padStart(2, '0')
  return `${integerWords} ${currencyForm}, ${fractionalStr}/100`.trim()
}

/**
 * Returns the appropriate form of currency based on the amount and language rules.
 * @param amount The number for which the currency form applies
 * @param currency The currency code
 * @param locale The locale for language
 * @returns The appropriate form of currency
 */
export function getCurrencyForm({ amount, currency, locale }: GetCurrencyFormProps): string {
  const config = CURRENCY_CONFIGS[currency]
  if (!config) {
    throw new Error(`Unsupported currency: ${currency}`)
  }
  const formIndex = config.getFormIndex(amount)
  return config.forms[formIndex]
}

/**
 * Converts a number to its word representation.
 * @example
 * // Polish (default): 123 -> "sto dwadzieścia trzy"
 * numberToWords({ number: 123 })
 * @example
 * // English: 123 -> "one hundred twenty three"
 * numberToWords({ number: 123, locale: 'en-US' })
 * @param number The number to convert
 * @param locale The locale for language (default: 'pl-PL')
 * @returns The number in words
 */
export function numberToWords({ number, locale = DEFAULT_LOCALE }: NumberToWordsProps): string {
  if (number === 0) return 'zero'

  const config = LANGUAGE_CONFIGS[locale]
  if (!config) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  const digits: string = number.toString()
  let result: string = ''

  // Split the number into groups of three digits
  for (let index = Math.floor((digits.length - 1) / 3); index >= 0; index--) {
    const startIdx = digits.length - (index + 1) * 3
    const endIdx = digits.length - index * 3
    let threeDigitsNumber = parseInt(digits.substring(startIdx, endIdx))

    if (threeDigitsNumber > 0) {
      result += convertThreeDigitsNumberToString(threeDigitsNumber, config, locale)
      result += addMagnitudeName(threeDigitsNumber, index, config, locale)
    }
  }

  return result.trim()
}

/**
 * Converts a three-digit number to its word representation.
 * @param threeDigitsNumber The three-digit number
 * @param config The language configuration
 * @param locale The locale for language-specific rules
 * @returns The number in words
 */
function convertThreeDigitsNumberToString(threeDigitsNumber: number, config: LanguageConfig, locale: string): string {
  let result: string = config.hundreds[Math.floor(threeDigitsNumber / 100)]
  const tensValue = threeDigitsNumber % 100

  if (tensValue >= 10 && tensValue < 20) {
    result += config.teens[tensValue % 10]
  } else {
    const onesDigit = tensValue % 10
    const tensDigit = Math.floor(tensValue / 10)

    // German reverses the order: ones + "und" + tens (e.g., "einundzwanzig" = one-and-twenty)
    if (locale === 'de-DE' && onesDigit > 0 && tensDigit > 0) {
      // Special case: use "ein" instead of "eins" when combined with tens
      const onesWord = onesDigit === 1 ? 'ein' : config.ones[onesDigit].trim()
      result += onesWord + 'und' + config.tens[tensDigit]
    } else {
      result += config.tens[tensDigit] + config.ones[onesDigit]
    }
  }

  return result
}

/**
 * Adds the appropriate magnitude name (thousands, millions, billions, etc.).
 * @param number The number to which the magnitude name applies
 * @param power The power of thousand (e.g., 1 - thousand, 2 - million, 3 - billion)
 * @param config The language configuration
 * @param locale The locale for language rules
 * @returns The appropriate form of the magnitude name
 */
function addMagnitudeName(number: number, power: number, config: LanguageConfig, locale: string): string {
  if (power === 0 || number === 0) return '' // Don't add units for ones

  const magnitudeArray = config.magnitudes[power]
  if (!magnitudeArray) return ''

  // English has simple plural rules - always use first form
  if (locale === 'en-US') {
    return magnitudeArray[0]
  }

  // German has simple plural rules for magnitudes
  if (locale === 'de-DE') {
    // 'tausend' is always the same (only one form in array)
    if (magnitudeArray.length === 1) {
      return magnitudeArray[0]
    }
    // For Million, Milliarde, etc.: singular if number is 1, plural otherwise
    return number === 1 ? magnitudeArray[0] : magnitudeArray[1]
  }

  // Polish has complex plural rules
  let formIndex = 3 // Default plural form
  if (number === 1) {
    formIndex = 1 // Singular form e.g., "tysiąc"
  } else if (number % 10 > 1 && number % 10 < 5 && (number < 10 || number > 20)) {
    formIndex = 2 // "tysiące", "miliony" etc.
  }

  return magnitudeArray[formIndex] || magnitudeArray[0] || ''
}
