import { winningCombinations, choices } from './data'

const initializeArrays = () => ({ choices: [].concat(choices), person: [[], []] })
const initializeVariables = () => ({ count: 0, gameRunning: true })
const checkGameEnded = (gameRunning, count) => !gameRunning || count === 9

const displayBoard = (choices, isStarted = false) => {
    isStarted && console.log("\n-----------------------------------------------------\nLet's Start a new game")
    if (choices.length > 0) for (let i = -1; i < choices.length - 1;) console.log(`${choices[++i]}\t${choices[++i]}\t${choices[++i]}\n`)
}

const getAndValidateInput = (p, person) => {
    if (!p) return
    let input = parseInt(prompt(`Person ${p}\'s Turn, Enter your choice: `))
    while (!input || input < 1 || input > 9 || person[0].some(num => num === input) || person[1].some(num => num === input))
        input = parseInt(prompt(`Wrong Input!!! \nPerson ${p}\'s Turn, Enter your choice: `))
    return input
}

const checkIfWon = (person) => {
    for (const combo of winningCombinations)
        if (JSON.stringify(person) === JSON.stringify([...new Set(person.concat(combo))])) return true;
    return false
}

const personTurn = (p, person, choices, count) => {
    let gameRunning = true
    let input = getAndValidateInput(p, person)

    count++
    person[p - 1].push(input)
    choices[input - 1] = p === 1 ? '✅' : '❌'

    displayBoard(choices)
    if (checkIfWon(person[p - 1])) {
        gameRunning = false
        console.log(`Person ${p} is the winner`);
    }
    if (count === 9) gameRunning = false
    return { gameRunning, count }
}

const playTicTacToe = () => {
    let play = true
    while (play) {
        const { choices, person } = initializeArrays()
        var { count, gameRunning } = initializeVariables()
        displayBoard(choices, true)

        while (gameRunning) {
            for (let i = 1; i <= 2; i++) {
                var { gameRunning, count } = personTurn(i, person, choices, count)
                if (i == 1 && checkGameEnded(gameRunning, count)) {
                    gameRunning = false
                    break
                }
            }
        }
        play = prompt('Want to start the new game (Enter \'y\' for yes OR any key for no): ') === 'y'

    }
    console.log("Thanks for playing")
}

export const welcomePlayer = () => { console.log('WELCOME TO THIS CONSOLE BASED IC TAC TOE') }

export default playTicTacToe