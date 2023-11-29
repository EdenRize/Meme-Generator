function initEditor(elImg, imgId) {
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
}

function onChangeFontSize(isIncrease) {
  const meme = getGmeme()
  const diff = isIncrease ? 3 : -3

  setGmemeLineProp('size', meme.lines[meme.selectedLineIdx].size + diff)
  renderMeme()
}
