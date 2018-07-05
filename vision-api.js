'use strict';

const fetch = require('node-fetch')
const config = require('./config/config')

const visionApi = {
    key: config.credentials.visionapi.key,
    endpoint: config.credentials.visionapi.endpoint
}

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
