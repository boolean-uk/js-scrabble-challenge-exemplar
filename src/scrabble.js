const points = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
}

const multiplierTokens = {
  '{': '}',
  '[': ']'
}

const multiplierValues = {
  '{': 2,
  '[': 3
}

const scrabble = (str) => {
  str = (str || '').toUpperCase()

  if (str.length === 0) return 0
  if ((/[^\w{}\[\]]/g).test(str)) return 0

  const chars = str.split('')
  const multipliers = []
  let wordMultiplier = 1
  let letterMultiplier = 1
  let score = 0

  for (let i=0; i<chars.length; i++) {
    const char = chars[i]

    if (Object.keys(multiplierTokens).includes(char)) {
      if (chars[i+2] !== multiplierTokens[char]) {
        wordMultiplier *= multiplierValues[char]
      } else {
        letterMultiplier *= multiplierValues[char]
      }

      multipliers.push(char)
      continue
    } else if (Object.values(multiplierTokens).includes(char)) {
      if (chars[i-2] === Object.keys(multiplierTokens).find(open => multiplierTokens[open] === char)) {
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

const findPtsFor = (char) => {
  return Number(Object.keys(points).find(key => points[key].includes(char)))
}

module.exports = scrabble
