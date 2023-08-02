import { defineStore } from "pinia";

export const useTimeslotStores = defineStore({
    id: 'timeslot',

    state: () => {
        return {
            timeslot: null
        }
    },

    getters: {

    },

    actions: {
        
        async getAllTimeslots() {
            try {
                const options = {
                    method: 'GET'
                }
    
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/timeslots/', options)
                const data = response.json()
    
                console.log(data)
                console.log('Get All Timeslots Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async getAllTimeslotsByGroomerID(groomerID) {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/timeslots/users/${groomerID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Get All Timeslots By Groomer ID - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async getTimeslotByID(timeslotID) {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/timeslots/${timeslotID}`, options)
                const data = response.json()

                console.log(data)
                console.log('Get Timeslot By ID - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async createTimeslot(timeslots, status, groomerID) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({timeslots, status, groomerID})
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/timeslots/', options)
                const data = response.json()

                console.log(data)
                console.log('Create Timeslot - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updateTimeslot(timeslots, status, groomerID) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({timeslots, status, groomerID})
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/timeslots/:timeslotID', options)
                const data = response.json()

                console.log(data)
                console.log('Update timeslot - success - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteTimeslot() {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/timeslots/:timeslotID', options)
                const data = response.json()

                console.log(data)
                console.log('Delete Timeslot - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        }
    }
})