'use strict'

function createMat(ROWS, COLS) {
  const mat = []

  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getNeighbors(board, pos, enemy) {
  var counter = 0

  for (let i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (let j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= board[i].length) continue
      if (i === pos.i && j === pos.j) continue
      if (board[i][j].gameElement === enemy) counter++
    }
  }

  return counter
}

function handleElHide(elName, isHide) {
  const el = document.querySelector(elName)
  if (isHide) {
    el.classList.add('hidden')
  } else {
    el.classList.remove('hidden')
  }
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function startClock() {
  const elTimer = document.querySelector('.timer')
  startTime = Date.now()

  gGameInterval = setInterval(() => {
    var timeStamp = (Date.now() - startTime) / 1000
    elTimer.innerText = timeStamp
  }, 100)
}

function getFormattedTime(timestamp) {
  const now = new Date(timestamp)

  const minutes = now.getMinutes()
  const hours = now.getHours()
  const day = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  return `${hours}:${minutes} ${day}/${month}/${year}`
}
