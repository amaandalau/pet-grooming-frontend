import { defineStore } from "pinia";
import { useAuthStores } from "./auth";
import { inject } from "vue";

export const useUserStores = defineStore({
    id: 'users',

    state: () => {
        return {
            user: {
                id: null,
                name: null,
                email: null,
                password: null,
                isVerified: null,
                role: null
            }
        }
    },

    getters: {
        getUser: (state) => state.user,
    },

    actions: {

        async getUserByID(userID) {
            try {
                const options = {
                    method: 'GET'
                }
                const response = await fetch(`http://localhost:8080/users/${userID}`, options)
                const data = await response.json()

                this.user = data // Set the user information in the state

                console.log('Get User By ID - User ID:' , userID)
                console.log('Get User By ID - User Data', data)
                console.log('Get user id - thrown from pinia')

                return data
            } catch (error) {
                console.error(error)
            }
        },

        async createUser() {
            try {
                const accessToken = localStorage.getItem('access_token')
                
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({email, password, role, isVerified})
                }

                const response = await fetch('http://localhost:8080/users', options)
                const data = await response.json()

                console.log('User Data', data)
                console.log('User created - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updateUser(userID, name, email, password) {
            try {

                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({name, email, password})
                }

                const response = await fetch(`http://localhost:8080/users/${userID}`, options)
                const data = response.json()

                console.log(data)
                console.log('Successfully update user - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteUser(userID) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                const response = await fetch(`http://localhost:8080/users/${userID}`, options)
                const data = response.json()

                console.log(data)
                console.log("Successfully delete user - thrown from pinia")

                localStorage.removeItem('access_token')
            } catch (error) {
                console.error(error)
            }
        }
    }
})
