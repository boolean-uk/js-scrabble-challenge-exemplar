const scoring = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
}

function scrabble(word) {
  // check there aren't mismatched brackets
  if (checkNotAllowed(word) === false) {
    return 0
  }

  // trim whitespace
  let newWord = word.trim()

  // check there aren't mismatched brackets
  if (mismatchedBracket(newWord) === false) {
    return 0
  }

  // check for letter multiplier
  let letterMultplierAddition = 0
  let newWordWithoutLetterMulti = newWord
  const bracketsMatch = [
    {
      brackets: ['{', '}'],
      regex: /\{(.*?)\}/g,
      mulitplier: 2
    },
    {
      brackets: ['[', ']'],
      regex: /\[(.*?)\]/g,
      mulitplier: 3
    }
  ]
  bracketsMatch.forEach((matchValues) => {
    if (newWord.match(matchValues.regex)?.length > 0) {
      // add wordMultiplier, minus correction at end
      newWord.match(matchValues.regex).forEach((letter) => {
        const letterTrim = letter
          .replaceAll(matchValues.brackets[0], '')
          .replaceAll(matchValues.brackets[1], '')
        // if the letter is 1 or multiple - like word
        if (letterTrim.length === 1) {
          Object.keys(scoring).forEach((el) => {
            letterMultplierAddition += scoring[el].includes(
              letterTrim.toUpperCase()
            )
              ? Number(el) * matchValues.mulitplier - Number(el)
              : 0
          })
          // now replace that letter with no brackets, and save
          const getIndex = newWordWithoutLetterMulti.indexOf(letter)
          const newArr = newWordWithoutLetterMulti.split('')
          newArr.splice(getIndex, 3)
          newArr.splice(getIndex, 0, letter[1])
          newWordWithoutLetterMulti = newArr.join('')
        }
      })
    }
  })
  newWord = newWordWithoutLetterMulti

  // check for word multiplier
  const wordMultiplier = {
    scoreMultiplier: 1,
    iterations: 0
  }
  for (let i = 0; i < newWord.length; i++) {
    if (newWord[i].match(/[a-z]/)?.length > 0) {
      break
    }
    if (
      (newWord[i] === '[' && newWord[newWord.length - i - 1] === ']') ||
      (newWord[i] === '{' && newWord[newWord.length - i - 1] === '}')
    ) {
      wordMultiplier.scoreMultiplier *= newWord[i] === '[' ? 3 : 2
      wordMultiplier.iterations += 1
    }
  }

  let total = 0
  // score letters as normal
  for (let i = 0; i < newWord.length; i++) {
    Object.keys(scoring).forEach((el) => {
      total += scoring[el].includes(newWord[i].toUpperCase()) ? Number(el) : 0
    })
  }

  return (total + letterMultplierAddition) * wordMultiplier.scoreMultiplier
}

function checkNotAllowed(word) {
  // or characters not letters or curly/square brackets, return 0
  if (
    word?.length === 0 ||
    !word ||
    word
      .toLowerCase()
      .replace(/[a-z]/g, '')
      .replaceAll(/[[\]']+/g, '')
      .replaceAll(/[{}]/g, '').length > 0
  )
    return false
}

function mismatchedBracket(word) {
  if (word.includes('[') || word.includes(']')) {
    const brackets = word.match(/[\]]/g)?.length === word.match(/[[]/g)?.length
    if (brackets === false) {
      return false
    }
  }
  if (word.includes('}') || word.includes('{')) {
    const brackets = word.match(/[}]/g)?.length === word.match(/[{]/g)?.length
    if (brackets === false) {
      return false
    }
  }
}

module.exports = scrabble
