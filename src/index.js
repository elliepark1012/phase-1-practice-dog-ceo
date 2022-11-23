// 1. fetch data 
// 2. addImage

document.addEventListener('DOMContentLoaded', function() {
    fetchImage(),
    fetchBreed()
})

function fetchImage() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(res => res.json())
    .then(results => {
        results.message.forEach(image => addImage(image))
    })
}

function addImage(dogPicUrl) {
    let container = document.querySelector('#dog-image-container')
    let newImage = document.createElement('img')
    newImage.src = dogPicUrl
    container.appendChild(newImage)
}

function fetchBreed() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(res => res.json())
    .then(results => { 
        breeds = Object.keys(results.message)
        updateBreedList(breeds)
        addBreedSelect()
    })
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
    li.addEventListener('click', colorChange)
}

function colorChange() {
    this.style.color = 'red';
}

// select DOM filter 'a' - same letter 

function addBreedSelect() {
    let breedDropdown = document.querySelector('#breed-dropdown')
    breedDropdown.addEventListener('change', function(e) {
        selectBreedsStartingWIth(e.target.value)
    })
}

function selectBreedsStartingWIth(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)))
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds')
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))
}

function removeChildren(element) {
    let child = element.lastElementChild
    while(child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}