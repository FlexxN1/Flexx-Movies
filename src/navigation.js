/*searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value;
});
*/

let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    if(searchFormInput.value === ""){
        searchFormBtn.setAttribute('type', 'button')
    } else {
        location.hash = `#search=${searchFormInput.value.split(' ').join('+')}`;
    }   
});


trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    history.back()
    //location.hash = '#home'
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function navigator(){
  //  console.log(location)

    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, { passive: false});
        infiniteScroll = undefined;
    }

    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetailsPage()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage()
    }else {
        homePage()
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll,  { passive: false});
    }
}

function homePage(){
    //console.log("home")

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrandingMoviesPreview()
    getCategoriesPreview()
}

function categoriesPage(){
    //console.log("categorie")

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    //para reemplazar el error(%20) que sale en losespacios de los titulos
    const newName = categoryName.replace('%20', ' ')

    headerCategoryTitle.innerText = newName

    getMoviesByCategory(categoryId);

    infiniteScroll = getPaginatedMoviesByCategory(categoryId)

}

function movieDetailsPage(){
    //console.log("movieDeatils")

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // ['#movie', '123456]
    let [_, movieId] = location.hash.split('=');

    getMovieById(movieId)

}

function searchPage(){
    //console.log("searchPage")

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');


    //para solucionar el error de "%20" los espacios, 2 soluciones
    // 1 - usando el decodeURI

    //let [_, query] = location.hash.split('=')[1];
    //getMoviesBySearch(decodeURI(query))


    //2 usando el metodo replace all
    let [, query] = location.hash.split('=');
    //query = query.replaceAll('%20', ' ');
    //getMoviesBySearch(query)

    
    getMoviesBySearch(query)

    infiniteScroll = getPaginatedMoviesBySearch(query)
}

function trendsPage(){
    //console.log("trends")

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias'

    getTrandingMovies()

    infiniteScroll = getPaginatedTrendingMovies;
}