let gElCanvas
let gCtx
let gIsSaved
let gPrevCanvasWidth = 0
let gWidthDiff = 0
let gStartPos = null
let gDraggedLine = null
let gIsRandom
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function initCanvas(isRandom, isRefresh = true, isSaved = false) {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = 'white'
  gIsSaved = isSaved
  gIsRandom = isRandom

  resizeCanvas()
  if (isRefresh) addListeners()
  if (!isSaved) setInitLines()
  renderMeme()
}

function setInitLines() {
  setGmemeLineProp('x', gElCanvas.width / 2, 0)
  if (gIsRandom) return
  setGmemeLineProp('x', gElCanvas.width / 2, 1)
  setGmemeLineProp('y', gElCanvas.height - 40, 1)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth
  renderMeme()
}

function drawText(text, size, color, stroke, fontFamily, x, y) {
  gCtx.font = `${size}px ${fontFamily}`
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.lineWidth = 2
  gCtx.strokeStyle = stroke
  gCtx.fillStyle = color

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function drawRect(x, y, width, height, txtAlign) {
  gCtx.beginPath()
  gCtx.lineWidth = 2
  gCtx.strokeStyle = '#00a5af'
  if (txtAlign) {
    switch (txtAlign) {
      case 'center':
        x = gElCanvas.width / 2 - width / 2
        break

      case 'right':
        x = gElCanvas.width - width
        break

      case 'left':
        x = 0
        break
    }
  }

  gCtx.strokeRect(x, y, width, height)
}

function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetFillColor(ev) {
  gCtx.fillStyle = ev.target.value
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    // Prevent triggering the mouse ev
    ev.preventDefault()
    // Gets the first touch point
    ev = ev.changedTouches[0]
    // Calc the right pos according to the touch screen

    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop * 2 - ev.target.clientTop,
    }
  }
  return pos
}

function onDown(ev) {
  const pos = getEvPos(ev)
  const clickedLine = getClickedLine(pos)
  if (!clickedLine) return

  gStartPos = { x: clickedLine.x, y: clickedLine.y }
  gDraggedLine = clickedLine
  document.querySelector('canvas').style.cursor = 'grabbing'

  switchLine(getLineIdx(gDraggedLine))
  document.querySelector('.meme-text-input').value = gDraggedLine.txt
  document.querySelector('.font-family-select').value =
    gDraggedLine.fontFamily.charAt(0).toUpperCase() +
    gDraggedLine.fontFamily.substring(1)
  setGmemeLineProp('txtAlign', null)
  renderMeme(true)
}

function onMove(ev) {
  if (!gDraggedLine) return

  const pos = getEvPos(ev)

  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  const lineIdx = getLineIdx(gDraggedLine)

  setGmemeLineProp('x', gDraggedLine.x + dx, lineIdx)
  setGmemeLineProp('y', gDraggedLine.y + dy, lineIdx)

  gStartPos = pos
  switchLine(lineIdx)
  renderMeme(true)
}

function onUp(ev) {
  gDraggedLine = null
  document.querySelector('canvas').style.cursor = 'grab'
}

function getClickedLine(pos) {
  const lines = getGmeme().lines
  if (!lines.length) return

  return lines.find((line) => isLineClicked(pos, line))
}

function isLineClicked(clickedPos, line) {
  return (
    clickedPos.x >= line.x - line.txtWidth / 2 - 10 &&
    clickedPos.x <= line.x + line.txtWidth / 2 + 10 &&
    clickedPos.y >= line.y - line.size / 2 - 10 &&
    clickedPos.y <= line.y + line.size / 2 + 10
  )
}

// dowload canvas
function downloadCanvas(elLink) {
  renderMeme()
  const dataUrl = gElCanvas.toDataURL()

  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = 'my-img'
  showUserModal('Meme downloaded!')
}

//listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()

  //Listen for resize ev
  window.addEventListener('resize', () => {
    initCanvas(gIsRandom, false, gIsSaved)
    // renderMeme()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
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

function renderMeme(isRect = false) {
  const meme = getGmeme()
  renderImg(meme.elImg)
  if (!meme.lines.length) {
    return
  }
  meme.lines.map((line, idx) => {
    drawText(
      line.txt,
      line.size,
      line.color,
      line.stroke,
      line.fontFamily,
      line.x,
      line.y
    )
    setGmemeLineProp('txtWidth', gCtx.measureText(line.txt).width, idx)
  })

  if (isRect) addRect(getSelectedLine())
}

function renderImg(img) {
  coverCanvasWithImg(img)
  // Draw the img on the canvas
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function coverCanvasWithImg(elImg) {
  if (elImg.naturalHeight === 0) {
    elImg.onload = function () {
      renderMeme()
    }
    return
  }
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function addRect(line) {
  const txtWidth = line.txtWidth
  const txtSize = line.size
  drawRect(
    line.x - txtWidth / 2 - 10,
    line.y - txtSize / 2,
    txtWidth + 20,
    txtSize,
    line.txtAlign
  )
}
