document.addEventListener('DOMContentLoaded',() => {
    let posts = document.querySelectorAll('.post');
    const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];
    posts.forEach(post => {
        post.addEventListener('click', () => {
            console.log('div clicked');
           let postid = post.getAttribute('data-postid');
           fetch(`posts/${postid}`)
           .then(response => response.text())
           .then(data => {
                document.querySelector("#big_container").innerHTML = '';
                document.querySelector("#big_container").innerHTML = data;
                // Commenting logic
                let commentContainer = document.querySelector('#comments');
                let commentForm = document.querySelector('#commentForm');
                let commentContent = commentForm.querySelector('#commentContent');
                console.log(`Comment: ${commentContent}`);
                commentForm.addEventListener('submit', event =>{
                    event.preventDefault();
                    fetch(`posts/${postid}`,{
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrftoken
                        },
                        body: JSON.stringify({
                            content: commentContent.value
                        })
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        commentContent.value = '';
                        cardify(result.comment, commentContainer);
                    });
                });
            });
        });
    });
});

function cardify(comment,container){
    // Inside card
    let card = document.createElement('div');
    card.className = 'card border-success m-3 post';
    // Inside body
    let cardbody = document.createElement('div');
    cardbody.className = 'card-body';
    let title = document.createElement('h5');
    title.className = 'card-title';
    title.innerHTML = comment.commenter;
    let content = document.createElement('p');
    content.className = 'card-text m-3';
    content.innerHTML = comment.content;
    let datetime = new Date(comment.timestamp);
    let timestamp = document.createElement('div');
    timestamp.className = 'text-right timestamp',
    timestamp.innerHTML = datetime.toLocaleString();
    // Appending carbody
    cardbody.appendChild(title);
    cardbody.appendChild(content);
    cardbody.appendChild(timestamp);
    // Appending card
    card.appendChild(cardbody);
    // Appending container
    container.insertBefore(card, container.firstChild)

}