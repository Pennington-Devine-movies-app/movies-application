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



//MAIN
(async () => {
const newMovie = postMovie({
    id: 2,
    title: "The Matrix",
    rating: 5,
    summary: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
});
console.log(await newMovie);
})();