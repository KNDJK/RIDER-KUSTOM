// Base de datos simulada para el buscador
const contentDatabase = [
    {
        id: 1,
        title: "Avatar: La Leyenda de Aang",
        type: "serie",
        year: "2005-2008",
        rating: "98%",
        image: "https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_FMjpg_UX600_.jpg",
        link: "avatar.html"
    },
    {
        id: 2,
        title: "Lost",
        type: "serie",
        year: "2004-2010",
        rating: "85%",
        image: "https://m.media-amazon.com/images/M/MV5BNzhlY2E5NDUtYjJjYy00ODg3LWFkZWQtYTVmMzU4ZWZmOWJkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX600_.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "The Mandalorian",
        type: "serie",
        year: "2019-presente",
        rating: "93%",
        image: "https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_FMjpg_UX600_.jpg",
        link: "#"
    },
    {
        id: 4,
        title: "Stranger Things",
        type: "serie",
        year: "2016-presente",
        rating: "91%",
        image: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX600_.jpg",
        link: "#"
    },
    {
        id: 5,
        title: "Avengers: Endgame",
        type: "película",
        year: "2019",
        rating: "94%",
        image: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX600_.jpg",
        link: "#"
    },
    {
        id: 6,
        title: "The Witcher",
        type: "serie",
        year: "2019-presente",
        rating: "89%",
        image: "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX600_.jpg",
        link: "#"
    },
    {
        id: 7,
        title: "Spider-Man: Into the Spider-Verse",
        type: "película",
        year: "2018",
        rating: "97%",
        image: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_FMjpg_UX600_.jpg",
        link: "#"
    },
    {
        id: 8,
        title: "The Dark Knight",
        type: "película",
        year: "2008",
        rating: "94%",
        image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX600_.jpg",
        link: "#"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del buscador
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const navSearch = document.querySelector('.nav-search');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Mostrar/ocultar buscador en móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navSearch.classList.toggle('active');
                if (navSearch.classList.contains('active')) {
                    searchInput.focus();
                }
            }
        });
    }
    
    // Función de búsqueda con debounce para mejor performance
    let searchTimeout;
    function performSearch(query) {
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            const results = contentDatabase.filter(item => 
                item.title.toLowerCase().includes(lowerQuery) || 
                item.type.toLowerCase().includes(lowerQuery)
            );
            
            displayResults(results);
        }, 300);
    }
    
    // Mostrar resultados con animación
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <div>No se encontraron resultados</div>
                </div>
            `;
            searchResults.classList.add('active');
            return;
        }
        
        results.forEach((item, index) => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';
            resultElement.style.animationDelay = `${index * 0.05}s`;
            resultElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="search-result-info">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-meta">
                        <span class="search-result-type">${item.type}</span>
                        <span class="search-result-year">${item.year}</span>
                        <span class="search-result-rating">${item.rating}</span>
                    </div>
                </div>
                <i class="fas fa-chevron-right" style="margin-left: 10px; opacity: 0.5;"></i>
            `;
            
            resultElement.addEventListener('click', () => {
                window.location.href = item.link;
                searchResults.classList.remove('active');
            });
            
            searchResults.appendChild(resultElement);
        });
        
        searchResults.classList.add('active');
    }
    
    // Eventos del buscador mejorados
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.length >= 2) {
            searchResults.classList.add('active');
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!navSearch.contains(e.target) && e.target !== searchInput) {
            searchResults.classList.remove('active');
        }
    });
    
    // Cerrar resultados al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('active');
        }
    });

    // Efecto de movimiento del mouse (partículas o iluminación)
    document.addEventListener('mousemove', function(e) {
        const glowEffects = document.querySelectorAll('.glow-effect');
        glowEffects.forEach((effect, index) => {
            // Solo animar algunos efectos para mejor performance
            if (index < 2) {
                effect.style.transform = `translate(${e.clientX * (index === 0 ? 0.02 : -0.02)}px, ${e.clientY * (index === 0 ? 0.02 : -0.02)}px)`;
            }
        });
    });

    // Animación de carga
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);

    // Resto del código (navbar, temporadas, reproductor, etc.)
    // ... [tu código JavaScript existente] ...
    
    // Detectar dispositivo
    const isTV = window.matchMedia('(min-width: 1200px) and (min-height: 720px)').matches;
    if (isTV) {
        document.body.classList.add('tv-mode');
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Menú móvil
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // [Resto de tu código JavaScript existente...]
});