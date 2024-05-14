const getNews = () => {
    const params = new URLSearchParams(window.location.search).get('newsId')
    console.log(params);

    fetch(`http://127.0.0.1:8000/article/${params}/`)
        .then(res => res.json())
        .then(data => display(data))
}

function display(data) {
    const container = document.getElementById('news-container')
    container.innerHTML = `
    <figure class="flex justify-center items-center"><img src="${data.picture}" class="w-[300px] h-[300px]" alt=""></figure>
    <div><h1 class="text-2xl font-bold">${data.headline}</h1></div>
    <small>date: ${data.publishing_date} </small>
    <div>
    <p>${data.body} </p>
    <p><span class="font-bold">Ratings:</span>${data.ratings} </p>
    </div>
    `
}


getNews()