import { defineStore } from "pinia";

export const useApptStores = defineStore({
    id: 'appointments',

    state: () => {

    },

    getters: {

    },

    actions: {
        
        async getAllAppt() {
            try {
                const options = {
                    method: 'GET'
                }
    
                // const response = await fetch('http://localhost:8080/appointments', options)
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/appointments', options)
                const data = await response.json()
    
                console.log(data)
                console.log('Get All Appt - Success - Thrown from Pinia')

                return data
            } catch (error) {
                console.error(error)
            }
            
        },

        async getApptByID(apptID) {
            try {
                const options = {
                    method: 'GET'
                }

                // const response = await fetch(`http://localhost:8080/appointments/${apptID}`, options)
                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/appointments/${apptID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Get Appt By ID - Success - Thrown from Pinia')

                return data
            } catch (error) {
                console.error(error)
            }
        },

        async getApptByPetID(petID) {
            try {
                const options = {
                    method: 'GET'
                }

                // const response = await fetch(`http://localhost:8080/appointments/pet/${petID}`, options)
                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/appointments/pet/${petID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Get Appointments By Pet ID')

                return data
            } catch (error) {
                console.error(error)
            }
        },

        async createAppt(apptDate, specialInstructions, status, petID, timeslotID, ownerID, groomerID) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        apptDate, 
                        specialInstructions, 
                        status, 
                        petID, 
                        timeslotID, 
                        ownerID, 
                        groomerID})
                }

                // const response = await fetch('http://localhost:8080/appointments/', options)
                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/appointments/', options)
                const data = await response.json()

                console.log(data)
                console.log('Create Appt - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updateAppt(apptID, apptDate, specialInstructions, status, ownerID, petID, groomerID, timeslotID) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        apptDate,
                        specialInstructions,
                        status,
                        ownerID,
                        petID,
                        groomerID,
                        timeslotID
                    })
                }

                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/appointments/${apptID}`, options)
                const data = await response.json()

                console.log(data)
                console.log('Update Appt - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteAppt(apptID) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/appointments/${apptID}`, options)
                const data = response.json()

                console.log(data)
                console.log('Delete Appt - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        }
    }
})