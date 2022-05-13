// fetch('https://api.punkapi.com/v2/beers')
//   .then((response) => response.json())
//   .then((beersObj) => console.log(beersObj))

const innerNameBox = document.querySelector('#secret-name')
const section = document.querySelector('#your-city')
const zipList = document.querySelector('#zip-list')
const formSubmit = document.querySelector('#local-breweries')
const holdBeers = document.getElementById('hold-beers')
const holdFood = document.getElementById('hold-food')

const randoGenerator = document.querySelector('button')
randoGenerator.addEventListener('click', () => {
  fetch('https://api.punkapi.com/v2/beers/random')
    .then((response) => response.json())
    .then((randoBeer) => {
      innerNameBox.innerText = `Hello '${randoBeer[0].name}', welcome to Beer Bonanza!`
      const changeColor = (a, b) =>
        (a.innerHTML = a.innerHTML.replace(b, `<span>${b}</span>`))
      changeColor(innerNameBox, `${randoBeer[0].name}`)
    })
})

const buzzSelect = document.querySelector('select')
const foodPair = document.querySelector('#suggestion')

const handleBeerRec = (e) => {
  if (e.target.value === 'abv_lt=5.0') {
    fetch('https://api.punkapi.com/v2/beers?abv_lt=5.0&per_page=5')
      .then((response) => response.json())
      .then((beersObj) => {
        holdBeers.innerHTML = ''

        beersObj.forEach((beer) => {
          let beerName = document.createElement('li')
          beerName.innerText = `${beer.name} - ABV: ${beer.abv} `
          let beerTagLine = document.createElement('p')
          beerTagLine.innerText = `"${beer.tagline}"`

          //let beerImgTipsy = document.createElement('img')
          //beerImgTipsy.src = beersObj[0].image_url
          //let beerPicTipsy = document.querySelector('.beer-pic')
          //beerPicTipsy.src = beerImgTipsy
          beerName.appendChild(beerTagLine)
          holdBeers.append(beerName)
        })
      })
  } else if (e.target.value === 'abv_gt=5.0&abv_lt=7.0') {
    fetch('https://api.punkapi.com/v2/beers?abv_gt=5.0&abv_lt=7.0&per_page=5')
      .then((response) => response.json())
      .then((beersObj) => {
        holdBeers.innerHTML = ''
        beersObj.forEach((beer) => {
          let beerNameTwinkle = document.createElement('li')
          beerNameTwinkle.innerText = `${beer.name} - ABV: ${beer.abv} `
          let beerTagLineTwinkle = document.createElement('p')
          beerTagLineTwinkle.innerText = `"${beer.tagline}"`

          let beerImgTwinkle = document.createElement('img')
          beerImgTwinkle.src = beer.image_url
          beerNameTwinkle.appendChild(beerTagLineTwinkle)
          holdBeers.append(beerNameTwinkle)
        })
      })
  } else if (e.target.value === 'abv_gt=7.0') {
    fetch('https://api.punkapi.com/v2/beers?abv_gt=7.0&per_page=5')
      .then((response) => response.json())
      .then((beersObj) => {
        holdBeers.innerHTML = ''
        beersObj.forEach((beer) => {
          let beerNameTank = document.createElement('li')
          beerNameTank.innerText = `${beer.name} - ABV: ${beer.abv} `
          let beerTagLineTank = document.createElement('p')
          beerTagLineTank.innerText = `"${beer.tagline}"`

          let beerImgTank = document.createElement('img')
          beerImgTank.src = beer.image_url
          beerNameTank.appendChild(beerTagLineTank)
          holdBeers.append(beerNameTank)
        })
      })
  }
}

buzzSelect.addEventListener('change', handleBeerRec)

const handleZip = (e) => {
  e.preventDefault()
  const userEntry = document.querySelector('#idEntry').value

  fetch(`https://api.openbrewerydb.org/breweries?by_city=${userEntry}`)
    .then((response) => response.json())
    .then((cityObj) => {
      zipList.innerText = ''
      let greeting = document.createElement('h3')
      greeting.innerText = `${userEntry} area breweries!`.toUpperCase()
      cityObj.forEach((oneCity) => {
        if (oneCity.city.toLowerCase() === userEntry.toLowerCase()) {
          let localPubsName = document.createElement('li')
          localPubsName.innerText = oneCity.name

          zipList.append(localPubsName, greeting)
        }
      })
    })
}
formSubmit.addEventListener('submit', handleZip)

foodPair.addEventListener('change', (e) => {
  const result = document.querySelector('#result')
  const foodRec = `${e.target.value}`

  let foodImg = document.querySelector('.food-pic')

  if (foodRec === 'cheese') {
    foodImg.src =
      'https://media.gq.com/photos/581799e0a6fe84375dbe8d86/16:9/w_2560%2Cc_limit/Cheese%25201.jpg'
  } else if (foodRec === 'spicy') {
    foodImg.src =
      'https://post.healthline.com/wp-content/uploads/2020/08/chili-peppers-732x549-thumbnail.jpg'
  } else if (foodRec === 'crab') {
    foodImg.src =
      'https://www.foodnetwork.com/content/dam/images/food/video/1/11/115/1157/11572010.jpg'
  } else if (foodRec === 'avocado') {
    foodImg.src =
      'https://www.wellandgood.com/wp-content/uploads/2019/01/Stocksy-avocados-pits-Marti-Sans.jpg'
  } else if (foodRec === 'sweet') {
    foodImg.src =
      'https://www.escapetoblueridge.com/blog/wp-content/uploads/2021/02/AdobeStock_176331484-scaled.jpeg'
  }

  fetch(`https://api.punkapi.com/v2/beers?food=${foodRec}&per_page=5`)
    .then((response) => response.json())
    .then((foodObj) => {
      holdFood.innerText = ''

      foodObj.forEach((food) => {
        let foodList = document.createElement('li')
        foodList.innerText = food.food_pairing[1]
        holdFood.append(foodList)
      })
    })
})
const jokeSpot = document.querySelector('#hold-jokes')
console.log(jokeSpot)
document.addEventListener('keydown', (e) => {
  fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
    .then((response) => response.json())
    .then((randoJoke) => {
      if (e.key === 'j') {
        let jokeSetup = document.createElement('p')
        let jokeDelivery = document.createElement('p')
        jokeSetup.innerText = `Q: ${randoJoke.setup}`
        jokeDelivery.innerText = `A: ${randoJoke.delivery}`

        jokeSpot.append(jokeSetup, jokeDelivery)
        document.addEventListener('keyup', (e) => {})
      }
    })
})

//console.log(foodList)
// let foodString = []
// foodString.push(`${food.food_pairing}`)
// const result = foodString.filter((food) => food.includes(foodRec))

// if (foodString.includes(foodRec)) {
//     foodList.innerText = food.food_pairing
//     console.log(foodList)
//   }
