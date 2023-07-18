import { defineStore } from "pinia";

export const usePetStores = defineStore({
    id: 'pets',

    state: () => {
        return {
            pet: null
        }
    },

    getters: {
        getPetAge: (state) => {
            const pet = state.pet
            if(!pet) return null

            const dob = newDate(pet.dateOfBirth)
            const today = new Date()
            const ageTime = today - dob
            const petAge = Math.floor(ageTime / (1000 * 60 * 60 * 24 * 365.25))

            return petAge
        }
    },

    actions: {
        
        async getPetsByOwnerID(userID) {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch(`http://localhost:8080/pets/users/${userID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Get Pet By Owner ID - Success - Thrown from pinia')

                return data
            } catch (error) {
                console.error(error)
            }
        },

        async getPetByID(petID) {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch(`http://localhost:8080/pets/${petID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Get Pet By Pet ID - Success - Thrown from Pinia')

                return data
            } catch (error) {
                console.error(error)
            }
        },

        async createPet(name, dateOfBirth, species, breed, weightInKG, color, ownerID) {
            try {
                // Retrieve access token from local storage
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        name,
                        dateOfBirth,
                        species,
                        breed,
                        weightInKG,
                        color,
                        ownerID: useAuthStores.currentUser.id
                    })
                }

                const response = await fetch('http://localhost:8080/pets/', options)
                const data = await response.json()

                console.log(data)
                console.log('Create Pet - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updatePet(petID, name, dateOfBirth, species, breed, color, weightInKG, ownerID) {

            try {
                
            const accessToken = localStorage.getItem('access_token')

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken
                },
                body: JSON.stringify({
                    name,
                    dateOfBirth,
                    species,
                    breed,
                    color,
                    weightInKG,
                })
            }

            const response = await fetch(`http://localhost:8080/pets/${petID}`, options)
            const data = await response.json()

            console.log(data)
            console.log('Update Pet - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }

        },

        async deletePet(petID) {
            try {
                const accessToken = localStorage.getItem('acccess_token')

            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: accessToken
                }
            }

            const response = await fetch(`http://localhost:8080/pets/${petID}`, options)
            const data = await response.json()

            console.log(data)
            console.log('Pet Deleted Successfully - Thrown from Pinia')

            // return data
            } catch (error) {
                console.error(error)
            }
            
        }
    }
})