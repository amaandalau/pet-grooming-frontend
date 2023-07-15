import { defineStore } from 'pinia'

export const useAuthStores = defineStore({
    id: 'auth',

    state: () => {
        return {
            currentUser: {
                id: null,
                email: null,
                role: null
                // accessToken: null
            }
            // currentUser: null
        }
    },

    getters: {

    },

    actions: {
        async getCurrentUser() {
            try {
                const accessToken = localStorage.getItem('access_token')

                if(!accessToken) {
                    throw new Error('Access token not found')
                } 

                const response = await fetch('http://localhost:8080/auth/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                if(!response.ok) {
                    throw new Error('Failed to fetch current user')
                }

                const userData = await response.json()
                state.currentUser = userData

                return userData
            } catch (error) {
                console.error(error)
            }
        },

        async registerUser(name, email, password, role) {
            try {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({name, email, password, role})
                }

                const response = await fetch('http://localhost:8080/auth/register', options)
                const data = await response.json()

                console.log(data)
                console.log('User Registered - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async login(email, password) {
            try {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                }

                const response = await fetch('http://localhost:8080/auth/login', options)
                const data = await response.json()

                const accessToken = data.accessToken
                this.accessToken = accessToken

                // Save access token to local storage
                localStorage.setItem('access_token', accessToken)

                // Fetch current user
                const userResponse = await fetch('http://localhost:8080/auth/me', {
                    method:'GET',
                    headers: {
                        Authorization: accessToken
                    }
                })

                // const userResponse = await fetch('http://localhost:8080/auth/me', {
                //     method: 'GET',
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`
                //     }
                // })

                if (userResponse.ok) {
                    const userData = await userResponse.json()

                    // Update user info 
                    this.currentUser = userData
                    this.userLoggedIn = true

                    const userID = userData.id
                    console.log('User ID: ', userID)
                    
                    return userID

                }

                console.log(data)
                console.log('User successfully logged in - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async forgotPassword(email) {
            try {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({email})
                }

                const response = await fetch('http://localhost:8080/auth/forgotPwd', options)
                const data = await response.json()

                console.log(data)
                console.log('User forgot password - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async resetPassword(newPassword, resetToken) {
            try {
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({newPassword, resetToken})
                }

                const response = await fetch('http://localhost:8080/auth/resetPwd', options)
                const data = await response.json()

                console.log(data)
                console.log('User reset password - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        }, 

        // need auth token
        async changePassword(currentPassword, newPassword) {
            try {
                const accessToken = this.accessToken
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({currentPassword, newPassword})
                }

                const response = await fetch('http://localhost:8080/auth/changePwd', options)
                const data = await response.json()

                console.log(data)
                console.log('User password changed - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async logout() {
            // Remove access token from local storage
            localStorage.removeItem('access_token')

            // Reset the currentUser state
            this.currentUser = {
                id: null,
                name: null,
                email: null,
                role: null
            }

            console.log('Successfully logged out - Thrown from Pinia')
        }
    }

})