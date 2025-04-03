// Déclaration des constantes pour les URL, éléments DOM et autres variables
const url = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categories";
const loginElement = document.querySelector(".login");
const logoutElement = document.querySelector(".logout");
const modalContainer = document.querySelector(".modal-container");
const closeModalBtns = document.querySelectorAll(".close-modal");
const addWorkForm = document.getElementById("addWorkForm");
const workCategorySelect = document.getElementById("workCategory");
const galleryModal = document.querySelector('.gallery-modal');
const modalBtn = document.querySelector(".button-modifier");
const filtersContainer = document.querySelector('.filters');

// Fonction pour récupérer tous les travaux depuis l'API
async function getWorks() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Fonction pour afficher les travaux dans la galerie, avec possibilité de filtrer par catégorie
async function displayWorks(categoryId) {
    const container = document.querySelector('.gallery');
    container.innerHTML = "";
    
    let elements = await getWorks();

    if (categoryId && categoryId !== 'all') {
        elements = elements.filter(element => element.categoryId == categoryId);
    }

    elements.forEach(element => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = element.imageUrl;
        img.alt = element.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = element.title;

        figure.dataset.category = element.categoryId;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        container.appendChild(figure);
    });
}

displayWorks();

// Fonction pour filtrer les travaux selon la catégorie sélectionnée
async function filtersWorks(event) {
    const button = event.target;
    const categoryId = button.dataset.category;
    displayWorks(categoryId);
}

// Fonction pour récupérer toutes les catégories depuis l'API
async function getCategories() {
    const response = await fetch(categoriesUrl);
    const data = await response.json();
    return data;
}

// Fonction pour configurer les filtres basés sur les catégories
async function setupFilters() {
    const categories = await getCategories();

    const allButton = document.createElement('button');
    allButton.textContent = "Tous";
    allButton.dataset.category = "all";
    allButton.classList.add('active');
    filtersContainer.appendChild(allButton);
    allButton.addEventListener("click", filtersWorks);

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.dataset.category = category.id;
        filtersContainer.appendChild(button);
        button.addEventListener("click", filtersWorks);
    });
}

setupFilters();