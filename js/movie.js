const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTY5NzNhNGE2YjhlNTJmMzFhNDFlYTdkNDM4Mjk0MyIsIm5iZiI6MTYzNTE1MTk4Ny43NTcsInN1YiI6IjYxNzY3MDczNmUwZDcyMDAyNDZhZDAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zok9IaVBfX4-RSyU0O9iroE8nIFrHRDQok086ng2qP0";

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
};


async function getMovies() {
  const responseRaw = await fetch(url, options)
  const responseJSON = await responseRaw.json()

  const moviesRaw = responseJSON.results.slice(0,7)
  const movies = moviesRaw.map(e => {
    return {
      id: e.id,
      title: e.title,
      rating: e.vote_average,
      year: e.release_date,
      poster: e.poster_path
    }
  })

  const results = movies.map(e => {

    const dateObj = new Date(e.year)
    const releaseYear = dateObj.getFullYear()

    return `
      <div class="card min-w-50 flex flex-col gap-y-2">
        <div class="image w-full h-[300px]">
          <img
            class="object-cover h-full w-full rounded-lg"
            src="https://image.tmdb.org/t/p/w500/${e.poster}"
            alt=""
          />
        </div>
        <div class="typo">
          <div class="title-rating flex w-full justify-between">
            <a
              href="#"
              class="text-white font-inter font-bold text-sm hover:underline"
            >
              ${e.title}
            </a>
            <span
              class="rating text-white font-inter font-bold text-xs text-yellow-600"
              >★ ${e.rating}</span
            >
          </div>
          <div class="year">
            <span class="font-inter text-xs text-gray-500">
              ${releaseYear}
            </span>
          </div>
        </div>
      </div>
    `
  }).join('')

  const container = document.querySelector(".card-container")
  container.innerHTML = results
  
}

getMovies()
