const links = document.querySelectorAll('.nav-link');
const Paginas = document.getElementById('PaginasCrsl');
const Navbar = document.getElementById('offcanvasNavbar');

links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const index = link.getAttribute('data-index');

        if (index !== null) {
            Paginas.style.transform = `translateX(-${index * 100}vw)`;

            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const bsOffcanvas = bootstrap.Offcanvas.getInstance(Navbar);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }
    });
});

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
