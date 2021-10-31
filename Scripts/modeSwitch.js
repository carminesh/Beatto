
const modeBtn = document.querySelector('.mode-btn');

modeBtn.addEventListener('click', () => {
    const link = document.querySelector('#style-link');


    if(link.href.includes('style.css')) {

        link.href = './Styles/darkMode.css';
    } else {
        link.href = './Styles/style.css';
    }
});