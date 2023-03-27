reviews()

async function getAllReviews() {
    const response = await fetch('http://localhost:5000/api/reviews');
    const data = await response.json();
    return data;
}

function showReviews() {
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