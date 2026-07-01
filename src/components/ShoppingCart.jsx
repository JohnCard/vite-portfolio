import { fetchUser, removeItemCart, buyItem, devolution} from "../helpers/helpers";
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Divider, Card, CardHeader, CardMedia, CardContent, Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Stack, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useEffect, useState, Fragment, useRef } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ShoppingCart = () => {
    const [disabledMap, setDisabledMap] = useState({})
    const [loadingMap, setLoadingMap] = useState({})
    const [user, setUser] = useState(null)
    const [responseData, setResponseData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [tableRow, setTableRow] = useState(false)
    const [dialogState, setDialogState] = useState(false)
    const table = useRef(null)
    const userBalance = useRef(null)
    const tbody = table.current?.children[0].children[1]

    const removeItemCartAction = async (e, id, name) => {
        e.preventDefault()
        setLoadingMap(prevMap => ({ ...prevMap, [`remove_button_${id}`]: true }))
        const divContainer = e.target.closest('.MuiPaper-root').querySelector('h3').children[0].children[0].children[0]
        const spanStockContainer = divContainer.children[1]
        spanStockContainer.innerText = '...'
        const response = await removeItemCart(id)
        setResponseData(response)
        if('stock_cart' in response){
            spanStockContainer.innerText = `Currently in stock - ${response['stock_cart']}`
            setLoadingMap(prevMap => ({ ...prevMap, [`remove_button_${id}`]: false }))
        }else{
            divContainer.innerText = 'Removed item'
            setDisabledMap(prevMap => ({...prevMap, [`accordion_${id}`]: true}))
            setLoadingMap(prevMap => ({ ...prevMap, [`buy_button_${id}`]: true }))
        }
    }

    const buyItemAction = async (e, id, name) => {
        e.preventDefault()
        setLoadingMap(prevMap => ({ ...prevMap, [`buy_button_${id}`]: true }))
        userBalance.current.innerText = 'On loading...'
        const divContainer = e.target.closest('.MuiPaper-root').querySelector('h3').children[0].children[0].children[0]
        const spanStockContainer = divContainer.children[1]
        const coincidence = user.collection.some(item => item.id == id)
        const response = await buyItem(id)
        setResponseData(response)
        userBalance.current.innerText = `actually balance - ${Number(response['balance']).toLocaleString('en-US')}`
        //? some coincidence
        if(coincidence){
            const quantityContainer = tbody.querySelector(`[data-id="${id}"]`)
            quantityContainer.innerText = response['stock_collection']
        }else{
            setTableRow(true)
            setLoadingMap(prevMap => ({ ...prevMap, [`return_button_${id}`]: false }))
        }
        //? stock cart in response
        if('stock_cart' in response){
            spanStockContainer.innerText = `Currently in stock - ${response['stock_cart']}`
            setLoadingMap(prevMap => ({...prevMap, [`buy_button_${id}`]: false}))
        }else{
            //! not existent
            divContainer.innerText = 'Removed item'
            setLoadingMap(prevMap => ({...prevMap, [`remove_button_${id}`]: true}))
            setDisabledMap(prevMap => ({...prevMap, [`accordion_${id}`]: true}))
        }
    }

    const devolutionAction = async (e, id, name) => {
        e.preventDefault()
        userBalance.current.innerText = 'On loading...'
        setLoadingMap(prevMap => ({ ...prevMap, [`return_button_${id}`]: true }))
        const trContainer = e.target.closest('tr')
        const tdStock = trContainer.children[4]
        tdStock.innerText = 'on loading...'
        const response = await devolution(id)
        setResponseData(response)
        userBalance.current.innerText = `actually balance - ${Number(response['balance']).toLocaleString('en-US')}`
        //? stock collection in response
        if('stock_collection' in response){
            setLoadingMap(prevMap => ({ ...prevMap, [`return_button_${id}`]: false }))
            tdStock.innerText = response['stock_collection']
        }else{
            //! not existent
            tdStock.innerText = 'drained'
        }
    }

    const handleOpenDialog = () => {
        setDialogState(true)
    }

    const handleCloseDialog = () => {
        setDialogState(false)
    }

    const loadUser = async () => {
        try{
            const dataUser = await fetchUser()
            setUser(dataUser)
            setLoading(false)
            setTableRow(false)
        }catch(e){
            console.error(e)
            handleOpenDialog()
        }
    }

    useEffect(() => {
        loadUser()
    }, [responseData])

    return <Grid
        container
        rowSpacing={10}
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
        <Grid
            size={4}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={ loading ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (
                        <Avatar
                            src={user.image.replace('https://res.cloudinary.com/de1slf4r1/image/upload/v1/media/','')}
                            aria-label={user.name}
                        />
                    )}
                    title={loading ? (
                            <Skeleton
                                animation="wave"
                                width="80%"
                                style={{ marginBottom: 6, fontSize: '1rem' }}
                            />
                        ):(user.username)}
                    subheader={ loading ? (
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="40%"
                            style={{ marginBottom: 6 }}
                        />
                    ):(
                        user.created_at
                    )}
                />
                {loading ? (
                    <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
                ):(
                    <CardMedia
                        component="img"
                        height="300"
                        image={user.image.replace('https://res.cloudinary.com/de1slf4r1/image/upload/v1/media/','')}
                        alt={user.name}
                    />
                )}
                <CardContent>
                    {loading ? (
                        <Fragment>
                            <Skeleton variant="rounded" height={120} />
                            <Divider sx={{ my: 2 }} />
                            <Skeleton height={20} />
                        </Fragment>
                    ):(
                        <Fragment>
                            <Typography
                                variant="body1"
                            >
                                {user.description.slice(0, 200)+'...'}
                            </Typography>
                            <Divider
                                sx={{
                                    my: 2
                                }}
                            />
                            <Typography
                                fontWeight="bold"
                                component="p"
                                fontFamily="monospace"
                                ref={userBalance}
                            >
                                actually balance - $ {Number(user.balance).toLocaleString('en-US')}
                            </Typography>
                        </Fragment>
                    )}
                </CardContent>
            </Card>
        </Grid>
        <Grid
            size={8}
        >
            {loading ? (
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{
                        alignItems: "center"
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: "bold",
                            fontFamily: "monospace",
                            mb: 2
                        }}
                    >
                        Still loading data...
                    </Typography>
                    <CircularProgress size={40} aria-label="Loading…" />
                </Stack>
                ) : (
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "monospace",
                        mb: 2
                    }}
                >
                    Shopping cart list
                </Typography>
            )}
            {(loading ? Array.from(new Array(5)) : user.items).map((item, index) => (
                <Fragment
                    key={item ? item.id : index }
                >
                    {item ? (
                        <Accordion disabled={disabledMap[`accordion_${item.id}`]}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ marginInline: 4 }} />}
                                aria-controls="panel1-content"
                                id={item.id}
                            >
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    flexGrow={1}
                                >
                                    <Typography component="span" variant="body2">{item.name}</Typography>
                                    <Typography component="span" variant="body2">Currently in stock - {item.quantity}</Typography>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    fontFamily: "monospace"
                                }}
                            >
                                <Stack
                                    direction="column"
                                    spacing={2}
                                >
                                    <Typography component="span" variant="body2" >Primary key - {item.id}</Typography>
                                    <Typography component="span" variant="body2" >$ {Number(item.price).toLocaleString('en-US')}</Typography>
                                    <Typography component="span" variant="body2" >{item.categories.map(mapItem => mapItem.replace('.','')).join(', ')}</Typography>
                                    <Typography component="span" variant="body2" >{item.description}</Typography>
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                <Stack
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        variant='contained'
                                        onClick={e => removeItemCartAction(e, item.id, item.name)}
                                        disabled={loadingMap[`remove_button_${item.id}`] ? true : false }
                                    >
                                        {loadingMap[`remove_button_${item.id}`] ? 'removing...' : 'remove item' }
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={e => buyItemAction(e, item.id, item.name)}
                                        data-id={item.id}
                                        disabled={loadingMap[`buy_button_${item.id}`] ? true : false }
                                    >
                                        {loadingMap[`buy_button_${item.id}`] ? 'loading...' : 'buy item' }
                                    </Button>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    ):(
                        <Skeleton height={40} variant="rounded" animation="pulse" sx={{ my: .5 }}/>
                    )}
                </Fragment>
            ))}
        </Grid>
        <TableContainer component={Paper} ref={table}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">description</TableCell>
                        <TableCell align="right">price</TableCell>
                        <TableCell align="right">categories</TableCell>
                        <TableCell align="right">stock</TableCell>
                        <TableCell align="right">return button</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(loading ? Array.from(new Array(5)) : user.collection).map((item, index) => (
                        <TableRow
                            sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 } 
                            }}
                            key={item ? item.id : index}
                        >
                            <TableCell align="right">{item ? item.name : <Skeleton variant="rectangular" height={30} animation="pulse" />}</TableCell>
                            <TableCell align="right">{item ? item.description.slice(0, 100)+'...' : <Skeleton variant="rectangular" height={30} animation="pulse" />}</TableCell>
                            <TableCell width={40} align="right">{item ? `$ ${Number(item.price).toLocaleString('en-US')}` : <Skeleton variant="rectangular" height={30} animation="pulse" />}</TableCell>
                            <TableCell align="right" width={150}>{item ? (item.categories.map(mapItem => mapItem.replace('.',''))).join(', ') : <Skeleton variant="rectangular" height={30} animation="pulse" />}</TableCell>
                            <TableCell align="right" data-id={item ? item.id : index}>{item ? item.quantity : <Skeleton variant="rectangular" height={30} animation="pulse" />}</TableCell>
                            <TableCell align="right" width={125}>
                                {item ? (
                                    <Button
                                        variant='outlined'
                                        disabled={loadingMap[`return_button_${item.id}`] ? true : false }
                                        onClick={e => devolutionAction(e, item.id, item.name)}
                                    >
                                        {loadingMap[`return_button_${item.id}`] ? 'On return...' : 'Return item' }
                                    </Button>
                                ): (
                                    <Skeleton variant="rectangular" height={30} animation="pulse" />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    {tableRow && <TableRow
                        sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 } 
                        }}
                    >
                        <TableCell align="right"><Skeleton variant="rectangular" height={30} animation="pulse" /></TableCell>
                        <TableCell align="right"><Skeleton variant="rectangular" height={30} animation="pulse" /></TableCell>
                        <TableCell width={40} align="right"><Skeleton variant="rectangular" height={30} animation="pulse" /></TableCell>
                        <TableCell align="right"><Skeleton variant="rectangular" height={30} animation="pulse" /></TableCell>
                        <TableCell align="right"><Skeleton variant="rectangular" height={30} animation="pulse" /></TableCell>
                        <TableCell align="right" width={125}><Skeleton variant="rectangular" height={30} animation="pulse" /></TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
}