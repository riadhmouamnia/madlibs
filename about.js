const description= `We are a team of five who created this web app as an assignment during
our bootcamp DZ-FEW at Recoded. We used HTML, CSS, and JS to create a
variant of a Mad Libs game with a story of our choice. This project
showcases our collaborative skills and our ability to work with
front-end technologies.`

const about = document.querySelector('#about')

 // create the "about us" description text
function renderAboutUsText(){
  const aboutUs = document.createElement('div')
  aboutUs.classList.add('.about-us')
  const heading = document.createElement('h1')
  heading.innerText = 'About us'
  const paragraph = document.createElement('p')
  paragraph.innerText = description
  aboutUs.appendChild(heading)
  aboutUs.appendChild(paragraph)
  about.appendChild(aboutUs)
}

 // create card.
function renderCard(teamMembers){
  const cards = document.createElement('div')
  cards.classList.add('cards')
  teamMembers.forEach(member => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `<div class="image-content">
    <span class="overlay"></span>
    <div class="card-image">
      <img src=${member.image} alt=${member.fullname} class="card-img" title=${member.fullname} />
    </div>
  </div>
  <div class="card-content">
    <h3>${member.fullname}</h3>
    <p>${member.description}</p>
    <a href=${member.github} target="_blank"><i class="fa-brands fa-square-github"></i></a>
    <a href=${member.linkedin} target="_blank">
      <i class="fa-brands fa-linkedin"></i>
    </a>
  </div>`
  cards.appendChild(card)
  }) 
  about.appendChild(cards)
}

 // create a footer.
const body = document.querySelector('body')
function renderFooter(){
  const footer = document.createElement('footer')
  footer.classList.add('copy')
  const p = document.createElement('p')
  p.innerHTML = '&#169; Copyright 2023'
  footer.appendChild(p)
  body.appendChild(footer)
}

 // get team members data
fetch("./db.json")
.then(res => res.json())
.then(data => {
  renderAboutUsText()
  renderCard(data)
  renderFooter()
})
