const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of character - stays the same', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of string - reversed', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of palindrome - stays the same', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})