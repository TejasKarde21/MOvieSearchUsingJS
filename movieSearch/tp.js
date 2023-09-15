const input = document.getElementById("inputsearch")
const cards = document.getElementById("cards")
const searchselect = document.getElementById("searchselect")
let selectvalue = searchselect.value
const moviedropdown = document.getElementById("movie")
const seriesdropdown = document.getElementById("tv")


searchselect.addEventListener('change', (ele) => {
    selectvalue = searchselect.value
    if (selectvalue == 'movie') {
        moviedropdown.addEventListener('change', findmovie(selectvalue))
    }
    else if (selectvalue == 'tv') {
        seriesdropdown.addEventListener('change', findmovie(selectvalue))
    }


})
function movies() {
    console.log("click", selectvalue)
    if (selectvalue == 'movie') {
        findmovie(selectvalue)
    }
    else {
        findtv(selectvalue)
    }

}

movies()


async function findmovie(selectvalue) {
    cards.innerHTML = ""
    let inputvalue = input.value
    const res = await fetch(`https://api.themoviedb.org/3/search/${selectvalue}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${inputvalue}`)
    console.log(res)

    const data = await res.json()
    console.log(data.results);
    data.results.map((ele) => {
        cards.innerHTML += ` 
        <a onclick="moviedeatils(${ele.id})" href="./cards.html">
        <div class="poster">
        <img src="https://image.tmdb.org/t/p/w154${ele.poster_path}" />

        <div class="imgcontent">
        <h3>${ele.title}</h3>
        <small>drama</small>
        <p>${ele.release_date.slice(0, 4)}</p>


        </div>
        <div class="votes">
        ${(ele.vote_average * 10).toFixed(1)}%
        </div>

        
    </div>
    </a>`




    })

}
function moviedeatils(id) {
    localStorage.setItem('movieid', id)


}

async function findtv(selectvalue) {
    cards.innerHTML = ""
    let inputvalue = input.value
    const res = await fetch(`https://api.themoviedb.org/3/search/${selectvalue}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${inputvalue}`)

    const data = await res.json()
    console.log(data.results);
    data.results.map((ele) => {
        cards.innerHTML += ` 
        <a onclick="seriesdetails(${ele.id})" href="./cards.html">
        <div class="poster">
        <img src="https://image.tmdb.org/t/p/w154${ele.poster_path}" />

        <div class="imgcontent">
        <h2>${ele.name}</h2>
        <small>Drama | Action</small>
        <p>${ele.first_air_date.slice(0, 4)}</p>


        </div>
        <div class="votes">
        ${(ele.vote_average * 10).toFixed(1)}%
        </div>

        
    </div>
    </a>`




    })

}

function seriesdetails(id) {
    console.log("series details")
    localStorage.setItem('seriesid', id)

}