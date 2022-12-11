window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
    console.log(location)

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
}

function homePage(){
    console.log("home")
    getTrandingMoviesPreview()
getCategoriesPreview()
}

function categoriesPage(){
    console.log("categorie")

}

function movieDetailsPage(){
    console.log("movieDeatils")
}

function searchPage(){
    console.log("searchPage")
}

function trendsPage(){
    console.log("trends")
}