import { TENS, ONES, TEENS, HUNDREDS, MAGNITUDES } from './constants'
import { GetAmountInWordsProps, GetCurrencyFormProps, NumberToWordsProps } from './types'

/**
 * Converts a monetary amount to words, e.g., 43.75 -> "czterdzieści trzy złote, 75/100"
 * @param amount The monetary amount as a floating-point number
 * @returns The amount in words
 */
export function getAmountInWords({ amount }: GetAmountInWordsProps): string {
  console.time('amountInWords')
  const integerPart = Math.floor(amount)
  const fractionalPart = Math.round((amount - integerPart) * 100)
  const integerWords = numberToWords({ number: integerPart })
  const currency = getCurrencyForm({ amount: integerPart })
  const fractionalStr = fractionalPart.toString().padStart(2, '0')
  console.timeEnd('amountInWords')
  return `${integerWords} ${currency}, ${fractionalStr}/100`.trim()
}

/**
 * Returns the appropriate plural form of Polish currency (złotych, złote, złoty)
 * depending on the `amount` value.
 * @param amount The number for which the plural form applies
 * @returns The plural form of Polish currency
 */

export function getCurrencyForm({ amount }: GetCurrencyFormProps): string {
  if (amount === 1) return 'złoty'
  const lastTwoDigits = amount % 100
  const lastDigit = amount % 10
  if (lastTwoDigits >= 10 && lastTwoDigits < 20) {
    return 'złotych'
  }
  if ([2, 3, 4].includes(lastDigit)) {
    return 'złote'
  }
  return 'złotych'
}

/**
 * Converts a number to its word representation in Polish.
 * @param number The number to convert
 * @returns The number in words
 */
export function numberToWords({ number }: NumberToWordsProps): string {
  if (number === 0) return 'zero'

  const digits: string = number.toString()
  let result: string = ''

  // Split the number into groups of three digits
  for (let index = Math.floor((digits.length - 1) / 3); index >= 0; index--) {
    const startIdx = digits.length - (index + 1) * 3
    const endIdx = digits.length - index * 3
    let threeDigitsNumber = parseInt(digits.substring(startIdx, endIdx))

    if (threeDigitsNumber > 0) {
      result += convertThreeDigitsNumberToString(threeDigitsNumber)
      result += addMagnitudeName(threeDigitsNumber, index)
    }
  }

  return result.trim()
}

/**
 * Converts a three-digit number to its word representation.
 * @param threeDigitsNumber The three-digit number
 * @returns The number in words
 */
function convertThreeDigitsNumberToString(threeDigitsNumber: number): string {
  let result: string = HUNDREDS[Math.floor(threeDigitsNumber / 100)]
  const tensValue = threeDigitsNumber % 100

  if (tensValue >= 10 && tensValue < 20) {
    result += TEENS[tensValue % 10]
  } else {
    result += TENS[Math.floor(tensValue / 10)] + ONES[tensValue % 10]
  }

  return result
}

/**
 * Adds the appropriate magnitude name (thousands, millions, billions, etc.).
 * @param number The number to which the magnitude name applies
 * @param power The power of thousand (e.g., 1 - thousand, 2 - million, 3 - billion)
 * @returns The appropriate form of the magnitude name
 */
function addMagnitudeName(number: number, power: number): string {
  if (power === 0 || number === 0) return '' // Don't add units for ones

  let form = 3 // Default plural form
  if (number === 1) {
    form = 1 // Singular form e.g., "tysiąc"
  } else if (number % 10 > 1 && number % 10 < 5 && (number < 10 || number > 20)) {
    form = 2 // "tysiące", "miliony" etc.
  }

  return MAGNITUDES[power][form]
}
