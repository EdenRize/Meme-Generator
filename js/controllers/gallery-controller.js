addResizeListner()

function addResizeListner() {
  window.addEventListener('resize', renderKeywords)
}

function onOpenEditor(isRandom, elImg, isSaved, memeIdx) {
  const imgId = elImg.dataset.imgId
  const elEditor = document.querySelector('.editor-container')
  elEditor.classList.add('opened-editor')
  elEditor.dataset.imgId = imgId

  initEditor(isRandom, elImg, imgId, isSaved, memeIdx)
  document.body.style.overflowY = 'hidden'
  closeMenu()
}

function onRandomMeme() {
  const elImges = document.querySelectorAll('.meme-img')
  const elImg = elImges[getRandomInt(0, elImges.length)]
  onOpenEditor(true, elImg)
}

function onSetFilter(filter) {
  setFilterBy(filter)
  const elMemeContainer = document.querySelector('.memes-container')

  if (elMemeContainer) {
    if (filter === '') renderGallery()
    else elMemeContainer.innerHTML = getHTMLGalleryMemes(getGimges())

    document.querySelector('.search-input').value = filter
    renderKeywords()
  }
}

function onImgInput(ev) {
  loadImageFromInput(ev, onUserImgReady)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  reader.onload = function (event) {
    let img = new Image()
    img.src = event.target.result
    img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}

function onUserImgReady(img) {
  const elImg = recreateImg(img)
  const addedImgInfo = addImg(elImg)
  const imgId = addedImgInfo.id
  elImg.dataset.imgId = imgId
  onOpenEditor(false, elImg, false)
}
