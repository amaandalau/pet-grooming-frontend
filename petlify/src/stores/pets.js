import { defineStore } from "pinia";

export const usePetStores = defineStore({
    id: 'pets',

    state: () => {

    },

    getters: {

    },

    actions: {
        
        async getPetsByOwnerID() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('http://localhost:8080/pets/users/:userID', options)
                const data = response.json()

                console.log(data)
                console.log('Get Pet By Owner ID - Success - Thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async getPetByID() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('http://localhost:8080/pets/:petID', options)
                const data = response.json()

                console.log(data)
                console.log('Get Pet By Pet ID - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async createPet(name, dateOfBirth, species, breed, weightInKG, color, ownerID) {
            try {
                const accessToken = this.accessToken

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
                        ownerID
                    })
                }

                const response = await fetch('http://localhost:8080/pets/', options)
                const data = response.json()

                console.log(data)
                console.log('Create Pet - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updatePet(name, dateOfBirth, species, breed, weightInKG, color) {

            try {
                
            const accessToken = this.accessToken

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
                    weightInKG,
                    color
                })
            }

            const response = await fetch('http://localhost:8080/pets/:petID', options)
            const data = response.json()

            console.log(data)
            console.log('Update Pet - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }

        },

        async deletePet() {
            try {
                const accessToken = this.accessToken

            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: accessToken
                }
            }

            const response = await fetch('http://localhost:8080/pets/:petID', options)
            const data = response.json()

            console.log(data)
            console.log('Pet Deleted Successfully - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
            
        }
    }
})