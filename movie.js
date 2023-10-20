const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b853c4231c9808c04f51c1bfb7f37cde&page=1'
const IMG_PATH= 'https://image.tmdb.org/t/p/w1280'  
const SEARCH_API= 'https://api.themoviedb.org/3/search/movie?api_key=b853c4231c9808c04f51c1bfb7f37cde&query="'
const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.querySelector('.main')
getMovies(API_URL)
async function getMovies(url){
    const res=await fetch(url)
    const data=await res.json()
    //  console.log(data.results)
   showMovies(data.results)
}
 function showMovies(movies){
    main.innerHTML=''

    movies.forEach((movie) => {
        const  {title,poster_path, vote_average,overview} = movie
        const movieEl= document.createElement('div')
        movieEl.classList.add('movies')
        movieEl.innerHTML=` 
        
        <img src="${IMG_PATH+poster_path}" alt='${title}'>
        <div class="movie-info">
            <h3>${title}</h3>
            <span ${getClassByRate()}>${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview </h3>
            <p>${overview}</p>
            </div>
     `
     main.appendChild(movieEl)
    })
 }
 function getClassByRate(vote){
    if(vote>=8){
        return 'green'

    }else if (vote>=5){
        return 'orenge'
    }
    else{
        return 'red'
    }
 }
form.addEventListener('submit',(e)=>{
    e.preventDefault()
     const searchTerm=search.value
    if ( searchTerm && searchTerm!=='' ){
getMovies(SEARCH_API+searchTerm)    
search.value=''

    }else{
        window.location.reload()
    }
}) 