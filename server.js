'use strict'

const express       = require('express')
const cloudinary    = require('cloudinary')
const formidable    = require('formidable')
const config        = require('./config/config')
const visionApi     = require('./vision-api')
const app           = express()

app.use(express.static('views/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

cloudinary.config(config.credentials.cloudinary)

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.post('/uploadfile', (req, res) => {

    let form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {

        const _file = files.file
        const sizeLimit = config.sizeLimit

        if (_file == undefined)
            return res.status(200).send(config.messages.ERROR)

        if (_file.size >= sizeLimit || files == {}) {
            return res.status(200).send(config.messages.FILE_EXCEEDED_LIMIT)
        }

        cloudinary.uploader.upload_large(_file.path, (result) => {

            const { format, url } = result

            visionApi.NotHotDog(res, url)

        }, { resource_type: 'image' })

    })

})

app.listen(config.port, () => {
    console.log(config.messages.SERVER_START, config.port)
})


