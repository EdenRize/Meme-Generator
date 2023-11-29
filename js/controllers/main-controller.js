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

    default:
      break
  }
}

function renderGallery() {
  const imges = getGimges()
  var strHTML = `<section class="gallery-container">`

  imges.map((img) => {
    strHTML += `
    <div class="meme-card pointer">
      <img class="meme-img" src="${img.url}" />
    </div>
    `
  })

  strHTML += `</section>`

  document.querySelector('main').innerHTML = strHTML
}
