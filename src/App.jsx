import { NavBar } from "./components/NavBar"
import { Home, DynamicForm, List, ShoppingCart } from "@mui/icons-material"

const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: <Home/>
  },
  {
    title: "Product form",
    path: "/product-form",
    icon: <DynamicForm/>
  },
  {
    title: 'List',
    path: '/list',
    icon: <List/>
  },
  {
    title: 'Shopping cart',
    path: '/shopping-cart',
    icon: <ShoppingCart/>

  }
]

function App() {

  return (
    <>
      <NavBar
        navLinks={navLinks}
      />
    </>
  )
}

export default App
