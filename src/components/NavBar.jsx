import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { Navigate, NavLink, Route, Routes } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { Home } from "../routes/Home"
import { ProductForm } from "./ProductForm"
import { List } from "./List"
import { NavListDrawer } from "./NavListDrawer"
import { ShoppingCart } from "./ShoppingCart"

export const NavBar = ({ navLinks }) => {
  const [open, setOpen] = useState(false)
  return (
        <>
            <AppBar
                position="static"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{
                            display: {
                                xs: "flex",
                                sm: "none"
                            }
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        News
                    </Typography>
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block"
                            }
                        }}
                    >
                        {navLinks.map((item) => (
                            <Button
                                color="inherit"
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
            >
                <NavListDrawer navLinks={navLinks} setOpen={setOpen} />
            </Drawer>

            <Container
                sx={{
                    mt: 5
                }}
            >
                <Routes>
                    <Route
                        path="/"
                        element={<Home/>}
                    />
                    <Route
                        path="/product-form"
                        element={<ProductForm/>}
                    />
                    <Route
                        path="/list"
                        element={<List/>}
                    />
                    <Route
                        path="/shopping-cart"
                        element={<ShoppingCart/>}
                    />
                    <Route
                        path="/*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Container>
        </>
    )
}