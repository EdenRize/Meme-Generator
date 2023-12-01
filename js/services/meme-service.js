var gImgs
var gEmojis = [
  { emojiTxt: '😀', idx: 0 },
  { emojiTxt: '😂', idx: 1 },
  { emojiTxt: '😏', idx: 2 },
  { emojiTxt: '😈', idx: 3 },
  { emojiTxt: '😉', idx: 4 },
]
var gMeme = {}
var gKeywordSearchCountMap = { funny: 12, animal: 16, baby: 2 }
var gFilterBy = ''

initGimgs()

function initGimgs() {
  var imgs = getFromStorage('imgs')
  if (!imgs || !imgs.length) {
    imgs = createImgs()
    saveToStorage('imgs', imgs)
  }

  gImgs = imgs
}

function createImgs() {
  return [
    { id: 1, url: './img/memes/2.jpg', keywords: ['happy', 'women'] },
    { id: 2, url: './img/memes/003.jpg', keywords: ['funny', 'men', 'mad'] },
    { id: 3, url: './img/memes/004.jpg', keywords: ['cute', 'animal'] },
    { id: 4, url: './img/memes/5.jpg', keywords: ['funny', 'cute', 'baby'] },
    { id: 5, url: './img/memes/005.jpg', keywords: ['cute', 'animal', 'baby'] },
    { id: 6, url: './img/memes/006.jpg', keywords: ['cute', 'animal'] },
    { id: 7, url: './img/memes/8.jpg', keywords: ['funny', 'men', 'smile'] },
    { id: 8, url: './img/memes/9.jpg', keywords: ['funny', 'baby', 'smile'] },
    { id: 9, url: './img/memes/12.jpg', keywords: ['men'] },
    { id: 10, url: './img/memes/19.jpg', keywords: ['men', 'mad'] },
    {
      id: 11,
      url: './img/memes/Ancient-Aliens.jpg',
      keywords: ['funny', 'men'],
    },
    { id: 12, url: './img/memes/drevil.jpg', keywords: ['funny', 'men'] },
    {
      id: 13,
      url: './img/memes/img2.jpg',
      keywords: ['funny', 'baby', 'smile'],
    },
    { id: 14, url: './img/memes/img4.jpg', keywords: ['men', 'mad'] },
    {
      id: 15,
      url: './img/memes/img5.jpg',
      keywords: ['funny', 'cute', 'baby', 'smile', 'happy'],
    },
    {
      id: 16,
      url: './img/memes/img6.jpg',
      keywords: ['funny', 'cute', 'animal'],
    },
    {
      id: 17,
      url: './img/memes/img11.jpg',
      keywords: ['men', 'funny', 'smile'],
    },
    { id: 18, url: './img/memes/img12.jpg', keywords: ['funny', 'men'] },
    { id: 19, url: './img/memes/leo.jpg', keywords: ['men', 'smile'] },
    { id: 20, url: './img/memes/meme1.jpg', keywords: ['men', 'mad'] },
    {
      id: 21,
      url: './img/memes/One-Does-Not-Simply.jpg',
      keywords: ['men', 'mad'],
    },
    {
      id: 22,
      url: './img/memes/Oprah-You-Get-A.jpg',
      keywords: ['women', 'happy'],
    },
    {
      id: 23,
      url: './img/memes/patrick.jpg',
      keywords: ['men', 'funny', 'smile'],
    },
    { id: 24, url: './img/memes/putin.jpg', keywords: ['men'] },
    { id: 25, url: './img/memes/X-Everywhere.jpg', keywords: ['men'] },
  ]
}

function getGimges() {
  const imgs = gImgs.filter((img) => {
    if (img.keywords) {
      return img.keywords.find((keyword) =>
        keyword.includes(gFilterBy.toLocaleLowerCase())
      )
    } else return false
  })

  return imgs
}

function setFilterBy(filter) {
  gFilterBy = filter
}

function getImg(imgId) {
  return gImgs.find((img) => img.id === +imgId)
}

function setMeme(elImg, imgId, isSaved, memeIdx) {
  if (isSaved) {
    gMeme = getFromStorage('savedMemes')[memeIdx]
    gMeme.elImg = recreateImg(gMeme.elImg)
    console.log('imgId', imgId)
    gMeme.elImg.src = JSON.parse(JSON.stringify(getImg(imgId).url))
    return
  }

  gMeme.elImg = elImg
  gMeme.selectedImgId = gImgs.find((img) => img.id === +imgId).id
  gMeme.lines = []
  addLine('I sometimes eat Falafel', 'white', 'black', 170, 40, 25)
  addLine('And I like it', 'white', 'black', 170, 40, 25)
  gMeme.selectedLineIdx = 0
}

function getGmeme() {
  return gMeme
}

function getLineIdx(line) {
  return gMeme.lines.findIndex((currLine) => currLine === line)
}

function setGmemeLineProp(selector, val, Idx = gMeme.selectedLineIdx) {
  if (!gMeme.lines.length) return
  gMeme.lines[Idx][selector] = val
}

function getImojis() {
  return gEmojis
}

function addLine(txt, color, stroke, x, y, size = gElCanvas.width / 11) {
  gMeme.lines.push({
    txt,
    color,
    stroke,
    size,
    x,
    y,
    isDrag: false,
  })

  gMeme.selectedLineIdx = gMeme.lines.length - 1
  return getSelectedLine()
}

function switchLine(lineIdx = null) {
  if (!gMeme.lines.length) return

  if (!lineIdx && lineIdx !== 0) {
    gMeme.selectedLineIdx =
      gMeme.selectedLineIdx + 1 >= gMeme.lines.length
        ? 0
        : gMeme.selectedLineIdx + 1
  } else gMeme.selectedLineIdx = lineIdx

  return getSelectedLine()
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function deleteLine() {
  const lineIdx = getLineIdx(getSelectedLine())
  gMeme.lines.splice(lineIdx, 1)
  gMeme.selectedLineIdx = 0
}

function saveMeme(savedMemeIdx) {
  var memes = getFromStorage('savedMemes')
  if (!memes || !memes.length) memes = []

  gMeme.fontFamily = gFontFamily
  gMeme.textAlign = gTextAlign

  const currElImg = gMeme.elImg
  gMeme.elImg = {
    src: gMeme.elImg.src,
    width: gMeme.elImg.width,
    height: gMeme.elImg.height,
  }

  gMeme.display = gElCanvas.toDataURL()

  if (typeof savedMemeIdx === 'number') {
    memes.splice(savedMemeIdx, 1, gMeme)
  } else {
    memes.unshift(gMeme)
  }
  saveToStorage('savedMemes', memes)
  gMeme.elImg = currElImg
}

function getSavedMemes() {
  var memes = getFromStorage('savedMemes')
  if (!memes || !memes.length) return null

  // recreating imges
  memes.map((meme) => {
    meme.elImg = recreateImg(meme.elImg)
  })

  return memes
}

function recreateImg(elImg) {
  const recreatedImage = new Image()
  recreatedImage.src = elImg.src
  recreatedImage.width = elImg.width
  recreatedImage.height = elImg.height
  return recreatedImage
}

function addImg(elImg) {
  const id = +makeId(6)
  gImgs.push({
    id,
    url: elImg.src,
  })

  saveToStorage('imgs', gImgs)

  return id
}
