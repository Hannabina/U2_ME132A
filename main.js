"use strict";

function createNewCharacter(name, identity, gender, location, species) {
    let character = {
        name: name,
        identity: identity,
        gender: gender,
        location: location,
        species: species
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

