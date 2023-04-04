//id state

let movieId;
let reviewId;

//Get Reviews
reviews()

async function getAllReviews() {
    const response = await fetch('http://localhost:5000/api/reviews');
    const data = await response.json();
    return data;
}

function showReviews() {
    document.getElementById('create-review').hidden = true;
    document.getElementById('movies').hidden = true;
    document.getElementById('create-movie').hidden = true;
    document.getElementById('update-movie').hidden = true;
    document.getElementById('update-review').hidden = true;
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
                        <p class="card-text mb-3">${element.description}</p>
                        <div class="text-center ">
                        <div class="btn btn-sm" onclick="showUpdateReview(${element.id})" id="button">Modificar Reseña</div>
                      </div>
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
    document.getElementById('create-review').hidden = true;
    document.getElementById('reviews').hidden = true;
    document.getElementById('create-movie').hidden = true;
    document.getElementById('update-movie').hidden = true;
    document.getElementById('update-review').hidden = true;
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
                        <img src="${element.image}" class="card-img mb-3" style="width: 10rem; height: 10rem;" >
                        <div class="text-center ">
                        <div class="btn btn-sm" onclick="showUpdateMovie(${element.id})" id="button">Modificar Película</div>
                      </div>
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
            alert('Ha agregado la película satisfactoriamente!')
            cleanCreateMovie();
        }
    }
}

function showCreateMovie() {
    document.getElementById('create-review').hidden = true;
    document.getElementById('reviews').hidden = true;
    document.getElementById('movies').hidden = true;
    document.getElementById('update-movie').hidden = true;
    document.getElementById('update-review').hidden = true;
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

//Modificar película

function submitFormMovieUpdate() {
    const newMovieTitle = document.getElementById('movie-title-update').value;
    const newMovieDescription = document.getElementById('movie-description-update').value;
    const movieImagePath = document.getElementById('movie-image-update').value + '';
    const splittedPath = movieImagePath.split('\\');
    const newMovieImage = `assets/img/${splittedPath[splittedPath.length - 1]}`;

    const movie = {}

    if(newMovieTitle) {
        movie['title'] = newMovieTitle
    }
    if(newMovieDescription) {
        movie['description'] = newMovieDescription
    }
    if(movieImagePath) {
        movie['image'] = newMovieImage
    }

    return movie;
}

async function updateMovie() {
    const movieUpdated = submitFormMovieUpdate();

    if (movieUpdated) {

        const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieUpdated)
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        } else {
            alert('Ha actualizado la película satisfactoriamente!')
            cleanUpdateMovie();
        }
    }
}

function showUpdateMovie(id) {
    document.getElementById('create-movie').hidden = true;
    document.getElementById('create-review').hidden = true;
    document.getElementById('reviews').hidden = true;
    document.getElementById('movies').hidden = true;
    document.getElementById('update-review').hidden = true;
    document.getElementById('update-movie').hidden = false;
    document.getElementById('movie-title-update').value = '';
    document.getElementById('movie-description-update').value = '';
    document.getElementById('movie-image-update').value = '';
    movieId = id
    cleanUpdateMovie()
}

function cleanUpdateMovie() {
    document.getElementById('movie-title-update').value = '';
    document.getElementById('movie-description-update').value = '';
    document.getElementById('movie-image-update').value = '';
}

//Delete movie

async function deleteMovie () {
    const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: 'DELETE',
    });

    const data = await response.json();

    if (data.error) {
        alert(data.error);
        return;
    } else {
        alert('Ha borrado la película satisfactoriamente!')
    }
}

//Escribir review

function submitFormReview() {
    const newReviewUser = document.getElementById('review-user').value;
    const newReviewTitle = document.getElementById('review-title').value;
    const newMovieReviewTitle = document.getElementById('review-movie-title').value;
    const newReviewDescription = document.getElementById('review-description').value;

    if (!newReviewUser || !newReviewTitle || !newMovieReviewTitle || !newReviewDescription) {
        alert('Debe completar todo el formulario para crear su reseña')
        return null;
    }

    const newReview = {
        username: newReviewUser,
        title: newReviewTitle,
        movieTitle: newMovieReviewTitle,
        description: newReviewDescription
    }

    return newReview;
}

async function createReview() {

    const newReview = submitFormReview();

    if (newReview) {

        const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview)
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        } else {
            alert('Ha agregado su reseña satisfactoriamente!')
            cleanCreateReview();
        }
    }
}

function showCreateReview() {
    document.getElementById('reviews').hidden = true;
    document.getElementById('movies').hidden = true;
    document.getElementById('create-movie').hidden = true;
    document.getElementById('update-movie').hidden = true;
    document.getElementById('update-review').hidden = true;
    document.getElementById('create-review').hidden = false;
    document.getElementById('review-user').value = '';
    document.getElementById('review-title').value = '';
    document.getElementById('review-movie-title').value = '';
    document.getElementById('review-description').value = '';
    cleanCreateReview()
}

function cleanCreateReview() {
    document.getElementById('review-user').value = '';
    document.getElementById('review-title').value = '';
    document.getElementById('review-movie-title').value = '';
    document.getElementById('review-description').value = '';
}

//Modificar review

function submitFormReviewUpdate() {
    const newReviewUser = document.getElementById('review-user-update').value;
    const newReviewTitle = document.getElementById('review-title-update').value;
    const newMovieReviewTitle = document.getElementById('review-movie-title-update').value;
    const newReviewDescription = document.getElementById('review-description-update').value;

    const review = {}

    if(newReviewUser) {
        review['username'] = newReviewUser
    }
    if(newReviewTitle) {
        review['title'] = newReviewTitle
    }
    if(newMovieReviewTitle) {
        review['movieTitle'] = newMovieReviewTitle
    }
    if(newReviewDescription) {
        review['description'] = newReviewDescription
    }

    return review;
}

async function updateReview() {
    const reviewUpdated = submitFormReviewUpdate();
    console.log(reviewUpdated)

    if (reviewUpdated) {

        const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewUpdated)
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        } else {
            alert('Ha actualizado la reseña satisfactoriamente!')
            cleanUpdateReview();
        }
    }
}

function showUpdateReview(id) {
    document.getElementById('create-movie').hidden = true;
    document.getElementById('create-review').hidden = true;
    document.getElementById('reviews').hidden = true;
    document.getElementById('movies').hidden = true;
    document.getElementById('update-movie').hidden = true;
    document.getElementById('update-review').hidden = false;
    document.getElementById('review-user-update').value = '';
    document.getElementById('review-title-update').value = '';
    document.getElementById('review-movie-title-update').value = '';
    document.getElementById('review-description-update').value = '';
    reviewId = id
    cleanUpdateReview()
}

function cleanUpdateReview() {
    document.getElementById('review-user-update').value = '';
    document.getElementById('review-title-update').value = '';
    document.getElementById('review-movie-title-update').value = '';
    document.getElementById('review-description-update').value = '';
}

//Delete review

async function deleteReview () {
    const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    const data = await response.json();

    if (data.error) {
        alert(data.error);
        return;
    } else {
        alert('Ha borrado la reseña satisfactoriamente!')
    }
}
