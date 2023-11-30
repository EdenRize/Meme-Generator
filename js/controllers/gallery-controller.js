function onOpenEditor(elImg) {
  const imgId = elImg.dataset.imgId
  const elEditor = document.querySelector('.editor-container')
  elEditor.hidden = false
  elEditor.dataset.imgId = imgId
  initEditor(elImg, imgId)
  document.body.style.overflowY = 'hidden'
}

function onRandomMeme() {
  const elImges = document.querySelectorAll('.meme-img')
  const elImg = elImges[getRandomInt(0, elImges.length)]
  onOpenEditor(elImg)
}
