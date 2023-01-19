import { indexCharacter, createCharacter, showCharacter } from './api.js'
import {
	onIndexCharacterSuccess,
	onFailure,
	onCreateCharacterSuccess,
	onShowCharacterSuccess,
} from './ui.js'

const createCharacterForm = document.querySelector('#create-character-form')
const indexCharacterContainer = document.querySelector('#index-character-container')

indexCharacter()
    .then(res => res.json())
    .then(res => {
        console.log(res)
        onIndexCharacterSuccess(res.characters)
    })
    .catch(onFailure)


createCharacterForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const characterData = {
			character: {
				firstName: event.target['firstName'].value,
				lastName: event.target['lastName'].value,
				class: event.target['class'].value,
				strength: event.target['strength'].value,
                dexterity: event.target['dexterity'].value,
                constitution: event.target['constitution'].value,
                intelligence: event.target['intelligence'].value,
                wisdom: event.target['wisdom'].value,
                charisma: event.target['charisma'].value,
			},
		}

    // console.log(characterData)
    createCharacter(characterData)
			.then(onCreateCharacterSuccess)
			.catch(onFailure)
})

indexCharacterContainer.addEventListener('click', (event) => {
    const id = event.target.getAttribute('data-id')
    // console.log(id)

    showCharacter(id)
			.then((res) => res.json())
			.then((res) => onShowCharacterSuccess(res.character))
			.catch(onFailure)
})