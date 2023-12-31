import { defineStore } from 'pinia'
import * as jose from 'jose'

export const useAuthStores = defineStore({
    id: 'auth',

    state: () => {
        return {
            currentUser: {
                id: null,
                email: null,
                role: null
            }
        }
    },

    getters: {

    },

    actions: {
        async getCurrentUser() {
            try {
                const accessToken = localStorage.getItem('access_token')

                if(!accessToken) throw 'Access token not found'

                // Decode JWT token
                const decodedToken = jose.decodeJwt(accessToken)

                if(!decodedToken || !decodedToken.id) throw 'Invalid token or missing user ID'

                const userDetails = {
                    id: decodedToken.id,
                    email: decodedToken.email,
                    role: decodedToken.role
                }
                
                return userDetails
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

                // const response = await fetch('http://localhost:8080/auth/register', options)
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/auth/register', options)
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

                // const response = await fetch('http://localhost:8080/auth/login', options)
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/auth/login', options)
                const data = await response.json()

                const accessToken = data.accessToken
                this.accessToken = accessToken
                console.log('Login - Access Token', accessToken)
                
                // Save access token to local storage
                localStorage.setItem('access_token', accessToken)
                console.log('Local storage access token', accessToken)
                
                // Fetch current user
                this.currentUser = await this.getCurrentUser()
                console.log('Login - Current User', this.currentUser)

                if(this.currentUser) {
                    this.userLoggedIn = true
                    return this.currentUser.id
                }
                
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

                // const response = await fetch('http://localhost:8080/auth/forgotPwd', options)
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/auth/forgotPwd', options)
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

                // const response = await fetch('http://localhost:8080/auth/resetPwd', options)
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/auth/resetPwd', options)
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

                // const response = await fetch('http://localhost:8080/auth/changePwd', options)
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/auth/changePwd', options)
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