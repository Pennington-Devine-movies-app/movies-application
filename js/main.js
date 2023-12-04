



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
const postMovie = async ({ID, title, rating, summary}) => {
    const newMovie = {
        ID,
        title,
        rating,
        summary
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
const patchMovie = async (id) => {
    const newMovie = {
        ...movie,
    };
    const body = JSON.stringify(newMovie);

    const url = `http://localhost:3000/movies/${id}`;
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}
const renderCard = ({title, rating, summary, id}) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('col' );
    movieCard.innerHTML = `
 
        <div class="card mt-4">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${title}</h5>
    <!--                            modal button-->
                                <button type="button" class="btn editBtn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    ...
                                </button>
    
    <!--                            modal-->
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                ...
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Understood</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="movie-year">${id}</p>
                            <div class="card-summary">
                            <p> ${summary}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p>Rating</p>
                                <p>${rating}</p>
                            </div>
                            <div class="progress mb-3" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar bg-success progress-bar-animated" style="width: 75%"></div>
                            </div>
                            <button class="btn btn-secondary">Category</button>
                            <button class="btn btn-secondary">Category</button>
                        </div>
                        
                    </div>
                    
            `;
    return movieCard;
}

const updateCards = async (movies) => {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    const cardFragment = document.createDocumentFragment();

    for (let movie of await movies){
        const movieCards = renderCard(movie);
        await cardFragment.appendChild(await movieCards);
    }
    cardContainer.appendChild(cardFragment);
}





//MAIN
(async () => {
    console.log(document.readyState)

    window.addEventListener('load', () => {
        document.querySelector('.loader').style.display="none";
    })






    await updateCards(await getMovies())













})();