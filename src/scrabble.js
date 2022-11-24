const { findPtsFor } = require('./findPtsForLetter')
const { multiplierTokens, multiplierValues } = require('./multiplierData')

const isNotValid = (str) =>
  str.length === 0 ||
  /[^\w{}\[\]]/g.test(str) /* eslint-disable-line no-useless-escape */

const scrabble = (str) => {
  str = (str || '').toUpperCase()
  if (isNotValid(str)) return 0

  const chars = str.split('')
  const multipliers = []
  let wordMultiplier = 1
  let letterMultiplier = 1
  let score = 0

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]

    if (Object.keys(multiplierTokens).includes(char)) {
      if (chars[i + 2] !== multiplierTokens[char]) {
        wordMultiplier *= multiplierValues[char]
      } else {
        letterMultiplier *= multiplierValues[char]
      }
      multipliers.push(char)
      continue
    } else if (Object.values(multiplierTokens).includes(char)) {
      if (
        chars[i - 2] ===
        Object.keys(multiplierTokens).find(
          (open) => multiplierTokens[open] === char
        )
      ) {
        letterMultiplier = 1
      }
      multipliers.push(char)
      continue
    }

    score += findPtsFor(char) * letterMultiplier
  }

  if (multipliers.length % 2 !== 0) return 0

  return score * wordMultiplier
}

module.exports = scrabble
