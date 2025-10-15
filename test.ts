import { numberToWords, getAmountInWords } from './src'

console.log('🧪 Testing numbers-to-words library\n')

// Test Polish numbers
console.log('=== POLISH NUMBER TESTS ===')
const plTests = [
  { input: 0, expected: 'zero' },
  { input: 1, expected: 'jeden' },
  { input: 10, expected: 'dziesięć' },
  { input: 15, expected: 'piętnaście' },
  { input: 21, expected: 'dwadzieścia jeden' },
  { input: 100, expected: 'sto' },
  { input: 123, expected: 'sto dwadzieścia trzy' },
  { input: 1000, expected: 'jeden tysiąc' },
  { input: 2000, expected: 'dwa tysiące' },
  { input: 5000, expected: 'pięć tysięcy' },
  { input: 1234567, expected: 'jeden milion dwieście trzydzieści cztery tysiące pięćset sześćdziesiąt siedem' },
]

plTests.forEach(({ input, expected }) => {
  const result = numberToWords({ number: input })
  const pass = result.trim() === expected.trim()
  console.log(`${pass ? '✅' : '❌'} ${input}: ${result}`)
  if (!pass) console.log(`   Expected: ${expected}`)
})

// Test English numbers
console.log('\n=== ENGLISH NUMBER TESTS ===')
const enTests = [
  { input: 0, expected: 'zero' },
  { input: 1, expected: 'one' },
  { input: 10, expected: 'ten' },
  { input: 15, expected: 'fifteen' },
  { input: 21, expected: 'twenty one' },
  { input: 100, expected: 'one hundred' },
  { input: 123, expected: 'one hundred twenty three' },
  { input: 1000, expected: 'one thousand' },
  { input: 2000, expected: 'two thousand' },
  { input: 5000, expected: 'five thousand' },
  { input: 1234567, expected: 'one million two hundred thirty four thousand five hundred sixty seven' },
]

enTests.forEach(({ input, expected }) => {
  const result = numberToWords({ number: input, locale: 'en-US' })
  const pass = result.trim() === expected.trim()
  console.log(`${pass ? '✅' : '❌'} ${input}: ${result}`)
  if (!pass) console.log(`   Expected: ${expected}`)
})

// Test German numbers
console.log('\n=== GERMAN NUMBER TESTS ===')
const deTests = [
  { input: 0, expected: 'zero' },
  { input: 1, expected: 'eins' },
  { input: 10, expected: 'zehn' },
  { input: 15, expected: 'fünfzehn' },
  { input: 21, expected: 'einundzwanzig' },
  { input: 100, expected: 'einhundert' },
  { input: 123, expected: 'einhundert dreiundzwanzig' },
  { input: 1000, expected: 'eins tausend' },
  { input: 2000, expected: 'zwei tausend' },
  { input: 5000, expected: 'fünf tausend' },
  {
    input: 1234567,
    expected: 'eins Million zweihundert vierunddreißig tausend fünfhundert siebenundsechzig',
  },
]

deTests.forEach(({ input, expected }) => {
  const result = numberToWords({ number: input, locale: 'de-DE' })
  const pass = result.trim() === expected.trim()
  console.log(`${pass ? '✅' : '❌'} ${input}: ${result}`)
  if (!pass) console.log(`   Expected: ${expected}`)
})

// Test Polish currency
console.log('\n=== POLISH CURRENCY TESTS ===')
const plnTests = [
  { input: 1.0, expected: 'jeden złoty, 00/100' },
  { input: 2.0, expected: 'dwa złote, 00/100' },
  { input: 5.0, expected: 'pięć złotych, 00/100' },
  { input: 43.75, expected: 'czterdzieści trzy złote, 75/100' },
  { input: 100.5, expected: 'sto złotych, 50/100' },
  { input: 1000.99, expected: 'jeden tysiąc złotych, 99/100' },
]

plnTests.forEach(({ input, expected }) => {
  const result = getAmountInWords({ amount: input })
  const pass = result.trim() === expected.trim()
  console.log(`${pass ? '✅' : '❌'} ${input}: ${result}`)
  if (!pass) console.log(`   Expected: ${expected}`)
})

// Test USD currency
console.log('\n=== USD CURRENCY TESTS ===')
const usdTests = [
  { input: 1.0, expected: 'one dollar, 00/100' },
  { input: 2.0, expected: 'two dollars, 00/100' },
  { input: 5.0, expected: 'five dollars, 00/100' },
  { input: 43.75, expected: 'forty three dollars, 75/100' },
  { input: 100.5, expected: 'one hundred dollars, 50/100' },
  { input: 1000.99, expected: 'one thousand dollars, 99/100' },
]

usdTests.forEach(({ input, expected }) => {
  const result = getAmountInWords({ amount: input, locale: 'en-US', currency: 'USD' })
  const pass = result.trim() === expected.trim()
  console.log(`${pass ? '✅' : '❌'} ${input}: ${result}`)
  if (!pass) console.log(`   Expected: ${expected}`)
})

// Test EUR currency
console.log('\n=== EUR CURRENCY TESTS ===')
const eurTests = [
  { input: 1.0, expected: 'eins Euro, 00/100' },
  { input: 2.0, expected: 'zwei Euro, 00/100' },
  { input: 5.0, expected: 'fünf Euro, 00/100' },
  { input: 43.75, expected: 'dreiundvierzig Euro, 75/100' },
  { input: 100.5, expected: 'einhundert Euro, 50/100' },
  { input: 1000.99, expected: 'eins tausend Euro, 99/100' },
]

eurTests.forEach(({ input, expected }) => {
  const result = getAmountInWords({ amount: input, locale: 'de-DE', currency: 'EUR' })
  const pass = result.trim() === expected.trim()
  console.log(`${pass ? '✅' : '❌'} ${input}: ${result}`)
  if (!pass) console.log(`   Expected: ${expected}`)
})

console.log('\n✨ All tests completed!')
