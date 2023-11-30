var gColor
var gStroke
var gSize
var gFontFamily
var gTextAlign

function initEditor(elImg, imgId) {
  gColor = 'white'
  gStroke = 'black'
  gFontFamily = 'impact'
  gTextAlign = 'center'
  setMeme(elImg, imgId)
  initCanvas()

  const meme = getGmeme()
  document.querySelector('.meme-text-input').value =
    meme.lines[meme.selectedLineIdx].txt
}

function onTextChange(ev) {
  ev.stopPropagation()
  const txt = ev.target.value
  setGmemeLineProp('txt', txt)
  renderMeme(true)
}

function onCloseEditor() {
  document.querySelector('.editor-container').hidden = true
  document.body.style.overflowY = 'scroll'
}

function activatePicker(selector) {
  document.querySelector(selector).click()
}

function onColorChange(elInput) {
  const color = elInput.value
  document.querySelector('.fa-palette').style.color = color

  setGmemeLineProp('color', color)
  renderMeme(true)

  gColor = color
}

function onStrokeChange(elInput) {
  const strokeColor = elInput.value
  document.querySelector('.fa-underline').style.color = strokeColor

  setGmemeLineProp('stroke', strokeColor)
  renderMeme(true)

  gStroke = strokeColor
}

function onChangeFontSize(isIncrease, ev) {
  ev.stopPropagation()
  const meme = getGmeme()
  if (!meme.lines.length) return
  const diff = isIncrease ? 3 : -3
  const size = meme.lines[meme.selectedLineIdx].size + diff

  setGmemeLineProp('size', size)
  renderMeme(true)

  gSize = size
}

function onAddLine(ev) {
  ev.stopPropagation()
  const line = 'New Line'
  addLine(
    'New Line',
    gColor,
    gStroke,
    gElCanvas.width / 2,
    gElCanvas.height / 2,
    gSize
  )
  renderMeme(true)
  document.querySelector('.meme-text-input').value = line
}

function onSwitchLine(ev) {
  ev.stopPropagation()
  const newLine = switchLine()
  document.querySelector('.meme-text-input').value = newLine
    ? newLine.txt
    : null
  renderMeme(true)
}

function onChangeFontFamily(elSelect) {
  gFontFamily = elSelect.value
  renderMeme(true)
}

function onChangeAlign(dir) {
  gTextAlign = dir
  renderMeme(true)
}

function onDeleteLine() {
  deleteLine()
  const newLine = switchLine()
  document.querySelector('.meme-text-input').value = newLine
    ? newLine.txt
    : null
  renderMeme(true)
}

function onMoveText(isUp) {
  const meme = getGmeme()
  if (!meme.lines.length) return

  const diff = isUp ? -3 : 3
  const posY = meme.lines[meme.selectedLineIdx].y + diff
  setGmemeLineProp('y', posY)
  renderMeme(true)
}

function onSaveMeme() {
  saveMeme()
}
