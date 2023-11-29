let gElCanvas
let gCtx
let gTextSize

function initCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = 'white'

  resizeCanvas()
  addListeners()
  renderMeme()
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth
}

function drawText(text, x, y) {
  gCtx.font = `${gTextSize}px Impact`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.lineWidth = 2
  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
  //   /////////////////////////
  gCtx.lineWidth = gWidth

  //   saveCoords(x, y)
}

function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetFillColor(ev) {
  gCtx.fillStyle = ev.target.value
}

// dowload canvas
function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()

  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = 'my-img'
}

//listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //Listen for resize ev
  window.addEventListener('resize', resizeCanvas)
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', (ev) => {})
  gElCanvas.addEventListener('mousemove', (ev) => {})
  gElCanvas.addEventListener('mouseup', () => {})
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', (ev) => {})
  gElCanvas.addEventListener('touchmove', (ev) => {})
  gElCanvas.addEventListener('touchend', () => {})
}

// upload img from local files
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  reader.onload = function (event) {
    let img = new Image()
    img.src = event.target.result
    img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}

/////////

function renderMeme() {
  const meme = getGmeme()
  renderImg(meme.elImg)
}

function renderImg(img) {
  coverCanvasWithImg(img)
  // Draw the img on the canvas
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}
