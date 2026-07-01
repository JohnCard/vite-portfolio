const fetchData = async (substring) => {
    let finalData
    try{
        const apiKey = import.meta.env.VITE_AUTH_TOKEN
        const endpoint = `http://127.0.0.1:8000/ecommerce/${substring}`
        
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${apiKey}`
            }
        }
        
        const response = await fetch(endpoint, fetchOptions)
        finalData = await response.json()
    }catch(error){
        console.log(error)
        finalData = {
            ok: false
        }
    }
    finally{
        return finalData
    }
}

const fetchUser = async () => {
    const apiKey = import.meta.env.VITE_AUTH_TOKEN
    const endpoint = `http://127.0.0.1:8000/accounts/user`
    const fetchOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Token ${apiKey}`
        }
    }
    const response = await fetch(endpoint, fetchOptions)
    let data = await response.json()
    return data
}

const addItemCart = async (id) => {
    const apiKey = import.meta.env.VITE_AUTH_TOKEN
    const endpoint = `http://127.0.0.1:8000/ecommerce/add-item/${id}`
    const fetchOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            Authorization: `Token ${apiKey}`
        }
    }
    const response = await fetch(endpoint, fetchOptions)
    let data = await response.json()
    return data
}

const removeItemCart = async (id) => {
    const apiKey = import.meta.env.VITE_AUTH_TOKEN
    const endpoint = `http://127.0.0.1:8000/ecommerce/add-item/${id}`
    const fetchOptions = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            Authorization: `Token ${apiKey}`
        }
    }
    const response = await fetch(endpoint, fetchOptions)
    let data = await response.json()
    return data
}

const buyItem = async (id) => {
    const apiKey = import.meta.env.VITE_AUTH_TOKEN
    const endpoint = `http://127.0.0.1:8000/ecommerce/buy-item/${id}`
    const fetchOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            Authorization: `Token ${apiKey}`
        }
    }
    const response = await fetch(endpoint, fetchOptions)
    let data = await response.json()
    return data
}

const devolution = async (id) => {
    const apiKey = import.meta.env.VITE_AUTH_TOKEN
    const endpoint = `http://127.0.0.1:8000/ecommerce/buy-item/${id}`
    const fetchOptions = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            Authorization: `Token ${apiKey}`
        }
    }
    const response = await fetch(endpoint, fetchOptions)
    let data = await response.json()
    return data
}

export { fetchData, fetchUser, addItemCart, removeItemCart, buyItem, devolution }