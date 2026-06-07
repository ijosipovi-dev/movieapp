const title = document.getElementById("title");
const genre = document.getElementById("genre");
const year = document.getElementById("year");
const planned_date = document.getElementById("planned_date");
const status = document.getElementById("status");
const movieList = document.getElementById("movie-list");
const btn = document.querySelector(".btn");

function displayMovies() {
  movieList.innerHTML = "";
  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  movies.forEach(function (movie) {
    const newRow = document.createElement("section");

    const fields = [movie.title, movie.genre, movie.year, movie.planned_date, movie.status];
    fields.forEach(function (value) {
      const div = document.createElement("div");
      div.innerHTML = value;
      newRow.appendChild(div);
    });

    movieList.appendChild(newRow);
  });
}

displayMovies();
    
btn.addEventListener("click", function (m) {
  m.preventDefault();

  if (title.value == "" && genre.value == "" && year.value == "") {
    alert("Fill The Form");
  } else {
     const movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.push({
      title: title.value,
      genre: genre.value,
      year: year.value,
      planned_date: planned_date.value,
      status: status.value
    });
    localStorage.setItem("movies", JSON.stringify(movies));

    displayMovies();

    title.value = "";
    genre.value = "";
    year.value = "";
    planned_date.value = "";
    status.value = "";
  }
});
  
