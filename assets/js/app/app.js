//Get Reviews
reviews()

async function getAllReviews() {
    const response = await fetch('http://localhost:5000/api/reviews');
    const data = await response.json();
    return data;
}

function showReviews() {
    document.getElementById('movies').hidden = true;
    document.getElementById('create-movie').hidden = true;
    document.getElementById('reviews').hidden = false;
}

async function reviews() {

    showReviews();
    let cards = '';
    const reviewsPanel = document.getElementById('show-reviews');
    reviewsPanel.innerHTML = '';

    const reviews = await getAllReviews();

    reviews.forEach(element => {

        cards = `<div class="p-2 card mb-3 mx-2" style="width: 18rem;">
                    <h5 class="card-title">${element.title}</h5>
                    <div class="card-body">
                        <h5 class="card-title">${element.username}</h5>
                        <h6>Película: ${element.movieTitle}</h6>
                        <p class="card-text">${element.description}</p>
                    </div>
                </div>`;
                reviewsPanel.insertAdjacentHTML("afterbegin", cards);
    });
}

//Get Movies

async function getAllMovies() {
    const response = await fetch('http://localhost:5000/api/movies');
    const data = await response.json();
    return data;
}

function showMovies() {
    document.getElementById('reviews').hidden = true;
    document.getElementById('create-movie').hidden = true;
    document.getElementById('movies').hidden = false;
}

async function movies() {

    showMovies();
    let cards = '';
    const moviesPanel = document.getElementById('show-peliculas');
    moviesPanel.innerHTML = '';

    const movies = await getAllMovies();
    console.log(movies)

    movies.forEach(element => {

        cards = `<div class="p-2 card mb-3 mx-2" style="width: 18rem;">
                    <h5 class="card-title">${element.title}</h5>
                    <div class="card-body">
                        <p class="card-text">${element.description}</p>
                        <img src="${element.image}" class="card-img">
                    </div>
                </div>`;
                moviesPanel.insertAdjacentHTML("afterbegin", cards);
    });
}

//Agregar película

function submitFormMovie() {
    const newMovieTitle = document.getElementById('movie-title').value;
    const newMovieDescription = document.getElementById('movie-description').value;
    const movieImagePath = document.getElementById('movie-image').value + '';
    const splittedPath = movieImagePath.split('\\');
    const newMovieImage = `assets/img/${splittedPath[splittedPath.length - 1]}`;

    if (!newMovieTitle || !newMovieDescription || !movieImagePath) {
        alert('Debe completar todo el formulario para agregar la película')
        return null;
    }

    const newMovie = {
        title: newMovieTitle,
        description: newMovieDescription,
        image: newMovieImage
    }

    return newMovie;
}

async function createMovie() {

    const newMovie = submitFormMovie();

    if (newMovie) {

        const response = await fetch('http://localhost:5000/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        } else {
            alert('Ha agregado el producto satisfactoriamente!')
            cleanCreateMovie();
        }
    }
}

function showCreateMovie() {
    document.getElementById('reviews').hidden = true;
    document.getElementById('movies').hidden = true;
    document.getElementById('create-movie').hidden = false;
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-description').value = '';
    document.getElementById('movie-image').value = '';
    cleanCreateMovie()
}

function cleanCreateMovie() {
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-description').value = '';
    document.getElementById('movie-image').value = '';
}
