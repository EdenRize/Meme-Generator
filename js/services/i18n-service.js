const gTrans = {}
var gLang

function doTrans() {
  const els = document.querySelectorAll('[data-trans]')
  els.forEach((el) => {
    const transKey = el.dataset.trans
    const trans = getTrans(transKey)
    el.innerText = trans
  })

  return gLang
}

function getTrans(transKey) {
  return gTrans[transKey][gLang]
}

function getGlang() {
  return gLang
}

function setLang(lang) {
  gLang = lang
}
