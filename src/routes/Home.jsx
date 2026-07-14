import { Card, CardContent, Typography, Grid, Box, IconButton, List, ListItem, ListItemButton, ListItemText, CardMedia } from "@mui/material"
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {

    const items = [
      {
        title: "REST Framework",
        description: "Backend Developer with one year of professional experience building scalable APIs using Django REST Framework. I develop fully customizable backend solutions for frontend clients, implementing complex business logic for advanced filtering, updating, deleting, and creating data (CRUD operations). Experienced in bulk data generation for testing environments, large Excel data processing using openpyxl (including structured tables), and data analysis with matplotlib for trend visualization. I have integrated external APIs such as INEGI, Rest Countries, and Contalink into internal systems, as well as worked with external databases like Firebase using custom-built Python string-based commands",
        image: "/img/django_rest_framework.png",
        skills: ['Excel report generation, matplotlib analysis', 'Full class-based CRUD operations', 'Custom logic views built from scratch', 'APIs for specific external servers', 'Command handling for external databases', 'Integration with external database services']
      },
      {
        title: "Django",
        description: "I have strong technical expertise using Django to develop dynamic HTML templates that interact directly with local and external databases. I seamlessly integrate these templates with Bootstrap and JavaScript to deliver an enhanced user experience, implementing efficient data filtering, creation, updating, and deletion operations. I am proficient in class-based views for CRUD operations, as well as in designing highly customized views with specific business logic to address complex data interaction requirements across different interfaces",
        image: "/img/Django_Logo.png",
        skills: ['Seamless integration of templates with Bootstrap and JavaScript to enhance user experience', 'Proficiency in class-based views for structured and maintainable CRUD operations', 'Development of custom views with specific business logic to solve complex data interaction requirements across multiple interfaces']
      },
      {
        title: "Bootstrap",
        description: "Frontend interface designer using Bootstrap for rapid web development. Skilled in combining Bootstrap components with JavaScript to build responsive and backend-connected interfaces from scratch. Strong knowledge of core Bootstrap components and layout systems",
        image: "/img/bootstrap.png",
        skills: ['Responsive by default', 'Fast development', 'Consistent design', 'Easy to customize', 'Large component library', 'Strong community support', 'Cross-browser compatibility', 'Ideal for prototypes', 'Integrates well with other frameworks', 'Mobile-first approach']
      },
      {
        title: "JavaScript",
        description: "Junior-level JavaScript developer experienced in API consumption, dynamic template creation using string-based rendering, and building basic simulators. Familiar with libraries such as SweetAlert and Toastify for user interaction and notifications. Primarily focused on integration with Django REST Framework backends",
        image: "/img/javascript.png",
        skills: ['Intermediate knowledge of JavaScript', 'DOM manipulation and dynamic UI development', 'REST API integration and asynchronous data handling', 'Responsive design with Bootstrap and modern CSS', 'CRUD application development and frontend-backend integration', 'State management, routing, and form validation', 'Debugging, code optimization, and reusable component design']
      },
      {
        title: "React",
        description: "Experience in React development, including building reusable components, managing state with hooks, handling component communication, and consuming APIs. Knowledge of routing, performance optimization, form handling, and the use of modern tools for structuring, styling, and deploying applications",
        image: "/img/React.jpg",
        skills: ['Foundation for building modular and reusable interfaces with clear separation of concerns', 'Handles dynamic data, side effects, and complex logic in a structured way', 'Enables efficient UI updates based on state and data lists', 'Organizes data flow across components while reducing unnecessary dependencies', 'Improves performance, logic reuse, and fine control over application behavior']
      },
      {
        title: "Material UI",
        description: "Able to build responsive React interfaces using Material UI components, customize themes and layouts, work with the documentation, and create reusable, accessible UI elements following Material Design principles",
        image: "/img/React_UI.jpg",
        skills: ['Ability to build responsive React interfaces using Material UI components', 'Ability to customize themes and layouts', 'Ability to work with the documentation', 'Ability to create reusable, accessible UI elements following Material Design principles']
      }
    ]

    const projects = [
      {
        title: "Ecommerce",
        description: "The most comprehensive project so far, involving a frontend client builtwith Bootstrap as well as several features that interact with a backend server to handle all the CRUD requests. Additionally, it includes an Excel report with graphical data analysis and large datasets grouped into formatted tables",
        image: "/img/ecommerce_CRUD.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
      {
        title: "Consume external server",
        description: "In this project, I built a complete API from scratch using Django Rest Framework to consume the external REST Countries service and extract metadata about all the countries in the world. The project includes data analysis, export to Excel reports with professional table designs, basic CRUD operations, and customized views.",
        image: "/img/rest__countries.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
      {
        title: "Bootstrap project",
        description: "My most relevant project as a beginner Bootstrap interface designer, fully focused on mastering responsive layouts and creating user-friendly experiences while aiming to achieve the highest level of professional design possible.",
        image: "/img/EDteam.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
      {
        title: "Django",
        description: "A playlist focused on HTML interfaces built with the Django framework, demonstrating mastery of Python logic combined with proper data manipulation to create repetitive components and HTML structures with a very basic CSS design",
        image: "/img/django.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
      {
        title: "Django rest_framework",
        description: "A playlist focused on showcasing projects built with Django Rest Framework, highlighting the skills acquired after a full year of professional experience as a backend server developer, while openly presenting myself as an expert in the field and in the mastery of Django Rest Framework",
        image: "/img/django_rest_framework.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
      {
        title: "Shopping cart simulator",
        description: "This project showcases a fully functional e-commerce shopping cart simulator. It operates using its own locally stored data through localStorage, allowing the application to store, update, and manage the records associated with the current user's cart. The system displays relevant information such as personal details, available balance, items currently in the cart, purchased items, and the remaining amount required to complete purchases. The application was developed using JavaScript and Bootstrap.",
        image: "/img/shopping_cart.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
      {
        title: "shopping cart simulator (bootstrap & django)",
        description: "An eCommerce shopping cart simulation built with Django for backend management and template automation, while using JavaScript and Bootstrap on the frontend to deliver an interactive user experience.",
        image: "/img/django_bootstrap_shopping_cart.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
      {
        title: "shopping cart simulator (react material ui & django)",
        description: "In this video, I showcase a complete eCommerce shopping cart simulator built with React and Material UI on the frontend, and Django REST Framework on the backend. The demonstration covers product browsing, cart management, dynamic data retrieval through REST APIs, and the interaction between the client-side application and the server-side architecture. On the frontend, React and Material UI are used to create a responsive and modern user experience. On the backend, Django REST Framework handles business logic, API endpoints, data processing, and communication with the database.",
        image: "/img/ui_django_shoppping_cart.png",
        links: ['Demostrative video', 'Frontend repository', 'Backend repository', 'Online web']
      },
    ]

  return (
    <>
      {/* Profile section */}
      <Card sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                  <img
                      src="../img/myself.png"
                      alt="juan carlos"
                      style={{ width: "100%", borderRadius: "10px" }}
                  />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                  <Typography variant="h5" mb={3}>Juan Carlos Sánchez Martínez</Typography>
                  <Typography>Junior Full-Stack Developer with professional experience specializing in Django REST Framework and backend API development. During my time at Datagram, I collaborated on frontend tasks using React, Material UI, Axios, and JavaScript, integrating REST APIs and contributing to reusable UI components. Additionally, I have strengthened my frontend skills through personal projects and specialized training, achieving solid proficiency in JavaScript, Bootstrap, React, Material UI, and Django-based dynamic web applications.</Typography>
              </Grid>
          </Grid>
      </Card>
      {/* Technologies section */}
      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, xl: 3 }} my={3}>
            <Box
              sx={{
                perspective: "1000px",
                "&:hover .inner": {
                transform: "rotateY(180deg)",
                },
              }}
            >
              <Box
                className="inner"
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 500,
                  transition: "transform 0.6s",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* FRONT */}
                <Card
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    p: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                  />
                  <Typography variant="h5" my={2}>{item.title}</Typography>
                  <Typography variant="body1">{item.description.slice(0, 300)}...</Typography>
                </Card>
                {/* BACK */}
                <Card
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    p: 2,
                  }}
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <List>
                    {item.skills.map((skill, index) => (
                      <ListItem disablePadding key={index}>
                        <ListItemButton>
                          <ListItemText primary={skill} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Carousel */}
      <Carousel>
          {items.map((item, index) => (
            <Carousel.Item key={index}>
              <Card sx={{ p: 2, width: "80%", mx: "auto" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 4 }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        borderRadius: 10,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h5" mb={2}>{item.title}</Typography>
                    <Typography>{item.description.slice(0, 250)}...</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Carousel.Item>
          ))}
      </Carousel>
      {/* Projects */}
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }} my={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={project.image}
                alt={project.title}
                sx={{
                  pt: 1
                }}
              />
              <Typography variant="h5" my={2} ml={2}>{project.title}</Typography>
              <Typography variant="body1" mx={2}>{project.description.slice(0, 200)}...</Typography>
              <List>
                {project.links.map((skill, index) => (
                  <ListItem disablePadding key={index}>
                    <ListItemButton>
                      <ListItemText primary={skill} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}