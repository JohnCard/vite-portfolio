import { useState } from "react"

export const productForm = (initialForm={}, setError) => {
    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({target}) => {
        const {name, value} = target

        setFormState({
            ...formState,
            [name]: value
        })
    }

    return {
        ...formState,
        formState,
        onInputChange
    }
}