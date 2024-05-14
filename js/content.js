function load_news() {
    fetch('http://127.0.0.1:8000/article/')
            .then(res=>res.json())
            .then(json => display(json))
}

function load_category() {
    fetch('http://127.0.0.1:8000/category/list/')
    .then(res=>res.json())
    .then(json=> display_category(json))
}

function filterCategory(args) {
    const name = args.innerText.toLowerCase()
    fetch(`http://127.0.0.1:8000/article/?category__slug=${name}`)
    .then(res=>res.json())
    .then((data) => display(data));
}

function display_category(data) {
    const category_container = document.getElementById('Category-container')
    category_container.innerHTML = ""
    data.forEach((element) => {
        const newh = document.createElement('div')
        newh.innerHTML = `<h1 onclick="filterCategory(this)" class="btn">${element.title}</h1>`
        category_container.appendChild(newh)
    })
}

function display(data) {
    const news_container = document.getElementById('news-container')
    news_container.innerHTML = ""
    data.forEach(element => {
        const new_div = document.createElement('div')
        new_div.innerHTML = `
        <div class="">
                    <figure><img class="h-[200px] w-[500px]" src="${element.picture}" alt=""></figure>
                    <h1 class="text-2xl font-bold"> ${element.headline}</h1>
                    <p>${element.body.slice(0, 150)}... </p>
                    <a target="_blank" class="btn" href="details.html?newsId=${element.id}">See more...</a>
                </div>
        `
        news_container.appendChild(new_div)
    });
}


load_news()
load_category()