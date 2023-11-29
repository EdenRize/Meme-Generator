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
