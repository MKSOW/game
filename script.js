let tempsRestant = 0;
let timerInterval;
let scoreEquipe1 = 0;
let scoreEquipe2 = 0;
let chronoActif = false;

// Désactiver les champs de saisie pour les scores au départ
document.getElementById("points-equipe1").disabled = true;
document.getElementById("points-equipe2").disabled = true;

function lancerCompteur() {
    const duree = document.getElementById('duree-manche').value;
    tempsRestant = parseInt(duree);

    if (isNaN(tempsRestant) || tempsRestant <= 0) {
        alert("Veuillez entrer une durée valide !");
        return;
    }

    // Ne pas réinitialiser les scores si le chronomètre a déjà été démarré
    if (chronoActif) {
        return; // Si le chrono est déjà actif, on ne réinitialise pas les scores
    }

    // Réinitialiser le chrono à zéro au début
    document.getElementById('timer-display').innerText = "Temps restant : 0";

    // Démarrer le chronomètre
    chronoActif = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (tempsRestant > 0) {
            tempsRestant--;
            document.getElementById('timer-display').innerText = `Temps restant : ${tempsRestant}`;
        } else {
            clearInterval(timerInterval);
            document.getElementById('timer-display').innerText = "Temps écoulé !";
            activerSaisie(); // Activer les champs de saisie une fois le chrono écoulé
        }
    }, 1000);
}

function stopCompteur() {
    clearInterval(timerInterval);
    document.getElementById('timer-display').innerText = `Temps arrêté à : ${tempsRestant}`;

    // Afficher le temps restant non écoulé dans le champ de saisie
    document.getElementById('duree-manche').value = tempsRestant;

    activerSaisie(); // Activer les champs de saisie si l'utilisateur arrête le chrono
}

function ajouterPoints(equipe) {
    const pointsInput = document.getElementById(`points-${equipe}`);
    const points = parseInt(pointsInput.value);

    if (isNaN(points) || points < 0) {
        alert("Veuillez entrer un nombre valide de points !");
        return;
    }

    if (equipe === "equipe1") {
        scoreEquipe1 += points;
        document.getElementById("score-equipe1").innerText = scoreEquipe1;
    } else if (equipe === "equipe2") {
        scoreEquipe2 += points;
        document.getElementById("score-equipe2").innerText = scoreEquipe2;
    }

    // Réinitialiser le champ après l'ajout des points
    pointsInput.value = "";
}

// Fonction pour activer les champs de saisie
function activerSaisie() {
    if (chronoActif) {
        document.getElementById("points-equipe1").disabled = false;
        document.getElementById("points-equipe2").disabled = false;
        chronoActif = false; // Indique que le chrono a été arrêté ou terminé
    }
}

// Empêcher le rafraîchissement de la page sur l'appui des boutons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut (rafraîchissement de la page)
    });
});

// Ajouter des écouteurs d'événements pour les boutons
document.getElementById("start-button").addEventListener('click', lancerCompteur);
document.getElementById("stop-button").addEventListener('click', stopCompteur);
document.getElementById("add-equipe1").addEventListener('click', () => ajouterPoints('equipe1'));
document.getElementById("add-equipe2").addEventListener('click', () => ajouterPoints('equipe2'));
