window.addEventListener('load', function () {

    const myButton = document.getElementById('myButton')
    const uploadImage = document.getElementById('uploadImage')
    const loader = document.getElementById('loader')

    myButton.addEventListener('click', function () {
        uploadImage.click()
    })

    uploadImage.addEventListener('change', function () {

        const files = uploadImage.files

        if (files.length > 0) {

            loader.classList.add('is-active')
            const formData = new FormData()
            formData.append('file', files[0], files[0].name)

            fetch('/uploadfile', { method: 'POST', body: formData })
                .then(function (res) { return res.json() })
                .then(function (res) {

                    loader.classList.remove('is-active')

                    if (res.state)
                        Notification(true)
                    else
                        Notification(false)
                })
                .catch(function (err) {
                    swal("¡ERROR!", "An error has ocurred", "error")
                    console.log(err)
                    loader.classList.remove('is-active')
                })
        }

    })


})

function Notification(status) {

    let html_text = `<span class="icon icon-megaphone"><img style="margin-left: -7px" src="img/error.svg" width="40" height="40" ></span><p>According to Vision API. your image <br/><b>It´s not a Hot Dog</b> </p>`

    if (status) {
        html_text = `<span class="icon icon-megaphone"><img style="margin-left: -7px" src="img/success.svg" width="40" height="40" ></span><p>According to Vision API. your image <br/><b>It´s a Hot Dog</b> </p>`
    }

    var notification = new NotificationFx({
        message: html_text,
        layout: 'bar',
        effect: 'slidetop',
        type: 'notice',
        onClose: function () {
            bttn.disabled = false;
        }
    })

    notification.show()
}