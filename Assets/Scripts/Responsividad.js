function alineamientoResponsivo() {
    const paginas = document.querySelectorAll('.pagina');
    const mobileQuery = window.matchMedia('(max-width: 991px)');

    function applyChanges(e) {
        paginas.forEach(pagina => {
            if (e.matches) {
                pagina.classList.remove('justify-content-center');
                pagina.classList.add('justify-content-start');
            } else {
                pagina.classList.remove('justify-content-start');
                pagina.classList.add('justify-content-center');
                pagina.style.paddingTop = '0px';
            }
        });
    }

    mobileQuery.addEventListener('change', applyChanges);
    
    applyChanges(mobileQuery);
}

document.addEventListener('DOMContentLoaded', alineamientoResponsivo);