import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { NavLink } from "react-router-dom"

export const NavListDrawer = ({ navLinks, setOpen }) => {
  return (
    <Box
      sx={{
        width: 250
      }}
    >
      <nav>
        <List>
          {
            navLinks.map(item => (
              <ListItem
                disablePadding
                key={item.title}
              >
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title}/>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </nav>
    </Box>
  )
}
