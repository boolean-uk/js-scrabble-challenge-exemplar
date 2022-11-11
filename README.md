# Scrabble Challenge

Welcome to the Scrabble challenge!

## Learning Objectives
- Build a simple program using functions, loops, and conditional statements
- Use `git` & GitHub to commit work and open a Pull Request

## Instructions

1. Fork this repository and then:
```sh
git clone [your repo] && cd js-scrabble-challenge
npm ci # installs dependencies listed in package.json
```
2. Run the tests from your project root directory. There should be a lot of failures to begin with. You can run your test suite in a few ways:
```sh
npm test
# or
npx jasmine
# or run jasmine directly
./node_modules/jasmine/bin/jasmine.js
```
3. In GitHub, [open a Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) from your forked repository to the challenge repository.
4. Implement the criteria below locally and [push your code](https://docs.github.com/en/github/managing-files-in-a-repository/adding-a-file-to-a-repository-using-the-command-line) to your repository! Every push to a branch that has an open Pull Request will update it automatically with your changes.
5. Check the status of the automated tests on the Pull Request - update your implementation if needed.

# Task

Given a word, compute the scrabble score for that word.

##### Letter Values

You'll need these:

| Letter                        | Value  |
| ----                          |  ----  |
| A, E, I, O, U, L, N, R, S, T  |     1  |
| D, G                          |     2  |
| B, C, M, P                    |     3  |
| F, H, V, W, Y                 |     4  |
| K                             |     5  |
| J, X                          |     8  |
| Q, Z                          |     10 |

Example
"cabbage" should be scored as worth 14 points:

- 3 points for C
- 1 point for A, twice
- 3 points for B, twice
- 2 points for G
- 1 point for E

And to total:

```
3 + 2x1 + 2x3 + 2 + 1
= 3 + 2 + 6 + 3
= 14
```

## Acceptance Criteria

```js
scrabble('') // should return 0

scrabble(" \t\n") // should return 0

scrabble(null) // should return 0

scrabble('a') // should return 1

scrabble('f') // should return 4

scrabble('street') // should return 6

scrabble('quirky') // should return 22

scrabble('OXYPHENBUTAZONE') // should return 41
```

## Extended Acceptance Criteria

For some of the extended criteria, you may need to look up functions and techniques you have not used before.

### Double and Triple Letter
Your solution should support the ability to define specific letters as double and triple score. Letters that count as double are enclosed in a pair of curly brackets `{}` - for example, the letter `o` would be defined as a double letter in in the word dog like this: `d{o}g`. Triple letters are enclosed in a set of square brackets - for example: `d[o]g`. Your solution should detect these brackets and apply the correct score modifications. You should add tests for this functionality to the spec file.

### Double or Triple Word
Similar to above, your solution should support the ability to define double and triple word scores. To indicate a double word score, the submitted word will be enclose in a pair of curly brackets (for example `{dog}`), and for triple word score a pair of square brackets (`[dog]`). Your solution should detect these brackets and apply the correct score modifications. You should add tests for this functionality to the spec file.

### Concise Code
Split up your `scrabble` function in to multiple smaller functions that do one thing only. Read this [article on Clean Functions](https://github.com/ryanmcdermott/clean-code-javascript#functions) and apply the principles you think are relevant.
