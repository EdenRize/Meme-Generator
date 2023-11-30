function onInit() {
  //init
  renderPage()
}

function renderPage() {
  const currPage = getCurrPage()

  switch (currPage) {
    case 'gallery':
      renderGallery()
      break

    case 'saved memes':
      renderSavedMemes()
      break

    default:
      break
  }
}

function renderGallery() {
  const imges = getGimges()
  var strHTML = `
  <section class="gallery-container">
  <button onclick="onRandomMeme()">
  <p>I'm Flexible</p>
  </button>
  <div class="memes-container">
  `

  imges.map((img) => {
    strHTML += `
    <div 
    class="meme-card pointer">
      <img
      onclick="onOpenEditor(this)"
      data-img-id="${img.id}"
       class="meme-img" src="${img.url}" />
    </div>
    `
  })

  strHTML += `
  </div>
  </section>
  `

  document.querySelector('.page-content').innerHTML = strHTML
}

function renderSavedMemes() {
  const savedMemes = getSavedMemes()
  var strHTML = `
  <section class="saved-memes-container">
  <h2>Your Saved Memes</h2>
  `

  if (!savedMemes) {
    strHTML += `
    <p>No saved memes</p>
    `
  } else {
    strHTML += `
    <div class="memes-container">
    `
    savedMemes.map((meme, idx) => {
      strHTML += `
      <div 
    class="meme-card pointer">
      <img
      onclick="onOpenEditor(this, true, ${idx})"
      data-img-id="${meme.selectedImgId}"
       class="meme-img" src="${meme.display}" />
    </div>
      `
    })
  }

  strHTML += `
  </div>
  </section>
  `

  document.querySelector('.page-content').innerHTML = strHTML
}

function onRenderPage(pageName) {
  closeMenu()
  onCloseEditor()
  if (getCurrPage() === pageName) return
  setCurrPage(pageName)
  renderPage()
}

function closeMenu() {
  var menuCheckbox = document.querySelector('#menuToggle input')

  if (menuCheckbox.checked) {
    menuCheckbox.checked = false
  }
}
