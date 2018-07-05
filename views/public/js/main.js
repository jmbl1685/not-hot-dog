window.addEventListener('load', () => {

    const myButton = document.getElementById('myButton')
    const uploadImage = document.getElementById('uploadImage')
    const loader = document.getElementById('loader')

    myButton.addEventListener('click', () => {
        uploadImage.click()
    })

    uploadImage.addEventListener('change', () => {

        const files = uploadImage.files

        if (files.length > 0) {

            loader.classList.add('is-active')
            const formData = new FormData(files)
            formData.append('file', files[0], files[0].name)

            fetch('/uploadfile', { method: 'POST', body: formData })
                .then(res => res.json())
                .then(res => {

                    loader.classList.remove('is-active')

                    if (res.state)
                        swal(res.message, "Thanks!", "success")
                    else
                        swal(res.message, "Thanks!", "error")
                })
                .catch(err => {
                    swal("¡ERROR!", "An error has ocurred", "error")
                    loader.classList.remove('is-active')
                })
        }

    })


})