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

const canvas = document.querySelector("#CursorBG");
const ctx = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 40;
let mouse = {
	x: undefined,
	y: undefined,
	radius: 100
}

let colorPrincipal = "rgb(255, 255, 255)";

function actualizarColorDesdeCSS() {
    const estilo = getComputedStyle(document.documentElement);
    colorPrincipal = estilo.getPropertyValue('--text-color').trim();
}

function init() {
	resizeReset();
	animationLoop();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;

	particles = [];
	for (let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2; y < h; y += particleDistance) {
		for (let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2; x < w; x += particleDistance) {
			particles.push(new Particle(x, y));
		}
	}
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	actualizarColorDesdeCSS();
	drawScene();
	requestAnimationFrame(animationLoop);
}

function drawScene() {
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
	}
	drawLine();
}

function drawLine() {
	for (let a = 0; a < particles.length; a++) {
		for (let b = a; b < particles.length; b++) {
			let dx = particles[a].x - particles[b].x;
			let dy = particles[a].y - particles[b].y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < particleDistance * 1.5) {
				opacity = 1 - (distance / (particleDistance * 1.5));
				ctx.strokeStyle = colorPrincipal;
				ctx.globalAlpha = opacity;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(particles[a].x, particles[a].y);
				ctx.lineTo(particles[b].x, particles[b].y);
				ctx.stroke();

				ctx.globalAlpha = 1;
			}
		}
	}
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}

function mouseout() {
	mouse.x = undefined;
	mouse.y = undefined;
}

class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 4;
		this.baseX = this.x;
		this.baseY = this.y;
		this.speed = (Math.random() * 25) + 5;
	}
	draw() {
		ctx.fillStyle = colorPrincipal;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	update() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		let maxDistance = mouse.radius;
		let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
		let forceDirectionX = dx / distance;
		let forceDirectionY = dy / distance;
		let directionX = forceDirectionX * force * this.speed;
		let directionY = forceDirectionY * force * this.speed;

		if (distance < mouse.radius) {
			this.x -= directionX;
			this.y -= directionY;
		} else {
			if (this.x !== this.baseX) {
				let dx = this.x - this.baseX;
				this.x -= dx / 10;
			}
			if (this.y !== this.baseY) {
				let dy = this.y - this.baseY;
				this.y -= dy / 10;
			}
		}
	}
}

init();
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);

