document.addEventListener('DOMContentLoaded', () => {
    let userbelt = document.querySelector('#userbelt');
    for (let i = 0; i < userbelt.options.length; i++) {
        let option = userbelt.options[i];
        if (option.value.includes(userbelt.value)) {
            option.selected = true;
        }
    }
});