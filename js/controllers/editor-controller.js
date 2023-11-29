var gColor
var gSize

function initEditor(elImg, imgId) {
  gColor = 'white'

  setMeme(elImg, imgId)
  initCanvas()

  const meme = getGmeme()
  document.querySelector('.meme-text-input').value =
    meme.lines[meme.selectedLineIdx].txt
}

function onTextChange(ev) {
  const txt = ev.target.value
  setGmemeLineProp('txt', txt)
  renderMeme()
}

function onCloseEditor() {
  document.querySelector('.editor-container').hidden = true
  document.body.style.overflowY = 'scroll'
}

function activateColorPicker() {
  var colorInput = document.querySelector('.color-input')
  colorInput.click()
}

function onColorChange(elInput) {
  const color = elInput.value
  document.querySelector('.fa-palette').style.color = color

  setGmemeLineProp('color', color)
  renderMeme()

  gColor = color
}

function onChangeFontSize(isIncrease) {
  const meme = getGmeme()
  const diff = isIncrease ? 3 : -3
  const size = meme.lines[meme.selectedLineIdx].size + diff

  setGmemeLineProp('size', size)
  renderMeme()

  gSize = size
}

function onAddLine() {
  const line = 'New Line'
  addLine('New Line', gColor, gElCanvas.width / 2, gElCanvas.height / 2, gSize)
  renderMeme()
  document.querySelector('.meme-text-input').value = line
}

function onSwitchLine() {
  const newLine = switchLine()
  document.querySelector('.meme-text-input').value = newLine.txt
}
