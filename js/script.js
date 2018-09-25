const ajax = request => {
    return new Promise((resolve,reject) =>{
        const xhr = new XMLHttpRequest()
        xhr.open(request.method, request.url, true)
        xhr.addEventListener('load', e => {
            resolve(e.target)
        })
        xhr.send()
    })
}


const showMarvel = async () => {
    console.log('recuperando la información')
    const hash = 'aquí va el hash que tienes que generar con los datos de la api de marvel'
    const apiKey = 'aquí va el key público que te proporciona la api de marvel'
    const url = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apiKey}&hash=${hash}&limit=20&nameStartsWith=iron%20man`
    const request = { method: 'GET', url: url }
    const response = await ajax(request)
    switch (response.status) {
        case 200:
            console.log(JSON.parse(response.responseText))
            draw(JSON.parse(response.responseText).data.results)
            break
        case 401:
            setText('Invalid referer ' + response.status)
            break
        case 409: 
            setText('Missing API Key or Missing Hash or Missing Timestamp ' + response.status)
            break
        case 405:
            setText('Method Not Allowed ' + response.status)
            break
        case 403:
            setText('Forbidden ' + response.status)
            break
    
        default:
            setText('Error desconocido '+ response.status)
            break
    }
}

const draw = data => {
    const fragment = document.createDocumentFragment()
    data.forEach(comic => {
        const container = document.createElement('div')
        const title = document.createElement('h2')
        const image = document.createElement('img')

        title.textContent = comic.name
        image.src = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`
        container.appendChild(title)
        container.appendChild(image)
        fragment.appendChild(container)
    })
    myContent.appendChild(fragment)
}

const setText = data =>{
    myContent.innerHTML = data
}

btn.addEventListener('click', () => {showMarvel()})
