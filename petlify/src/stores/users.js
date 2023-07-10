import { defineStore } from "pinia";

export const useUserStores = defineStore({
    id: 'users',

    state: () => {

    },

    getters: {

    },

    actions: {
        
        async getUserByID() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('http://localhost:8080/users/:userID', options)
                const data = response.json()

                console.log(data)
                console.log('Get user id - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async createUser() {
            const accessToken = this.accessToken
            try {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({email, password, role, isVerified})
                }

                const response = await fetch('http://localhost:8080/users', options)
                const data = response.json()

                console.log(data)
                console.log('User created - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updateUser(name, email, password) {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({name, email, password})
                }

                const response = await fetch('http://localhost:8080/users/:userID', options)
                const data = response.json()

                console.log(data)
                console.log('Successfully update user - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteUser() {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                const response = await fetch('http://localhost:8080/users/:userID', options)
                const data = response.json()

                console.log(data)
                console.log("Successfully delete user - thrown from pinia")
            } catch (error) {
                console.error(error)
            }
        }
    }
})