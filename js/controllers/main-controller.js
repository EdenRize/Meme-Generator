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

  <form class="search-form">
  <input
  oninput="onSetFilter(this.value)"
  class="search-input"
  list="search-memes-list"
  placeholder="Search" />
  <img src="./img/assets/search.svg" />
  </form>

  <datalist id="search-memes-list" >
  <option value="Happy">Happy</option>
  <option value="Funny">Funny</option>
  <option value="Cute">Cute</option>
  <option value="Mad">Mad</option>
  <option value="Smile">Smile</option>
  <option value="Men">Men</option>
  <option value="Women">Women</option>
  <option value="Baby">Baby</option>
  <option value="Animal">Animal</option>
  </datalist>

  <button onclick="onRandomMeme()">
  <p>I'm Flexible</p>
  </button>

  <div class="memes-container">
  <input
  type="file"
  class="user-upload"
  onchange="onImgInput(event)"
  accept="image/*"
  />
  `

  strHTML += getHTMLGalleryMemes(imges)

  strHTML += `
  </div>
  </section>
  `

  document.querySelector('.page-content').innerHTML = strHTML
}

function getHTMLGalleryMemes(imges) {
  var strHTML = ''

  imges.map((img) => {
    if (img.keywords.length) {
      strHTML += `
      <div 
      class="meme-card pointer">
      <img
      onclick="onOpenEditor(this)"
      data-img-id="${img.id}"
      class="meme-img" src="${img.url}" />
      </div>
      `
    }
  })

  return strHTML
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
  onSetFilter('')
  setCurrPage(pageName)
  renderPage()
}

function closeMenu() {
  var menuCheckbox = document.querySelector('#menuToggle input')

  if (menuCheckbox.checked) {
    menuCheckbox.checked = false
  }
}

function showUserModal(msg) {
  const elModal = document.querySelector('.user-modal-container')

  elModal.querySelector('.user-msg').innerText = msg
  elModal.style.bottom = '10px'

  setTimeout(() => {
    elModal.style.bottom = '-100px'
  }, 3000)
}
