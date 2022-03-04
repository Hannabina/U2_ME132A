"use strict";

// Länk till github: https://github.com/Hannabina/U2_ME132A

//Skapar en ny karaktär och retunerar den
function createNewCharacter(name, identity, gender, location, species, birthYear) {
    let character = {
        name: name,
        identity: identity,
        gender: gender,
        location: location,
        species: species,
        birthYear: birthYear
    };

    return character;
}

// Funktionen lägger till vår nya karaktär till vår databas
function addCharacterToDatabase(database, character) {
    database.push(character); 
}

// Tar bort en karaktär baserat på dennes id 
function removeCharacterById(characters, id) {

    for (let i = 0; i < characters.length; i++) { 
        let character = characters[i];

        // Kontrollerar så att karaktärens id är det samma som vi fick fram från funktionen ovan
        if (character.id == id) {
            let confirmCharacter = confirm(`Are you sure you want to remove: ${character.name} from the list?`);

            // Tar bort karaktären från vår databas (array)
            if (confirmCharacter) {
                characters.splice(i, 1);
                return;
            }
        } 
    }
}

// Filtrerar alla karaktärer baserat på art
function returnCharacterBySpecies(characters, species) {
    let charactersBySpecies = [];

    for (let character of characters) {

        // toLowerCase() gör att vi kan skriva in med små bokstäver även om det står med stor bokstav i listan
        if (character.species.toLowerCase() == species.toLowerCase()) {
            charactersBySpecies.push(character);
        }
    }

    return charactersBySpecies;
}

// Filtrerar alla karaktärer baserat på genus (fungerar på samma sätt son funktionen ovan)
function returnCharacterByGender(characters, gender) {
    let charactersByGender = [];

    for (let character of characters) {
        if (character.gender.toLowerCase() == gender.toLowerCase()) {
            charactersByGender.push(character);
        }
    }

    return charactersByGender;
}

// Lägger in en karaktär med all info i HTML
function showCharacter(character) {
    // Skapar elementet div med class character och ett id
    let div = document.createElement("div");
    div.classList.add("character");
    div.id = character.id;

    div.innerHTML = `
        <li>${character.name}</li>
        <div>${character.identity}</div>
        <div>${character.gender}</div>
        <div>${character.location}</div>
        <div>${character.species}</div>
        <div>${character.birthYear}</div>
        <button type="button">Remove</button>`;

    return div;
}

// Berättar var alla karaktärer ska läggas in från vår array till HTML
function showCharacters(characters) {
    let charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = "";

    for (let character of characters) {
        let characterElement = showCharacter(character);
        charactersElement.appendChild(characterElement);
    }
    // Lägger in en "ta bort" knapp
    removeCharacterHandlers();
}

// När vi lägger till en karaktär
function characterSubmit(event) {
    // Gör att vi stannar kvar på sidan när vi ska lägga till en ny karaktär
    event.preventDefault();

    let name = document.getElementById("name").value;

    // Gör att vi får upp en pop up ruta som menar på att vi måsta fylla i alla fälten
    if (name == "") {
        alert("Name of character must be filled out");
        return false;
    }
    let identity = document.getElementById("identity").value;
    if (identity == "") {
        alert("Full name must be filled out")
        return false;
    }
    let gender = document.getElementById("gender").value;
    if (gender == "") {
        alert("Gender must be filled out")
        return false;
    }
    let location = document.getElementById("location").value;
    if (location == "") {
        alert("Location must be filled out")
        return false;
    }
    let species = document.getElementById("species").value;
    if (species == "") {
        alert("Species must be filled out")
        return false;
    }
    let birthYear = document.getElementById("birth").value;
    if (birthYear == "") {
        alert("Birth year must be filled out")
        return false;
    }

    let character = createNewCharacter(name, identity, gender, location, species, birthYear);

    // Räknar ut den nya karaktärens id
    if (database.length = database.length){
        character.id = database[database.length - 1].id + 1;
    } else {
        character.id = 1;
    }

    addCharacterToDatabase(database, character)
    showCharacters(database);

    // Återställer alla fälten 
    let form = document.getElementById("add-character-form");
    form.reset();
}

// Lägger till en click hantering på knappen Add character till formuläret
function addCharacterHandler() {
    let form = document.getElementById("add-character-form");
    form.addEventListener("submit", characterSubmit);
}

// När vi klickar på remove så tar vi endast bort karaktären vars knapp vi trycker på
function removeCharacterClick(event) {
    let button = event.target;
    let id = button.parentElement.id;

    removeCharacterById(database, id);

    // Återger resterande karaktärer från databasen
    showCharacters(database);
}

// Lägger till en click hantering på alla ta bort knappar
function removeCharacterHandlers() {
    let buttons = document.querySelectorAll(".character button");

    for (let button of buttons) {
        button.addEventListener("click", removeCharacterClick);
    }
}

// Filtrerar våra karaktärer baserat på art
function filterBySpeciesSubmit(event) {

    // Gör så vi stannar kvar på samma sida
    event.preventDefault();

    // Vilken art vi ska hämta
    let species = document.getElementById("filter-species").value;

    // Hämtar karaktärerna baserat på art
    let characters = returnCharacterBySpecies(database, species);

    // Återger dessa karaktärer
    showCharacters(characters);
}

// Filtrerar våra karaktärer baserat på genus
function FilterByGenderSubmit(event) {
    event.preventDefault();

    // Vilket genus vi ska hämta
    let gender = document.getElementById("filter-gender").value;

    // Hämtar karaktärerna baserat på genus
    let characters = returnCharacterByGender(database, gender);

    // Återger dessa karaktärer
    showCharacters(characters);
}

// Återställer alla karaktäerna och filtreringsfälten om vi trycker på show all knappen
function showAllClick() {
    document.getElementById("filter-species").value = "";
    document.getElementById("filter-gender").value = "";
    showCharacters(database);
}

// Gör så att click hanterings funktionerna kallas på när man klickar på knapparna 
function filterCharacterHandlers() {
    let speciesForm = document.getElementById("filter-by-species");
    let genderForm = document.getElementById("filter-by-gender");
    let showAll = document.getElementById("show-all");

    speciesForm.addEventListener("submit", filterBySpeciesSubmit);
    genderForm.addEventListener("submit", FilterByGenderSubmit);
    showAll.addEventListener("click", showAllClick);
}

// Kallar på funktionerna 
showCharacters(database);
addCharacterHandler();
filterCharacterHandlers();