document.addEventListener('DOMContentLoaded', function() {
    const clickedMovie = JSON.parse(localStorage.getItem('clickedMovie'));
    if (clickedMovie) {
        // Use clickedMovie.title and clickedMovie.overview to display the details
        document.getElementById('title').innerText = clickedMovie.title;
        document.getElementById('overview').innerText = clickedMovie.overview;
        document.getElementById('img').src = clickedMovie.poster;
      
        document.getElementById('vote_average').innerText =  Math.ceil(clickedMovie.vote_average);
        
        // Create star elements based on the rating
        const ratingContainer = document.getElementById('range');
        const rating = Math.ceil(clickedMovie.vote_average);
        
        for (let i = 0; i < rating; i++) {
            const star = document.createElement('i');
            star.classList.add('fa-solid', 'fa-star');
            ratingContainer.appendChild(star);
        }

        // Clear the localStorage to avoid showing the same details on subsequent visits
        localStorage.removeItem('clickedMovie');
    }
});