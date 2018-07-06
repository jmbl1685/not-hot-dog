'use strict';

const fetch = require('node-fetch')
const config = require('./config/config')

const visionApi = {
    key: config.credentials.visionapi.key,
    endpoint: config.credentials.visionapi.endpoint
}

/* 25 minutos en Milisegundos */
const MIN_25 = 1500000

/* Wake Up Heroku Server */
setInterval(() => {
    fetch('https://nothotdog.herokuapp.com/')
        .then( response => {
            return response.text()
        })
        .then( () =>{
            let date = new Date(Date.now()).toLocaleString()
            console.log(`Wake Up [Server] ${date}`)
        })
}, MIN_25)

module.exports = {

    NotHotDog: async (res, imageUrl) => {

        const options = {
            method: 'POST',
            body: JSON.stringify({ url: imageUrl }),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': visionApi.key
            }
        }

        const response = await fetch(visionApi.endpoint, options)
        const json = await response.json()
        let tagsHotDogCount = 0


        json.tags.forEach(tag => {
            if (tag.name == 'hot' | tag.name == 'dog') {
                tagsHotDogCount++
            }
        })

        if (tagsHotDogCount === 2)
            return res.status(200).send({ message: "It's a Hot Dog", state: true })

        return res.status(200).send({ message: "Is not a Hot Dog", state: false })

    }
}
