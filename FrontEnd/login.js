const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");
const loginElement = document.querySelector(".login");
const logoutElement = document.querySelector(".logout");

function onSubmit(e) {
    e.preventDefault();
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    login(email, password);
}

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

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    setTimeout(() => {
        errorMessage.classList.add("hidden");
    }, 5000);
}

form.addEventListener("submit", onSubmit);

function isConnected() {
    const token = localStorage.getItem("token");
    return !!token;
}

if (isConnected()) {
    loginElement.classList.add("hidden");
    logoutElement.classList.remove("hidden");
}

function logout() {
    localStorage.removeItem("token");
    loginElement.classList.remove("hidden");
    logoutElement.classList.add("hidden");
}

logoutElement.addEventListener("click", logout);

let button = document.createElement('button');
button.type = 'button';
button.classList.add('forgot-password-btn');
button.textContent = 'Mot de passe oublié';

button.addEventListener('click', function() {
});

document.body.appendChild(button); 