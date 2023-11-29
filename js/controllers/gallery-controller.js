function onOpenEditor(elImg) {
  const imgId = elImg.dataset.imgId
  const elEditor = document.querySelector('.editor-container')
  elEditor.hidden = false
  elEditor.dataset.imgId = imgId
  initEditor(elImg, imgId)
}
