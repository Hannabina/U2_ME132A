"use strict";

function createNewCharacter(name, identity, gender, location, species) {
    let character = {
        name: name,
        identity: identity,
        gender: gender,
        location: location,
        species: species,
    };

    return character;
}

function addCharacterToDatabase(database, character) {
    database.push(character);
}

function removeCharacterById(characters, id) {
    for (let i = 0; i < characters.length; i++) {
        let character = characters[i];

        if (character.id == id) {
            characters.splice(i, 1);
            return;
        }
    }
}

function returnCharacterBySpecies(characters, species) {
    let charactersBySpecies = [];

    for (let character of characters) {
        if (character.species.toLowerCase() == species.toLowerCase()) {
            charactersBySpecies.push(character);
        }
    }

    return charactersBySpecies;
}

function returnCharacterByGender(characters, gender) {
    let charactersByGender = [];

    for (let character of characters) {
        if (character.gender.toLowerCase() == gender.toLowerCase()) {
            charactersByGender.push(character);
        }
    }

    return charactersByGender;
}

function showCharacter(character) {
    let div = document.createElement("div");
    div.classList.add("character");
    div.id = character.id;

    div.innerHTML = `
        <div>${character.name}</div>
        <div>${character.identity}</div>
        <div>${character.gender}</div>
        <div>${character.location}</div>
        <div>${character.species}</div>
        <button type="button">Remove</button>`;

    return div;
}

function showCharacters(characters) {
    let charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = "";

    for (let character of characters) {
        let characterElement = showCharacter(character);
        charactersElement.appendChild(characterElement);
    }

}

function characterSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let identity = document.getElementById("identity").value;
    let gender = document.getElementById("gender").value;
    let location = document.getElementById("location").value;
    let species = document.getElementById("species").value;

    

    let character = createNewCharacter(name, identity, gender, location, species);

    character.id = database[database.length - 1].id + 1;

    addCharacterToDatabase(database, character)
    showCharacters(database);

    let form = document.getElementById("add-character-form");
    form.reset();
}

function addCharacterHandler() {
    let form = document.getElementById("add-character-form");
    form.addEventListener("submit", characterSubmit);
}

function removeCharacterClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    removeCharacterById(database, id);
    showCharacters(database);
}

function removeCharacterHandlers() {
    let buttons = document.querySelectorAll(".character button");

    for (let button of buttons) {
        button.addEventListener("click", removeCharacterClick);
    }
}