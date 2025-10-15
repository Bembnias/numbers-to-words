# Usage Guide

## Quick Start

```typescript
import { numberToWords, getAmountInWords } from 'i18n-number-to-words'

// Convert number to words (Polish - default)
const words = numberToWords({ number: 123 })
console.log(words) // "sto dwadzieścia trzy"

// Convert amount with currency (Polish PLN - default)
const amount = getAmountInWords({ amount: 43.75 })
console.log(amount) // "czterdzieści trzy złote, 75/100"
```

## Advanced Usage

### Multiple Languages

```typescript
import { numberToWords } from 'i18n-number-to-words'

// Polish
numberToWords({ number: 1234, locale: 'pl-PL' })
// "jeden tysiąc dwieście trzydzieści cztery"

// English
numberToWords({ number: 1234, locale: 'en-US' })
// "one thousand two hundred thirty four"

// German
numberToWords({ number: 1234, locale: 'de-DE' })
// "eins tausend zweihundert vierunddreißig"
```

### Multiple Currencies

```typescript
import { getAmountInWords } from 'i18n-number-to-words'

// Polish Złoty (PLN)
getAmountInWords({
  amount: 100.5,
  locale: 'pl-PL',
  currency: 'PLN',
})
// "sto złotych, 50/100"

// US Dollar (USD)
getAmountInWords({
  amount: 100.5,
  locale: 'en-US',
  currency: 'USD',
})
// "one hundred dollars, 50/100"

// Euro (EUR)
getAmountInWords({
  amount: 100.5,
  locale: 'de-DE',
  currency: 'EUR',
})
// "einhundert Euro, 50/100"
```

## Language-Specific Features

### Polish (pl-PL)

Polish language has complex plural rules that are properly handled:

```typescript
numberToWords({ number: 1, locale: 'pl-PL' }) // "jeden"
numberToWords({ number: 2, locale: 'pl-PL' }) // "dwa"
numberToWords({ number: 5, locale: 'pl-PL' }) // "pięć"

numberToWords({ number: 1000, locale: 'pl-PL' }) // "jeden tysiąc" (singular)
numberToWords({ number: 2000, locale: 'pl-PL' }) // "dwa tysiące" (plural form 1)
numberToWords({ number: 5000, locale: 'pl-PL' }) // "pięć tysięcy" (plural form 2)
```

Currency forms in Polish:

```typescript
getAmountInWords({ amount: 1, locale: 'pl-PL' }) // "jeden złoty"
getAmountInWords({ amount: 2, locale: 'pl-PL' }) // "dwa złote"
getAmountInWords({ amount: 5, locale: 'pl-PL' }) // "pięć złotych"
```

### English (en-US)

English has simpler plural rules:

```typescript
numberToWords({ number: 1, locale: 'en-US' }) // "one"
numberToWords({ number: 2, locale: 'en-US' }) // "two"

numberToWords({ number: 1000, locale: 'en-US' }) // "one thousand"
numberToWords({ number: 2000, locale: 'en-US' }) // "two thousand"
```

Currency forms in English:

```typescript
getAmountInWords({ amount: 1, locale: 'en-US', currency: 'USD' }) // "one dollar"
getAmountInWords({ amount: 2, locale: 'en-US', currency: 'USD' }) // "two dollars"
```

### German (de-DE)

German has unique number construction rules - numbers 21-99 are reversed (ones + tens):

```typescript
numberToWords({ number: 21, locale: 'de-DE' }) // "einundzwanzig" (one-and-twenty)
numberToWords({ number: 47, locale: 'de-DE' }) // "siebenundvierzig" (seven-and-forty)
numberToWords({ number: 99, locale: 'de-DE' }) // "neunundneunzig" (nine-and-ninety)

numberToWords({ number: 1000, locale: 'de-DE' }) // "eins tausend"
numberToWords({ number: 2000, locale: 'de-DE' }) // "zwei tausend"
```

Currency forms in German (Euro is invariant):

```typescript
getAmountInWords({ amount: 1, locale: 'de-DE', currency: 'EUR' }) // "eins Euro"
getAmountInWords({ amount: 2, locale: 'de-DE', currency: 'EUR' }) // "zwei Euro"
getAmountInWords({ amount: 100, locale: 'de-DE', currency: 'EUR' }) // "einhundert Euro"
```

## TypeScript Support

The library is written in TypeScript and provides full type definitions:

```typescript
import {
  numberToWords,
  getAmountInWords,
  type Locale,
  type Currency,
  type NumberToWordsProps,
  type GetAmountInWordsProps,
} from 'i18n-number-to-words'

const locale: Locale = 'en-US'
const currency: Currency = 'USD'

const options: GetAmountInWordsProps = {
  amount: 123.45,
  locale,
  currency,
}

const result = getAmountInWords(options)
```

## Extending the Library

### Adding a New Language

To add support for a new language, you need to:

1. Add the locale type to `Locale` in `types.ts`
2. Create a new `LanguageConfig` in `constants.ts`
3. Add the configuration to `LANGUAGE_CONFIGS`

### Adding a New Currency

To add support for a new currency, you need to:

1. Add the currency code to `Currency` in `types.ts`
2. Create a new `CurrencyConfig` in `constants.ts`
3. Add the configuration to `CURRENCY_CONFIGS`

## Performance

The library is optimized for performance:

- Zero dependencies
- Pure functions
- No runtime overhead
- Tree-shakeable

## Common Patterns

### Form Validation

```typescript
function validateAmount(input: string): string {
  const amount = parseFloat(input)
  if (isNaN(amount)) {
    throw new Error('Invalid amount')
  }
  return getAmountInWords({ amount })
}
```

### Invoice Generation

```typescript
interface Invoice {
  total: number
  locale: Locale
  currency: Currency
}

function generateInvoiceText(invoice: Invoice): string {
  const { total, locale, currency } = invoice
  const amountInWords = getAmountInWords({ amount: total, locale, currency })
  return `Total: ${amountInWords}`
}
```

### Multi-language Support in Apps

```typescript
import { getAmountInWords, type Locale, type Currency } from 'i18n-number-to-words'

class PaymentFormatter {
  constructor(private locale: Locale, private currency: Currency) {}

  format(amount: number): string {
    return getAmountInWords({
      amount,
      locale: this.locale,
      currency: this.currency,
    })
  }
}

const plnFormatter = new PaymentFormatter('pl-PL', 'PLN')
const usdFormatter = new PaymentFormatter('en-US', 'USD')
const eurFormatter = new PaymentFormatter('de-DE', 'EUR')

console.log(plnFormatter.format(100)) // "sto złotych, 00/100"
console.log(usdFormatter.format(100)) // "one hundred dollars, 00/100"
console.log(eurFormatter.format(100)) // "einhundert Euro, 00/100"
```
