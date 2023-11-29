var gImgs = [
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
  { id: 11, url: './img/memes/Ancient-Aliens.jpg', keywords: ['funny', 'men'] },
  { id: 12, url: './img/memes/drevil.jpg', keywords: ['funny', 'men'] },
  { id: 13, url: './img/memes/img2.jpg', keywords: ['funny', 'baby', 'smile'] },
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
  { id: 17, url: './img/memes/img11.jpg', keywords: ['men', 'funny', 'smile'] },
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
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'red',
    },
  ],
}
var gKeywordSearchCountMap = { funny: 12, animal: 16, baby: 2 }

function getGimges() {
  return gImgs
}
