import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

const apiKey = import.meta.env.VITE_AUTH_TOKEN
const categoryEndpoint = 'http://127.0.0.1:8000/ecommerce/categories'
const fetchOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Token ${apiKey}`
    }
}

export const ProductForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(500)
    const [image, setImage] = useState(null)
    const [stock, setStock] = useState(12)
    const [firstCategory, setFirstCategory] = useState('')
    const [secondCategory, setSecondCategory] = useState('')
    const [thirdCategory, setThirdCategory] = useState('')
    const [categories, setCategories] = useState([])

    const loadCategories = async () => {
        try{
            const response = await fetch(categoryEndpoint, fetchOptions)
            const data = await response.json()
            const list = Array.isArray(data) ? data : data?.results ?? []
            setCategories(list)
        }catch(error){
            console.log(`Something went wrong - ${error}`)
        }
    }

    const [error, setError] = useState({
        error: false,
        message: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        // Para subir archivos con Django/DRF: usa multipart/form-data con FormData
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('stock', stock)
        if (image) formData.append('image', image)

        // ManyToMany: enviamos IDs de categorías
        const categoryIds = [firstCategory, secondCategory, thirdCategory]
            .filter(Boolean)
            .map(Number)

        categoryIds.forEach((id) => {
            // DRF suele aceptar listas cuando se envían con la misma key repetida
            formData.append('categories', id)
        })

        fetch('http://127.0.0.1:8000/ecommerce/gallery-create', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${apiKey}`
            },
            body: formData
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text()
                    throw new Error(text || `HTTP ${res.status}`)
                }
                console.log({ ok: true, message: 'success' })
            })
            .catch((error) =>
                console.error({ ok: false, message: error })
            )
    }

    useEffect(() => {

        loadCategories()

    }, [])

    return (
        <>
            <Typography
                component="h1"
                variant="h3"
                sx={{
                    fontWeight: 'bold'
                }}
                color="primary"
            >
                Product form
            </Typography>
            <Box
                component="form"
                marginTop={2}
                onSubmit={handleSubmit}
            >
                <TextField
                    id="name"
                    label="product name"
                    type="text"
                    variant="outlined"
                    value={name}
                    name="name"
                    required
                    error={error.error}
                    helperText={error.message}
                    onChange={e => setName(e.target.value)}
                    sx={{
                        width: 400
                    }}
                />
                <TextField
                    id="description"
                    label="description"
                    type="text"
                    variant="outlined"
                    value={description}
                    name="description"
                    required
                    error={error.error}
                    helperText={error.message}
                    onChange={e => setDescription(e.target.value)}
                    sx={{
                        ml: 3,
                        width: 400
                    }}
                />
                <TextField
                    label="Price"
                    type="number"
                    variant="outlined"
                    value={price}
                    onChange={e => setPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                    sx={{ ml: 3, width: 200 }}
                />
                <TextField
                    id="image"
                    type="file"
                    variant="filled"
                    name="image"
                    required
                    error={error.error}
                    helperText={error.message}
                    onChange={e => setImage(e.target.files?.[0])}
                    sx={{
                        mt: 2,
                        width: 400
                    }}
                />
                <FormControl required sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="category-1">First category</InputLabel>
                    <Select
                        labelId="category-1"
                        id="first-category"
                        value={firstCategory}
                        label="First category"
                        onChange={e => setFirstCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem
                                value={category.id}
                                key={category.id}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="category-2">Second category</InputLabel>
                    <Select
                        labelId="category-2"
                        id="second-category"
                        label="Second category"
                        value={secondCategory}
                        onChange={e => setSecondCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem
                                value={category.id}
                                key={category.id}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="category-3">Third category</InputLabel>
                    <Select
                        labelId="category-3"
                        id="third-category"
                        label="Third category"
                        value={thirdCategory}
                        onChange={e => setThirdCategory(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem
                                value={category.id}
                                key={category.id}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Item stock"
                    type="number"
                    variant="outlined"
                    value={stock}
                    onChange={e => setStock(e.target.value === '' ? 0 : Number(e.target.value))}
                    sx={{ mt: 2, width: 200 }}
                />
                <Button
                    type="submit"
                    variant="outlined"
                >
                    Register to me
                </Button>
            </Box>
        </>
    )
}