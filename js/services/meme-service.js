var gImgs
const gEmojis = [
  { emojiTxt: '😀', idx: 0 },
  { emojiTxt: '😂', idx: 1 },
  { emojiTxt: '😏', idx: 2 },
  { emojiTxt: '😈', idx: 3 },
  { emojiTxt: '😉', idx: 4 },
]
const gRandomLines = [
  'Sprint 2 be like',
  'When the code works',
  'When I meet Puki',
  'When Asi likes my Answer',
]
var gMeme = {}
var gKeywordSearchCountMap
var gFilterBy = ''

initGimgs()
initKeywords()

function initGimgs() {
  gImgs = createImgs()
  const userImgs = getFromStorage('user-imgs')
  if (userImgs && userImgs.length) gImgs.push(...userImgs)
}

function initKeywords() {
  gKeywordSearchCountMap = getFromStorage('keywords')
  if (!gKeywordSearchCountMap) {
    gKeywordSearchCountMap = {
      Funny: 7,
      Animal: 16,
      Baby: 2,
      Happy: 10,
      Women: 1,
    }
  }

  saveToStorage('keywords', gKeywordSearchCountMap)
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
  updateKeywords(filter)
}

function getImg(imgId) {
  return gImgs.find((img) => img.id === +imgId)
}

function setMeme(isRandom, elImg, imgId, isSaved, memeIdx) {
  if (isSaved) {
    gMeme = getFromStorage('savedMemes')[memeIdx]
    gMeme.elImg = recreateImg(gMeme.elImg)
    gMeme.elImg.src = JSON.parse(JSON.stringify(getImg(imgId).url))
    return
  }

  gMeme.elImg = elImg
  gMeme.selectedImgId = gImgs.find((img) => img.id === +imgId).id
  gMeme.lines = []
  if (isRandom)
    addLine(
      gRandomLines[getRandomInt(0, gRandomLines.length)],
      'white',
      'black',
      170,
      40,
      'center',
      'impact',
      25
    )
  else {
    addLine(
      'I sometimes eat Falafel',
      'white',
      'black',
      170,
      40,
      'center',
      'impact',
      25
    )
    addLine('And I like it', 'white', 'black', 170, 40, 'center', 'impact', 25)
  }
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

function addLine(
  txt,
  color,
  stroke,
  x,
  y,
  txtAlign,
  fontFamily,
  size = gElCanvas.width / 11
) {
  gMeme.lines.push({
    txt,
    color,
    stroke,
    size,
    x,
    y,
    txtAlign,
    fontFamily,
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

  const currElImg = gMeme.elImg
  gMeme.elImg = {
    src: gMeme.elImg.src,
    width: gMeme.elImg.width,
    height: gMeme.elImg.height,
  }

  gMeme.display = gElCanvas.toDataURL()

  if (typeof savedMemeIdx === 'number') memes.splice(savedMemeIdx, 1, gMeme)
  else memes.unshift(gMeme)

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
  const img = {
    id,
    url: elImg.src,
  }
  gImgs.push(img)

  var userImgs = getFromStorage('user-imgs')
  if (!userImgs || !userImgs.length) userImgs = []
  userImgs.unshift(img)
  saveToStorage('user-imgs', userImgs)

  return { id, imgIdx: gImgs.length - 1 }
}

function updateKeywords(word) {
  if (word === '') return
  if (gKeywordSearchCountMap[word]) gKeywordSearchCountMap[word]++
  saveToStorage('keywords', gKeywordSearchCountMap)
}

function getBestKeywords() {
  const entries = Object.entries(gKeywordSearchCountMap)
  return entries.map((entry) => ({
    keyword: entry[0],
    usage: entry[1],
  }))
}
