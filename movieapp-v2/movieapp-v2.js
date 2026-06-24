const API = "http://localhost:5000/movies";

function displayMovies() {
    fetch(API)
        .then(function(response) { return response.json(); })
        .then(function(movies) {
            const movieList = document.getElementById("movie-list");
            movieList.innerHTML = "";

            if (movies.length === 0) {
                const empty = document.createElement("p");
                empty.className = "empty-msg";
                empty.textContent = "Nema filmova. Dodajte prvi film!";
                movieList.appendChild(empty);
                return;
            }

            movies.forEach(function(movie) {
                const row = document.createElement("section");

                var fields = [movie.title, movie.genre, movie.year, movie.planned_date, movie.status];
                fields.forEach(function(value) {
                    const div = document.createElement("div");
                    div.textContent = value || "—";
                    row.appendChild(div);
                });

                const actionsDiv = document.createElement("div");

                const editBtn = document.createElement("button");
                editBtn.className = "btn-edit";
                editBtn.textContent = "Uredi";
                editBtn.onclick = function() { openEdit(movie); };

                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn-delete";
                deleteBtn.textContent = "Obriši";
                deleteBtn.onclick = function() { handleDelete(movie.id); };

                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);
                row.appendChild(actionsDiv);
                movieList.appendChild(row);
            });
        });
}

document.getElementById("movie-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const year  = document.getElementById("year").value;

    if (!title && !genre && !year) {
        alert("Molimo ispunite barem naslov, žanr ili godinu.");
        return;
    }

    const newMovie = {
        title:        title,
        genre:        genre,
        year:         year,
        planned_date: document.getElementById("planned_date").value,
        status:       document.getElementById("status").value
    };

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
    }).then(function() {
        displayMovies();
        document.getElementById("title").value        = "";
        document.getElementById("genre").value        = "";
        document.getElementById("year").value         = "";
        document.getElementById("planned_date").value = "";
        document.getElementById("status").value       = "";
    });
});

// DELETE - obriši film
function handleDelete(id) {
    if (!confirm("Jeste li sigurni da želite obrisati ovaj film?")) return;

    fetch(API + '/' + id, { method: 'DELETE' })
        .then(function() { displayMovies(); });
}

let editingId = null;

function openEdit(movie) {
    document.getElementById("edit-title").value         = movie.title;
    document.getElementById("edit-genre").value         = movie.genre;
    document.getElementById("edit-year").value          = movie.year;
    document.getElementById("edit-planned-date").value  = movie.planned_date;
    document.getElementById("edit-status").value        = movie.status;

    editingId = movie.id;
    const editSection = document.getElementById("edit-section");
    editSection.style.display = "block";
    editSection.scrollIntoView({ behavior: "smooth" });
}

// Odustani od uređivanja
document.getElementById("cancel-edit").addEventListener("click", function() {
    document.getElementById("edit-section").style.display = "none";
    editingId = null;
});

document.getElementById("edit-form").addEventListener("submit", function(e) {
    e.preventDefault();
    if (editingId === null) return;

    const updatedMovie = {
        title:        document.getElementById("edit-title").value,
        genre:        document.getElementById("edit-genre").value,
        year:         document.getElementById("edit-year").value,
        planned_date: document.getElementById("edit-planned-date").value,
        status:       document.getElementById("edit-status").value
    };

    fetch(API + '/' + editingId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMovie)
    }).then(function() {
        document.getElementById("edit-section").style.display = "none";
        editingId = null;
        displayMovies();
    });
});

displayMovies();