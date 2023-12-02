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

    case 'about':
      renderAboutPage()
      break

    default:
      break
  }
}

function renderGallery() {
  const imges = getGimges()
  var strHTML = `
  <section class="gallery-container">

  <form 
  onsubmit="event.preventDefault()"
  class="search-form"
  >
  <input
  oninput="onSetFilter(this.value)"
  class="search-input"
  list="search-memes-list"
  placeholder="Search" />
  <img src="./img/assets/search.svg" />
  </form>

  <div
  class="search-keywords-container"
  >
  ${getKeywords()}
  </div>

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
  ${getUploadHTML()}
  `

  strHTML += getHTMLGalleryMemes(imges)

  strHTML += `
  </div>
  </section>
  `

  document.querySelector('.page-content').innerHTML = strHTML
}

function getHTMLGalleryMemes(imges) {
  if (!imges.length) return `<p>No memes found</p>`
  var strHTML = ''

  imges.map((img) => {
    if (img.keywords.length) {
      strHTML += `
      <div 
      class="meme-card pointer">
      <img
      onclick="onOpenEditor(false, this)"
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
      onclick="onOpenEditor(false, this, true, ${idx})"
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

function renderAboutPage() {
  document.querySelector('.page-content').innerHTML = `
  <section class="about-container">
  <h2>Welcome To My Meme Generator!</h2>
  <p class="info-paragraph">
  As a part of my Bootcamp studies in "Coding Academy", 
  we where given the task to create our own meme generator from scratch. 
  This entire site was made with vanilla JS, HTML & CSS, and created by me, Eden Rize. 
  Thank you for supporting my meme generator! <span>❤</span>
  </p>
  <p>
  And now, a picture of me and my cat:
  </p>
  <img src="./img/assets/tim.jpg" />
  </section>
  `
}

function getUploadHTML() {
  return `
  <div
  onclick="activatePicker('.user-upload')"
  class="user-upload-container meme-card pointer"
  >
  <input
  hidden
  type="file"
  class="user-upload"
  onchange="onImgInput(event)"
  accept="image/*"
  />
  <img src="./img/assets/upload.svg" />
  </div>
  `
}

function renderKeywords() {
  const elKeywords = document.querySelector('.search-keywords-container')
  if (elKeywords) elKeywords.innerHTML = getKeywords()
}

function getKeywords() {
  const words = getBestKeywords()
  const maxSize = window.innerWidth < 500 ? 17 : 23
  var strHTML = ''
  words.map((word) => {
    strHTML += `
    <p 
    style="font-size: ${
      10 + word.usage > maxSize ? maxSize : 10 + word.usage
    }px;"
    onclick="onSetFilter('${word.keyword}')"
    class="pointer keyword"
    >
    ${word.keyword}
    </p>
    `
  })

  return strHTML
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

function activatePicker(selector) {
  document.querySelector(selector).click()
}
