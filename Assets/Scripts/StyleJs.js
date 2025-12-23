const tglBtn = document.getElementById('toggleMode');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    html.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        tglBtn.checked = true;
    }
}

tglBtn.addEventListener('change', () =>{
    if (tglBtn.checked) {
        html.setAttribute ('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute ('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});
