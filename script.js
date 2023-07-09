const accessKey = "d4cTk7UOtpPCdx8F19uDYtLWykN2H5gx0DEggkuh9m4"

const formElement = document.querySelector("form")
const inputElement = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMoreBtn = document.getElementById("show-more-button")

let userInputData = "";
let pageNo = 1;

let searchImages = async function () {
    userInputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${userInputData}&client_id=${accessKey}`

    try {
        const response = await fetch(url)
        console.log("RESPONSEE", response)
        const data = await response.json()
        const results = data.results

        if (pageNo === 1) {
            searchResults.innerHTML = ""
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement("div")
            imageWrapper.classList.add("search-result")
            const image = document.createElement("img")
            image.src = result.urls.small
            image.alt = result.alt_description
            const imageLink = document.createElement("a")
            imageLink.href = result.links.html
            imageLink.target = "_blank"
            imageLink.textContent = result.alt_description

            imageWrapper.appendChild(image)
            imageWrapper.appendChild(imageLink)
            searchResults.appendChild(imageWrapper)
        })

        pageNo++

        if (pageNo > 1) {
            showMoreBtn.style.display = "block"
        }
    } catch (error) {
        console.log(error)
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault()
    pageNo = 1
    searchImages()
})

showMoreBtn.addEventListener("click", () => {
    searchImages()
})