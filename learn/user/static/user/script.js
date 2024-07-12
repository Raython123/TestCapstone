document.addEventListener('DOMContentLoaded', () => {
    let edit = document.querySelector('#editprofile');
    edit.addEventListener('click', () => {
        // Hide alert
        let alertdiv = document.querySelector('#msgdiv');
        alertdiv.style.display = 'none';
        // Hide card to add comps
        let cardbody = document.querySelector('.card-body');
        cardbody.style.display = 'none';
        // Creat comps
        let inputgroup = document.createElement('div');
        inputgroup.className = 'input-group mb-3';
        // In inputgrp
        let spancontainer = document.createElement('div');
        spancontainer.className = 'input-group-prepend';
        let span = document.createElement('span');
        span.className = 'input-group-text';
        span.innerHTML = '@';
        let inputfield = document.createElement('input');
        inputfield.type = 'text';
        inputfield.className = 'form-control';
        inputfield.placeholder = 'New User';
        // Append inp grp
        spancontainer.appendChild(span);
        inputgroup.appendChild(spancontainer);
        inputgroup.appendChild(inputfield);
        // Dropdown
        let dropdownGroup = document.createElement('div');
        dropdownGroup.className = 'input-group mb-3';
        let dropdownPrepend = document.createElement('div');
        dropdownPrepend.className = 'input-group-prepend';
        let dropdownSpan = document.createElement('span');
        dropdownSpan.className = 'input-group-text';
        dropdownSpan.innerHTML = 'Belt';
        let dropdown = document.createElement('select');
        dropdown.className = 'form-control';
        let belts = ['White', 'Yellow', 'Orange', 'Green', 'Blue', 'Brown', 'Black'];
        belts.forEach(belt => {
            let option = document.createElement('option');
            option.value = belt.toLowerCase();
            option.innerHTML = belt;
            dropdown.appendChild(option);
        });
        dropdownPrepend.appendChild(dropdownSpan);
        dropdownGroup.appendChild(dropdownPrepend);
        dropdownGroup.appendChild(dropdown);
        let buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'mt-3';
        let saveButton = document.createElement('button');
        saveButton.className = 'btn btn-success mr-2';
        saveButton.innerText = 'Save';
        let cancelButton = document.createElement('button');
        cancelButton.className = 'btn btn-danger';
        cancelButton.innerText = 'Cancel';
        buttonsContainer.appendChild(saveButton);
        buttonsContainer.appendChild(cancelButton);
        let parentElement = document.querySelector('#editContainer');
        parentElement.appendChild(inputgroup);
        parentElement.appendChild(dropdownGroup);
        parentElement.appendChild(buttonsContainer);
        const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];
        saveButton.addEventListener('click', () => {
            console.log('Save clicked');
            fetch('/',{
                method: 'PUT',
                headers: {
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    belt: dropdown.value,
                    username:inputfield.value
                })})
            .then(response => response.json())
            .then(result =>{
                console.log(result);
                if (result.error){
                    alertdiv.innerHTML = result.error;
                    alertdiv.style.display = 'block';
                } else{
                    location.reload(true);
                };
            });
        });
        cancelButton.addEventListener('click', () => {
            console.log('Cancel clicked');
            cardbody.style.display = 'block';
            parentElement.removeChild(inputgroup);
            parentElement.removeChild(dropdownGroup);
            parentElement.removeChild(buttonsContainer);
        });
    });
});
