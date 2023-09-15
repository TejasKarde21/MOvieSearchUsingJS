const button = document.getElementById("button");
const container = document.getElementById("Container1");
const seeMore = document.getElementById("seeMore");
let page = 1;

// https://api.themoviedb.org/3/search/movie?api_key=75ce296fa96f10ea656e2c25bdd3a130&query=BATMAN%20BEGINS&page=1 //tmdb

//https://www.omdbapi.com/?apikey=9fcda3c4&s/search/&type=movie&page //omdb
 const newArr= [];

async function createCard() {
    const searchValue = document.getElementById("Search").value;
    
    const url1 = `https://www.omdbapi.com/?&apikey=9fcda3c4&s=${searchValue}&page=${page}&type=movie`;
    const data1 = await fetch(url1);
    const result1 = await data1.json();
    console.log(result1);


    const url2 = `https://api.themoviedb.org/3/search/movie?api_key=75ce296fa96f10ea656e2c25bdd3a130&query=${searchValue}&page=${page}`;
    const data2 = await fetch(url2);
    const result2 = await data2.json();

    const res1 = result1.Search.map(ele => ({
        title: ele.Title,
        year: ele.Year,
        poster: ele.Poster,
        source: 'omdb'
    }));

    const res2 = result2.results.map(ele => ({
        title: ele.original_title,
        overview: ele.overview,
        vote_average: ele.vote_average,
        source: 'themoviedb'
    }));

    // Create a dictionary to hold merged elements with the same title
    const titleDict = {};

    // Merge based on title
    res1.concat(res2).map(item => {
        if (titleDict[item.title]) {
            titleDict[item.title] = {
                ...titleDict[item.title],
                ...item,
            };
        } else {
            titleDict[item.title] = item;
        }
    });

    // Convert dictionary values back to an array
    const mergedArray = Object.values(titleDict);

    // Add the merged array to newArr
    newArr.push(...mergedArray);

     console.log(newArr);

   
        newArr.map(ele => {
            container.innerHTML +=`
            <a id="cha"
            onclick="moviedeatils('${ele.title}')" href="./info.html">
            <div id="card">
            <img id="Img"  src="${ele.poster}" alt="Movieimg_Missing"  href="./info.html">
            <h3 id="mName">${ele.title}</h3>
            <p id="year">${ele.year}</p>
            <div class="layer">
             <i class="fa-solid fa-play">
                <p id="nextPAge">click here to GET more INFO</p>
             </i>
          </div>
          </div>
 `

        });
        
}

seeMore.addEventListener("click", (event) => {
    event.preventDefault();
    ++page;
    createCard();
});

button.addEventListener("click", (event) => {
    event.preventDefault();
    page = 1;
    container.innerHTML = ""; // Clear container before initiating a new search
    createCard();
});


// window.addEventListener("scroll", () => {
//     console.log(window.innerHeight);
   
//     if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight-10) {
        
//         page++;
//         createCard();
          
//     }
   
// });

function moviedeatils(title) {
    const clickedMovie = newArr.find(movie => movie.title === title);
    localStorage.setItem('clickedMovie', JSON.stringify(clickedMovie));
    window.location.href = './info.html';
}

