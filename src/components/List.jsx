import { useEffect, useState } from "react"
import { fetchData, addItemCart } from "../helpers/helpers"
import { Button, CardMedia, Grid, Typography, Divider, Stack, Chip, Box, Card, CircularProgress, Fade, Skeleton, FormControlLabel, FormControl, InputLabel, Select, MenuItem, TextField, RadioGroup, Radio, FormLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSnackbar } from 'notistack';

export const List = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [loadingMap, setLoadingMap] = useState({});
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadingTwo, setLoadingTwo] = useState(false)
    const [buttonDelete, setButtonDelete] = useState(true)
    const [buttonActive, setButtonActive] = useState(false)
    const [buttonMap, setButtonMap] = useState({})
    const [categories, setCategories] = useState([])
    const [reload, setReload] = useState(false)
    const [dialogState, setDialogState] = useState(false)

    // filterset fields
    const [name, setName] = useState('')
    const [minPrice, setMinPrice] = useState(99)
    const [maxPrice, setMaxPrice] = useState(2001)
    const [minStock, setMinStock] = useState(0)
    const [maxStock, setMaxStock] = useState(31)
    const [categoriesIn, setCategoriesIn] = useState([])
    const [priceOrdering, setPriceOrdering] = useState('')
    const [stockOrdering, setStockOrdering] = useState('')
    const [orderingEndpoint, setOrderingEndpoint] = useState('')
    const [priorityParam, setPriorityParam] = useState('')

    const dataEndpoint = `gallery-filters?page=${page}&ordering=${orderingEndpoint}&categories__in=${categoriesIn}&price_min=${minPrice}&price_max=${maxPrice}&name=${name}&stock_min=${minStock}&stock_max=${maxStock}`

    const handleSubmit = (event) => {
        event.preventDefault()

        if(priorityParam == 'price') setOrderingEndpoint(`${priceOrdering},${stockOrdering}`)
        else if (priorityParam == 'stock') setOrderingEndpoint(`${stockOrdering},${priceOrdering}`)
        else setOrderingEndpoint(priceOrdering || stockOrdering)

        setPage(1)
        setLoading(true)
        setReload(true)
    }

    const addItemHandler = async (e, id, name) => {
        e.preventDefault()
        setLoadingMap(prev => ({ ...prev, [id]: true }));
        const response = await addItemCart(id)
        const stockContainer = e.target.closest('.MuiCard-root').children[1].children[2].children[0]
        stockContainer.innerText = response['stock_gallery'] ? `Stock - ${response['stock_gallery']}` : 'Sol out'
        setButtonMap(prevMap => ({...prevMap, [id]: response['stock_gallery'] ? false : true }))
        setLoadingMap(prev => ({ ...prev, [id]: false }));
        enqueueSnackbar(`${name} added to shopping cart`, {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            }
        })
    }

    const deleteItems = () => {
        setReload(true)
        setLoadingTwo(true)
        setData((prevData) => prevData.slice(0,-12))
        setPage((prevPage) => prevPage-1)
        if(page == 4) setButtonActive(false)
    }

    const handleClickLoading = () => {
        setReload(true)
        setLoading(true)
        if(page == 1) setButtonDelete(false)
        setPage(prevPage => prevPage+1)
    }

    const handleOpenDialog = () => {
        setDialogState(true)
    }

    const handleCloseDialog = () => {
        setDialogState(false)
    }

    const loadCategories = async () => {
        const categoryList = await fetchData('categories')
        setCategories(categoryList)
    }

    const loadData = async () => {
        try{
            const response = await fetchData(dataEndpoint)
            if(page == 1) setData([])
            if('results' in response){
                setData((prevData) => {
                    const ids = new Set(prevData.map(x => x.id))
                    return [...prevData, ...response?.results.filter(x => !ids.has(x.id))]
                })
                if(response?.next == null) {
                    setButtonActive(true)
                    setLoading(false)
                    setButtonDelete(false)
                }
                else if(loading){
                    setLoading(false)
                }
                if(response?.previous == null) {
                    setButtonDelete(true)
                }
                if(loadingTwo){
                    setLoadingTwo(false)
                }
            }
            else{
                handleOpenDialog()
            }
            setLoading(false)
        } 
        catch(e){
            console.error(e)
        }finally{
            setReload(false)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])
    
    useEffect(() => {
        loadData()
    }, [reload])

    return <>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
            }}
        >
            <TextField
                label="product name"
                type="text"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                sx={{
                    width: 400
                }}
            />

            <TextField
                label="min price"
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value === '' ? 0 : Number(e.target.value))}
            />

            <TextField
                label="max price"
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value === '' ? 0 : Number(e.target.value))}
            />

            <TextField
                label="min stock"
                type="number"
                value={minStock}
                onChange={e => setMinStock(e.target.value === '' ? 0 : Number(e.target.value))}
            />

            <TextField
                label="max stock"
                type="number"
                value={maxStock}
                onChange={e => setMaxStock(e.target.value === '' ? 31 : Number(e.target.value))}
            />

            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="multiple-category">Multiple category</InputLabel>
                <Select
                    labelId="multiple-category"
                    label="multiple category selector"
                    id="multiselect category"
                    value={categoriesIn}
                    multiple
                    onChange={e => setCategoriesIn(e.target.value)}
                >
                    {Array.isArray(categories) &&
                    categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                        {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>ascendent/descendant price</FormLabel>
                <RadioGroup
                    value={priceOrdering}
                    onChange={e => setPriceOrdering(e.target.value)}
                >
                    <FormControlLabel value="price" control={<Radio/>} label="price" />
                    <FormControlLabel value="-price" control={<Radio/>} label="-price" />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>ascendent/descendant stock</FormLabel>
                <RadioGroup
                    value={stockOrdering}
                    onChange={e => setStockOrdering(e.target.value)}
                >
                    <FormControlLabel value="stock" control={<Radio/>} label="stock" />
                    <FormControlLabel value="-stock" control={<Radio/>} label="-stock" />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Priority ordering parameters</FormLabel>
                <RadioGroup
                    value={priorityParam}
                    defaultValue="price"
                    onChange={e => setPriorityParam(e.target.value)}
                >
                    <FormControlLabel value="price" control={<Radio/>} label="Price" />
                    <FormControlLabel value="stock" control={<Radio/>} label="Stock" />
                </RadioGroup>
            </FormControl>

            <Button
                type="submit"
                variant="outlined"
            >
                submit action
            </Button>
        </Box>
        <Grid
            container
            rowSpacing={2}
        >
            <Dialog
                open={dialogState}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title">
                    Failed request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Local server is not running
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Ok</Button>
                </DialogActions>
            </Dialog>
            {(loading ? Array.from(new Array(6)) : data).map((product, index) => (
                <Grid
                    size={4}
                    key={index}
                >
                    <Card
                        variant="outlined"
                        sx={{ maxWidth: 360 }}
                    >
                        {product ? (<CardMedia
                            sx={{ height: 250 }}
                            image={product.image.replace('https://res.cloudinary.com/de1slf4r1/image/upload/v1/media/','')}
                            title={product.name}
                        />) : (
                            <Skeleton
                                variant="rectangular"
                                height={250}
                                width={360}
                            />
                        )}
                        {product ? ( <Box sx={{ p: 2 }}>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 1 }}
                                >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name.slice(0, 30)+'...'}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" width={140}>
                                        $ {Number(product.price).toLocaleString('en-US')}
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        minHeight: 85
                                    }}
                                >
                                    {product.description.slice(0,150)+'...'}
                                </Typography>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: 'space-between', alignItems: 'center'}}
                                > 
                                    <Typography variant="body1" sx={{ fontSize: 20 }}>
                                        {product.stock == 0 ? 'Sold out' : `Stock - ${product.stock}`}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: 20 }}>
                                        primary key - {product.id}
                                    </Typography>
                                </Stack>
                            </Box>) : (
                            <Box sx={{p:2}}>
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <Skeleton sx={{height: 90, width: "50%"}}/>
                                    <Skeleton sx={{height: 50, width: "45%"}}/>
                                </Stack>
                                <Skeleton sx={{height: 90}} />
                                <Stack
                                    direction="row"
                                    sx={{ justifyContent: 'space-between', alignItems: 'center'}}
                                >
                                    <Skeleton sx={{height: 60, width: "50%"}}/>
                                    <Skeleton sx={{height: 60, width: "45%"}}/>
                                </Stack>
                            </Box>
                        )}
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Typography gutterBottom variant="body1">
                                Category list
                            </Typography>
                            {product ? (<Stack direction="row" spacing={1} justifyContent="center">
                                {product.categories.map((category) => (
                                    <Chip color="primary" label={category.name.replace('.','')} size="small" key={category.id}/>
                            ))}
                            </Stack>) : (
                                <Stack direction="row" spacing={1}>
                                    <Skeleton/>
                                    <Skeleton/>
                                    <Skeleton/>
                                </Stack>
                            )}
                        </Box>
                        <Divider/>
                        <Box
                            sx={{
                                p: 2
                            }}
                        >
                            {product ? (<Button
                                variant='contained'
                                color='success'
                                onClick={e => addItemHandler(e, product.id, product.name)}
                                disabled={product.stock==0 || buttonMap[product.id]}
                            >
                                {loadingMap[product.id] ? 'On loading' : 'Add to shopping cart'}
                            </Button>):(
                                <Skeleton variant="rectangular" height={40} width={140} />
                            )}
                        </Box>
                    </Card>
                </Grid>    
            ))}
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Box sx={{ height: 40 }}>
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress aria-label="Loading…" />
                </Fade>
            </Box>
            <Button onClick={handleClickLoading} sx={{ m: 2 }} disabled={buttonActive}>
                {loading ? 'Stop loading' : 'Add items'}
            </Button>
            <Box sx={{ height: 40 }}>
                <Fade
                    in={loadingTwo}
                    style={{
                        transitionDelay: loadingTwo ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress aria-label="Loading…" />
                </Fade>
            </Box>
            <Button onClick={deleteItems} sx={{ m: 2 }} disabled={buttonDelete}>
                {loadingTwo ? 'Stop loading' : 'Remove items'}
            </Button>
        </Box>
    </>
}
