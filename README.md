<div align="center">
    <img src="https://raw.githubusercontent.com/Bembnias/numbers-to-words/refs/heads/main/assets/number-to-words-logo.png" width="70%" />
</div>
<br />
A TypeScript library for converting numbers to their word representation in multiple languages, with support for currency formatting.

## Features

- 🌍 **Multi-language support**: Polish (pl-PL), English (en-US), and German (de-DE)
- 💰 **Currency support**: PLN (Polish Złoty), USD (US Dollar), and EUR (Euro)
- 🔢 **Number to words conversion**: Convert any number to its word representation
- 💵 **Amount formatting**: Convert monetary amounts with proper currency forms
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🚀 **Zero dependencies**
- 🎯 **Tree-shakeable**: Only import what you need

## Installation

```bash
npm install numbers-to-words
```

## Quick Start

```typescript
import { numberToWords, getAmountInWords } from 'numbers-to-words'

// Polish (default)
numberToWords({ number: 123 })
// Output: "sto dwadzieścia trzy"

// English
numberToWords({ number: 123, locale: 'en-US' })
// Output: "one hundred twenty three"

// German
numberToWords({ number: 123, locale: 'de-DE' })
// Output: "einhundert dreiundzwanzig"

// With currency
getAmountInWords({ amount: 43.75, locale: 'en-US', currency: 'USD' })
// Output: "forty three dollars, 75/100"
```

## Documentation

- 📖 [Usage Guide](./USAGE.md) - Comprehensive usage examples
- 🔄 [Migration Guide](./MIGRATION.md) - Upgrading from v1.x
- 📝 [Changelog](./CHANGELOG.md) - Version history

## Usage

### Number to Words

```typescript
import { numberToWords } from 'numbers-to-words'

// Polish (default)
numberToWords({ number: 123 })
// Output: "sto dwadzieścia trzy"

numberToWords({ number: 1000 })
// Output: "jeden tysiąc"

// English
numberToWords({ number: 123, locale: 'en-US' })
// Output: "one hundred twenty three"

numberToWords({ number: 1000, locale: 'en-US' })
// Output: "one thousand"

// German
numberToWords({ number: 123, locale: 'de-DE' })
// Output: "einhundert dreiundzwanzig"

numberToWords({ number: 1000, locale: 'de-DE' })
// Output: "eins tausend"
```

### Amount in Words (with Currency)

```typescript
import { getAmountInWords } from 'numbers-to-words'

// Polish with PLN (default)
getAmountInWords({ amount: 43.75 })
// Output: "czterdzieści trzy złote, 75/100"

getAmountInWords({ amount: 1.0 })
// Output: "jeden złoty, 00/100"

// English with USD
getAmountInWords({ amount: 43.75, locale: 'en-US', currency: 'USD' })
// Output: "forty three dollars, 75/100"

getAmountInWords({ amount: 1.0, locale: 'en-US', currency: 'USD' })
// Output: "one dollar, 00/100"

// German with EUR
getAmountInWords({ amount: 43.75, locale: 'de-DE', currency: 'EUR' })
// Output: "dreiundvierzig Euro, 75/100"

getAmountInWords({ amount: 1.0, locale: 'de-DE', currency: 'EUR' })
// Output: "eins Euro, 00/100"
```

## API Reference

### `numberToWords(options)`

Converts a number to its word representation.

**Parameters:**

- `options.number` (number, required): The number to convert
- `options.locale` (Locale, optional): Language locale. Default: `'pl-PL'`
  - Available: `'pl-PL'` | `'en-US'` | `'de-DE'`

**Returns:** `string` - The number in words

### `getAmountInWords(options)`

Converts a monetary amount to words with currency.

**Parameters:**

- `options.amount` (number, required): The monetary amount
- `options.locale` (Locale, optional): Language locale. Default: `'pl-PL'`
  - Available: `'pl-PL'` | `'en-US'` | `'de-DE'`
- `options.currency` (Currency, optional): Currency code. Default: `'PLN'`
  - Available: `'PLN'` | `'USD'` | `'EUR'`

**Returns:** `string` - The amount in words with currency

## Supported Languages

- 🇵🇱 **Polish (pl-PL)**: Full support with proper plural forms
- 🇺🇸 **English (en-US)**: Full support with standard American English
- 🇩🇪 **German (de-DE)**: Full support with German number rules (reversed order for 21-99)

## Supported Currencies

- **PLN** (Polish Złoty): With proper Polish plural forms (złoty/złote/złotych)
- **USD** (US Dollar): With English plural forms (dollar/dollars)
- **EUR** (Euro): With German formatting (Euro is invariant)

## License

Read license here - [MIT License](https://github.com/Bembnias/numbers-to-words/blob/main/LICENSE.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Contributing Rules

- Remember to add tests to the `test.ts` file. 😉
- Describe the changes in the Pull Request so that it is clear what has been added.
- Add TSDoc to new features/functions.
