document.addEventListener('DOMContentLoaded', () => {
    console.log('content loaded');
    let searchForm = document.querySelector("#searchForm");
    // Search Form, Leave for later
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let search_container = document.querySelector('#searched_moves');
        search_container.innerHTML = '';
        let searchbar = document.querySelector('#search');
        let search = searchbar.value.trim() ;
        fetch(`search/${search}`)
        .then(response => response.json())
        .then(result => {
            let default_container = document.querySelector('#default_moves');
            default_container.innerHTML = '';
            searchbar.value = '';
            console.log(typeof result);
            let iterable_result = Object.entries(result);
            for (let technique of result.result) {
                search_cardify(technique.name, technique.video,technique.belt, search_container);
            }
        });
        
    });
    // Button group fiiiiiiiiiinally smth good looking !!!!!!!!! (maybe :( )
    let btngroup = document.querySelectorAll('.btn');
    btngroup.forEach(btn => {
        let belt = btn.getAttribute('data-belt');
        btn.addEventListener('click', () => {
            fetch(`${belt}`)
            .then(response => response.json())
            .then(result => {
                let search_container = document.querySelector('#searched_moves');
                search_container.innerHTML = '';
                let default_container = document.querySelector('#default_moves');
                default_container.innerHTML = '';
                result = JSON.parse(result);
                for (let move of result){
                    cardify(move, default_container);
                };
            });
        });
    });
});

function cardify(move,container){
    console.log(move);
    // Inside card
    let card = document.createElement('div');
    card.className = 'card m-3';
    card.style.width = '100%';
    let iframe = document.createElement('iframe');
    iframe.className = 'card-img-top';
    iframe.style.height = '300px';
    iframe.src = move.fields.video.replace("youtu.be/", "youtube.com/embed/");
    // Inside body
    let cardbody = document.createElement('div');
    cardbody.className = 'card-body';
    let title = document.createElement('h5');
    title.className = 'card-title';
    title.innerHTML = move.fields.name;
    let level = document.createElement('p');
    level.className = 'card-text';
    level.innerHTML = `Level: ${ "⭐".repeat(move.fields.belt)}`;
    // Appending carbody
    cardbody.appendChild(title);
    cardbody.appendChild(level);
    // Appending card
    card.appendChild(iframe);
    card.appendChild(cardbody);
    // Appending container
    container.appendChild(card);

}

function search_cardify(name,video,belt,container){
    // Inside card
    let card = document.createElement('div');
    card.className = 'card m-3';
    card.style.width = '100%';
    let iframe = document.createElement('iframe');
    iframe.className = 'card-img-top';
    iframe.style.height = '300px';
    iframe.src = video.replace("youtu.be/", "youtube.com/embed/");
    // Inside body
    let cardbody = document.createElement('div');
    cardbody.className = 'card-body';
    let title = document.createElement('h5');
    title.className = 'card-title';
    title.innerHTML = name;
    let level = document.createElement('p');
    level.className = 'card-text';
    level.innerHTML = `Level: ${belt} belt.`;
    // Appending carbody
    cardbody.appendChild(title);
    cardbody.appendChild(level);
    // Appending card
    card.appendChild(iframe);
    card.appendChild(cardbody);
    // Appending container
    container.appendChild(card);
}