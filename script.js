// Variables
let noCount = 0;
const maxNoClicks = 10;

// Elementos del DOM
const mainImage = document.getElementById('main-image');
const question = document.getElementById('question');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const carousel = document.querySelector('.carousel');

// Array de imágenes de gatos para el carrusel
const catImages = [];
for (let i = 1; i <= 10; i++) {
    catImages.push(`imagenes/gato_amor_${i.toString().padStart(2, '0')}.jpg`);
}

// Inicializar el carrusel
function initCarousel() {
    catImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Gato amor ${index + 1}`;
        if (index === 0) img.classList.add('active');
        carousel.appendChild(img);
    });
    
    // Cambiar imagen cada 3 segundos
    let currentIndex = 0;
    setInterval(() => {
        const images = document.querySelectorAll('.carousel img');
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);
}

// Manejar clic en "No"
function handleNoClick() {
    noCount++;
    
    if (noCount <= maxNoClicks) {
        // Cambiar imagen a gato llorando
        if (noCount <= 10) {
            mainImage.src = `imagenes/gato_lloro_${noCount.toString().padStart(2, '0')}.jpg`;
        }
        
        // Cambiar texto
        question.textContent = '¡Vamos, di que sí!';
        
        // Hacer el botón "Sí" más grande
        const currentSize = window.getComputedStyle(btnYes).getPropertyValue('transform');
        const currentScale = currentSize === 'none' ? 1 : parseFloat(currentSize.split(',')[3]);
        btnYes.style.transform = `scale(${currentScale * 1.2})`;
        
        // Hacer el botón "No" más pequeño o desaparecerlo
        if (noCount === maxNoClicks) {
            btnNo.style.display = 'none';
        } else {
            btnNo.style.transform = `scale(${1 - (noCount * 0.1)})`;
        }
    }
}

// Manejar clic en "Sí"
function handleYesClick() {
    mainImage.src = 'imagenes/gato_lengua.jpg';
    question.textContent = '¡Ya volvimos mi amor! Te amo ❤️';
    
    // Ocultar botones
    btnYes.style.display = 'none';
    btnNo.style.display = 'none';
    
    // Agregar confeti o animación de celebración
    celebrate();
}

// Función de celebración
function celebrate() {
    // Agregar estilos para la animación de confeti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetti {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: #f00;
            animation: confetti 3s linear forwards;
            z-index: 1000;
        }
    `;
    document.head.appendChild(style);
    
    // Crear confeti
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            document.body.appendChild(confetti);
            
            // Eliminar el confeti después de la animación
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    
    btnYes.addEventListener('click', handleYesClick);
    btnNo.addEventListener('click', handleNoClick);
    
    // Hacer que el botón "No" sea difícil de hacer clic
    btnNo.addEventListener('mouseover', () => {
        if (noCount < maxNoClicks) {
            const x = Math.random() * (window.innerWidth - 200);
            const y = Math.random() * (window.innerHeight - 100);
            btnNo.style.position = 'absolute';
            btnNo.style.left = `${x}px`;
            btnNo.style.top = `${y}px`;
        }
    });
});
