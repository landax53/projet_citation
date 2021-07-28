// Créer un tableau contenant les citations et leur auteur
class Citation {
    constructor (auteur, citation)
    {
        this.auteur = auteur;
        this.citation = citation;
    }
}

let cesar = new Citation("Jules César", '"Alea jacta est"');
let karl = new Citation( "Karl Popper" , '"La thèse du complot"');
let nietzsche = new Citation( "Friedrich Nietzsche" , '"Le mensonge moral"');
let heraclite = new Citation("Héraclite",'"On ne se baigne jamais deux fois dans le même fleuve."');
let socrate = new Citation("Socrate",'"Je sais que je ne sais rien."');
let aristote = new Citation("Aristote",'"L’homme est un animal politique"');
let epicure = new Citation("Epicure",'"La mort n’est rien pour nous"');
let deleuze = new Citation("Gilles Deleuze", '"C\'est que le désir n\'est jamais trompé. L\'intérêt peut être trompé, méconnu ou trahi, mais pas le désir"')
let lucrece = new Citation("Lucrèce", '"Ce qui rend les hommes esclaves de la peur, c’est que, témoins de mille faits accomplis dans le ciel et sur la terre, mais incapables d’en apercevoir les causes, ils les imputent à une puissance divine"')

let listObject = [];
listObject.push(cesar,karl,nietzsche,heraclite,socrate,aristote,epicure,deleuze,lucrece);

let citationTable = [];
for (let i=0; i <listObject.length; i++) {
    citationTable.push(listObject[i].citation);
};

//Créer le tableau d'auteurs à trouver dans la liste de choix
let auteursTable = [];
for (let i=0; i <listObject.length; i++) {
    auteursTable.push(listObject[i].auteur);
};

//Bouton regénérer
let regenerate = document.getElementById('regenerateButton');
let validation = document.createElement('input');

// Modèles de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>'
const coeurPlein = '<ion-icon name="heart"></ion-icon>'
const totalVies = 3;
let vies = totalVies;
let divVies = document.querySelector('.coeurs');




// Au 'click' de 'Générer une citation' -> ajouter la citation au paragraphe
function newCitation() {

    /* On masque le bouton "Générer une citation"
    et on affiche le bouton "Reset" */

    let generate = document.getElementById('generateButton');
    generate.style.display = 'none';
    regenerate.style.display = 'block';

    actualiseCoeurs(vies);

    //Demande à qui appartient la citation?
    let q = document.getElementById('question'); 
    q.innerHTML = "<p> A qui appartient la citation ? </p>";
    
    // Choisir au hasard une citation dans le tableau et l'afficher 
    let p = document.createElement('p');
    let txt = citationTable[Math.floor(Math.random()*citationTable.length)];
    p.innerHTML = txt;
    let rdmCitation = document.getElementById('rdmcitation');
    rdmCitation.appendChild(p); //insère <p> dans l'id 'rdmcitation


    //Create and append select list
    let selectList = document.createElement('select');
    selectList.className = 'selectClass'
    let myChoice = document.getElementById('mySelect')
    myChoice.appendChild(selectList);

    // Create and append the options
    for (var i=0 ; i<=auteursTable.length ; i++) {
        let option = document.createElement('option');
        option.value = auteursTable[i];
        option.text = auteursTable[i];
        option.selected = auteursTable[0];
        selectList.appendChild(option);
    };
 
    // Bouton 'Valider'

    validation.id = "inputValidation";
    validation.type = "button";
    validation.value = "Valider";
    let boutons = document.getElementById('myValidation');
    boutons.appendChild(validation);
    
    // Récupère la sélection issue de l'évènement 'change'

    validation.addEventListener('click', (e) => {
        vies--;
        actualiseCoeurs(vies);
        });
    
    const selectElement = document.querySelector('.selectClass');

    const selectionValidation = 
    selectElement.addEventListener('change', (event) => {

        const resume = document.querySelector('.selection');
        resume.innerHTML = `<p>Votre réponse : ${event.target.value}</p>`;
        let result = document.querySelector('.result');
        result.innerHTML = '';
        // Création d'une image dans le HTML
        let image = document.createElement('img');
        image.alt = 'philosophe';;
        image.id = 'image'
        image.src = `images/${event.target.value}.jpg`;
        resume.appendChild(image);
               
        /* Au click de "Valider" --> si la target.value === auteur, 
        alors "Vous avez trouvé !", 
        sinon "Dommage, ce n'est pas la bonne réponse" */
        
        let textIndex = citationTable.indexOf(txt);         
        let list = document.querySelector('#inputValidation');
        list.addEventListener('click', function(ev) { 
            
                if (ev.target.id === 'inputValidation') {

                    if (vies > 0) {
                        if (event.target.value===auteursTable[textIndex]) {
                        result.innerHTML = '<p>Vous avez trouvé !</p>';
                        selectList.style.display = 'none';
                        }

                        else { result.innerHTML = '<p>Dommage ce n\'est pas la bonne réponse !</p>';
                        const deleteImage = document.querySelector('.images');
                        deleteImage.innerHTML = '';
                        };
                    }
                    else {
                        validation.setAttribute("disabled", "");
                        selectList.setAttribute("disabled", "");
                        result.innerHTML = `Vous avez perdu !! <br/> La réponse était : ${auteursTable[textIndex]}`;
                    }
                }             
        }, false);
    });

    /* Au "click" de 'Reset': on recharge la page */

    regenerate.onclick = function() {
        document.location.reload(true);
    }

};

const actualiseCoeurs = (vies) => {
    divVies.style.display = 'block';
    divVies.innerHTML = " ";
    let tableauCoeur = [];

    for (let i=0; i < vies; i++) {
        tableauCoeur.push(coeurPlein);
    }
    
    for (let i=0; i < totalVies - vies; i++) {
        tableauCoeur.push(coeurVide);
    }
    
    tableauCoeur.forEach (coeur => {
        divVies.innerHTML += coeur;
    });

};

    /* Désactive le bouton 'Valider' si vies === 0 
    et affiche la réponse */
    





divVies.style.display = 'none';
regenerate.style.display = 'none';


