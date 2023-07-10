import { defineStore } from 'pinia'
import Cookies from 'js-cookie'


export const useAuthStores = defineStore({
    id: 'auth',

    state: () => {

    },

    getters: {

    },

    actions: {
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

                Cookies.set('access_token', accessToken, { path: '/', expires: 7})

                document.cookie = `access_token=${accessToken}; path=/`

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
        }
    }
})