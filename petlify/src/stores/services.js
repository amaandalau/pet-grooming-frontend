import { defineStore } from "pinia";

export const useServicesStores = defineStore({
    id: 'services',

    state: () => {

    },

    getters: {

    },

    actions: {
        
        async getAllServices() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/services', options)
                const data = response.json()

                console.log(data)
                console.log('Get All Services - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async getServiceByID(serviceID) {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/services/${serviceID}`, options)
                const data = response.json()

                console.log(data)
                console.log('Get Service By ID - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async createService(services, groomerID) {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({services, groomerID})
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/services/', options)
                const data = response.json()

                console.log(data)
                console.log('Create Service - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updateService(services, groomerID) {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({services, groomerID})
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/services/:serviceID', options)
                const data = response.json()

                console.log(data)
                console.log('Update Service - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteService(serviceID) {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                const response = await fetch(`https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/services/${serviceID}`, options)
                const data = response.json()

                console.log(data)
                console.log('Delete Service - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        }
    }
})