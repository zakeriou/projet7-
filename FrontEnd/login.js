// -------------------------
// Sélection des éléments DOM
// -------------------------
const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");
const loginElement = document.querySelector(".login");
const logoutElement = document.querySelector(".logout");

// -------------------------
// Gestion de la soumission du formulaire
// -------------------------
function onSubmit(e) {
    e.preventDefault();
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    login(email, password);
}

// -------------------------
// Connexion à l'API
// -------------------------
async function login(email, password) {
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Connexion réussie', data);
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else {
            const errorData = await response.json();
            console.error("Erreur de connexion:", errorData);
            showError(errorData.message || "Une erreur est survenue lors de la connexion.");
        }
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion:", error);
        showError("Une erreur s'est produite, veuillez réessayer plus tard.");
    }
}

// -------------------------
// Affichage du message d'erreur
// -------------------------
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    setTimeout(() => {
        errorMessage.classList.add("hidden");
    }, 5000);
}

// -------------------------
// Écouteur d'événements pour la soumission du formulaire
// -------------------------
form.addEventListener("submit", onSubmit);

// -------------------------
// Vérification de la connexion de l'utilisateur
// -------------------------
function isConnected() {
    const token = localStorage.getItem("token");
    return !!token;
}

// -------------------------
// Mise à jour de l'interface en fonction de la connexion
// -------------------------
if (isConnected()) {
    loginElement.classList.add("hidden");
    logoutElement.classList.remove("hidden");
}

// -------------------------
// Gestion de la déconnexion
// -------------------------
function logout() {
    localStorage.removeItem("token");
    loginElement.classList.remove("hidden");
    logoutElement.classList.add("hidden");
}

// -------------------------
// Écouteur d'événements pour la déconnexion
// -------------------------
logoutElement.addEventListener("click", logout);