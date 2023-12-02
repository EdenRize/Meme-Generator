var gColor
var gStroke
var gSize
var gFontFamily
var gTextAlign
var savedMemeIdx

function initEditor(isRandom, elImg, imgId, isSaved, memeIdx) {
  gColor = 'white'
  gStroke = 'black'
  gFontFamily = 'impact'
  gTextAlign = 'center'

  setMeme(isRandom, elImg, imgId, isSaved, memeIdx)
  initCanvas(isRandom, true, isSaved)
  renderImojis()

  const meme = getGmeme()
  document.querySelector('.meme-text-input').value =
    meme.lines[meme.selectedLineIdx].txt
  savedMemeIdx = memeIdx
}

function renderImojis() {
  const emojis = getImojis()
  var strHTML = ''

  emojis.map((emoji) => {
    strHTML += `
    <button
    onclick="  addLine(
      '${emoji.emojiTxt}',
      gColor,
      gStroke,
      gElCanvas.width / 2,
      gElCanvas.height / 2,
      gSize
    )
    renderMeme(true)"
    class="emoji-btn btn-hover pointer"
    >
    ${emoji.emojiTxt}
    </button>
    `
  })

  document.querySelector('.emojis-container').innerHTML = strHTML
}

function onTextChange(ev) {
  ev.stopPropagation()
  const txt = ev.target.value
  setGmemeLineProp('txt', txt)
  renderMeme(true)
}

function onCloseEditor() {
  document.querySelector('.editor-container').classList.remove('opened-editor')
  document.body.style.overflowY = 'scroll'
  changeColor('white')
  changeStroke('black')
}

function onColorChange(elInput) {
  const color = elInput.value
  changeColor(color)

  setGmemeLineProp('color', color)
  renderMeme(true)
}

function onStrokeChange(elInput) {
  const strokeColor = elInput.value
  changeStroke(strokeColor)

  setGmemeLineProp('stroke', strokeColor)
  renderMeme(true)
}

function changeColor(color) {
  document.querySelector('.fa-palette').style.color = color
  gColor = color
}

function changeStroke(strokeColor) {
  document.querySelector('.fa-underline').style.color = strokeColor
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
  renderMeme(false)
  saveMeme(savedMemeIdx)
  renderSavedMemes()
  setCurrPage('saved memes')
  showUserModal('Meme saved!')
  onCloseEditor()
}
