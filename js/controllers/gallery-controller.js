function onOpenEditor(elImg, isSaved, memeIdx) {
  const imgId = elImg.dataset.imgId
  const elEditor = document.querySelector('.editor-container')
  elEditor.hidden = false
  elEditor.dataset.imgId = imgId
  const img = getImg(imgId)
  if (isSaved) {
    // elImg = new Image()
    // elImg.src = img.url
  }
  initEditor(elImg, imgId, isSaved, memeIdx)
  document.body.style.overflowY = 'hidden'
  closeMenu()
}

function onRandomMeme() {
  const elImges = document.querySelectorAll('.meme-img')
  const elImg = elImges[getRandomInt(0, elImges.length)]
  onOpenEditor(elImg)
}

function onSetFilter(filter) {
  setFilterBy(filter)
  document.querySelector('.memes-container').innerHTML = getHTMLGalleryMemes(
    getGimges()
  )
}
