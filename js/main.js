const getPercentage = (rating) => {
    return rating * 10
}
const getMovies = async () => {
    const url = 'http://localhost:3000/movies';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};
const getMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};
const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}
const postMovie = async ({ID, title, rating, summary, category, year}) => {
    const newMovie = {
        ID,
        title,
        rating,
        summary,
        category,
        year
    }
    const body = JSON.stringify(newMovie);
    const url = `http://localhost:3000/movies`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}
const patchMovie = async (movie) => {
    console.log("patchMovie called with movie => ", movie);
    const url = `http://localhost:3000/movies/${movie.id}`;
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}
const renderCard = ({title, rating, summary, id, year, category}) => {
    const movieCard = document.createElement('div');
    const barWidth = getPercentage(rating)
    movieCard.classList.add('col' );
    movieCard.innerHTML = `
 
        <div class="card mt-4">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${title}</h5>
    <!--                            modal button-->
                                <button type="button" class="btn btn-danger btn-delete" id="btn-delete" value=${id}>Delete</button>

                                <button type="button" class="btn editBtn btn-link" data-bs-toggle="modal" data-bs-target="#edit-${id}">
                                    ...
                                </button>
    
    <!--                            modal-->
                                <div class="modal fade" id="edit-${id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel-${id}" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <form id="edit-movie-${id}" class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel-${id}">Edit Movie</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row">
                                                    <input name="title" type="text" placeholder="${title}" value="${title}">    
                                                    <input name="year" type="text" placeholder="${year}" value="${year}">
                                                </div>
                                                <div class="row">
                                                    <input name="summary" type="text" placeholder="${summary}" value="${summary}">
                                                    <input name="rating" type="text" placeholder="${rating}" value="${rating}">
                                                    <input name="category" type="text" placeholder="${category}" value="${category}">
                                                </div>
                                            </div>
                                            <div class="modal-footer">    
                                                 <button class="btn btn-primary edit-submit" data-bs-dismiss="modal">Submit Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <p class="movie-year">${year}</p>
                            <div class="card-summary">
                            <p> ${summary}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p>Rating</p>
                                <p>${rating}</p>
                            </div>
                            <div class="progress mb-3" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar bg-success progress-bar-animated" style="width: ${barWidth}%"></div>
                            </div>
                            <button class="btn btn-secondary">${category}</button>
                            
                        </div>
                        
                    </div>
                    
            `;
    const deleteBtn = movieCard.querySelector('.btn-delete')
     deleteBtn.addEventListener("click", async (e) => {
         await deleteMovie(id)

         await updateCards(await getMovies())
     });

    const editForm = movieCard.querySelector('form');
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Submit event fired");
        const formData = new FormData(editForm);
        const newMovie = {
            id,
            title: formData.get('title'),
            year: formData.get('year'),
            summary: formData.get('summary'),
            rating: formData.get('rating'),
            category: formData.get('category'),
        }
        await patchMovie(newMovie);
        await updateCards(await getMovies());
    });



    return movieCard;
}
const updateCards = async (movies) => {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    const cardFragment = document.createDocumentFragment();

    const movieRating = document.querySelector('#ratingSelect').value;
    let filteredMovies = movies;
    filteredMovies = filteredMovies.filter((movie) => {
            if (!movieRating) {
                return true;
            } else if (movieRating === 'bad') {
                return movie.rating <= 4;
            } else if (movieRating === 'good') {
                return movie.rating > 4 && movie.rating < 8;
            } else if (movieRating === 'excellent') {
                return movie.rating > 7;
            } else {
                return true;
            }
    });

    const searchValue = document.querySelector('#movie-search').value;
    filteredMovies = filteredMovies.filter((movie) => {
        if(!searchValue){
            return true;
        }
        return movie.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    for (let movie of await filteredMovies){
        const movieCards = renderCard(movie);
        await cardFragment.appendChild(await movieCards);
    }
    cardContainer.appendChild(cardFragment);
}

//MAIN
(async () => {
    window.addEventListener('load', () => {
        document.querySelector('.loader').style.display="none";
    })
    const movieRating = document.querySelector('#ratingSelect');
    const searchMovies = document.querySelector('#movie-search');
    searchMovies.addEventListener ('input', async (e) => {
        e.preventDefault();
        await updateCards(await getMovies());
    });
    movieRating.addEventListener('change', async e=> {
        e.preventDefault();
      await updateCards(await getMovies());
    });
    const addBtn = document.querySelector('#addBtn');
    addBtn.addEventListener('click', async (e) => {
        e.preventDefault();
         const newMovie = await ({
             id: await getMovies().length + 1,
             title: document.querySelector('#title').value,
             rating: document.querySelector('#rating').value,
             summary: document.querySelector('#summary').value,
             category: document.querySelector('#category').value,
             year: document.querySelector('#year').value,
         });
         await postMovie(newMovie);
         await updateCards(await getMovies());
    });

    await updateCards(await getMovies())
})();