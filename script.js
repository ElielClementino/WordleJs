import { chooseDifferentWordEachDay } from './wordsOfTheDay.js';
const tile = document.querySelector('.tile_container')
const keyboard = document.querySelector('.key_container')
const keyboard_keys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','BACKSPACE',]
const messageDisplay = document.querySelector('.message_container')
const wordOfTheDay = chooseDifferentWordEachDay().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()
const body = document.querySelector('body')

const tilesRow = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]

let currentRow = 0
let currentTile = 0
let endgame = false


tilesRow.forEach((tilesRow, tilesRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', `tileRow_${tilesRowIndex}`)
    tilesRow.forEach((guess, guessIndex) => {
        const tilesElement = document.createElement('div')
        tilesElement.setAttribute('id',`guessRow_${tilesRowIndex}_tile_${guessIndex}`)
        tilesElement.classList.add('tile')
        rowElement.append(tilesElement)
    })
    tile.append(rowElement)
})


keyboard_keys.forEach(key =>{
    const button = document.createElement('button')
    button.textContent = key
    button.setAttribute('id', key)
    button.addEventListener('click',  () => getButtonClick(key))
    keyboard.append(button)
})

const listener = event =>{
    let letter = event.key.toUpperCase()
    tilesRow.push(letter)
    validar(letter)
}



const validar = letter =>{
    if(letter == 'ENTER'){
    checkRow()
    return    
    }
    if(letter == 'BACKSPACE' || letter == ''){
        deleteLetter()
        return 
    }
    if(!keyboard_keys.includes(letter)){
        return 
    }
    addLetter(letter)
}


body.addEventListener('keydown', listener)

const getButtonClick = (letter) =>{
    if(letter === 'BACKSPACE'){
        deleteLetter()
        return
    }
    if(letter === 'ENTER'){
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter = (letter) =>{
    if(currentTile < 5 && currentRow < 6){
    const tile = document.getElementById(`guessRow_${currentRow}_tile_${currentTile}`)
    tile.textContent = letter
    tilesRow[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
    }
}

const deleteLetter = async () => {
    if(currentTile > 0){
        currentTile--
        const tile = document.getElementById(`guessRow_${currentRow}_tile_${currentTile}`)
        tile.textContent = ''
        tilesRow[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = async () =>{
    const guess = tilesRow[currentRow].join('')
    if(currentTile > 4){
        flipTile()
        if(wordOfTheDay.includes(guess)){
            alert('eliel')
        }
        if(guess == wordOfTheDay){
            showMessage('Parabéns você acertou')
            endgame == true
            return
        }
        else {
            if(currentRow >=5 ){
                endgame == false
                showMessage('GameOver')
                return
            }
            if(currentRow < 5){
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) =>{
    const messageEvent = document.createElement('p')
    messageEvent.textContent = message
    messageDisplay.append(messageEvent)
}

const addColorToKeyboard = async (keyLetter, color) =>{
    const keyboardKey = document.getElementById(keyLetter)
    keyboardKey.classList.add(color)
}


const flipTile = async () => {
    const rowTiles = document.querySelector(`#tileRow_${currentRow}`).childNodes
    rowTiles.forEach((tile, index) =>{
            const tileData = tile.getAttribute('data')

            setTimeout( async ()=>{
                tile.classList.add('flip')
                if (tileData == wordOfTheDay[index]){
                    tile.classList.add('green_change')
                    addColorToKeyboard(tileData, 'green_change')
                }
                else if(wordOfTheDay.includes(tileData)){
                    tile.classList.add('yellow_change')
                    addColorToKeyboard(tileData, 'yellow_change')
                }
                else {
                    tile.classList.add('grey_change')
                    addColorToKeyboard(tileData, 'grey_change')
                }
            }, 500 * index)
    })
}
