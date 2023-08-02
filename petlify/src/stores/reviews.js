import { defineStore } from "pinia";

export const userReviewStore = defineStore({
    id: 'reviews',

    state: () => {

    },

    getters: {

    },

    actions: {
        async getAllReviews() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('http://localhost:8080/reviews', options)
                const data = response.json()

                console.log(data)
                console.log('Get All Reviews - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async getAllReviewsByGroomerID() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('http://localhost:8080/reviews/users/:userID', options)
                const data = response.json()

                console.log(data)
                console.log('Get all reviews by groomer id - success - thrown from pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async getReviewByID() {
            try {
                const options = {
                    method: 'GET'
                }

                const response = await fetch('http://localhost:8080/reviews/:reviewID', options)
                const data = response.json()

                console.log(data)
                console.log('Get Review By ID - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async createReview(title, description, rating, groomerID, ownerID) {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        rating,
                        groomerID,
                        ownerID
                    })
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/reviews', options)
                const data = response.json()

                console.log(data)
                console.log('Create Review - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async updateReview(title, description, rating, groomerID, ownerID) {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        rating,
                        groomerID,
                        ownerID
                    })
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/reviews/:reviewID', options)
                const data = await response.json()

                console.log(data)
                console.log('Update Review - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        },

        async deleteReview() {
            try {
                const accessToken = this.accessToken

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: accessToken
                    }
                }

                const response = await fetch('https://pet-grooming-appt-system-api-dev-4-tkytgwdwfa-as.a.run.app/reviews/:reviewID', options)
                const data = response.json()

                console.log(data)
                console.log('Delete Review - Success - Thrown from Pinia')
            } catch (error) {
                console.error(error)
            }
        }
    }
})