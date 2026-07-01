import { Card, Typography, Grid, Box } from "@mui/material"
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {
    return (
        <>
            <Card sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <img
                            src="../../img/myself.png"
                            alt="juan carlos"
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h5" mb={3}>
                            Juan Carlos Sánchez Martínez
                        </Typography>

                        <Typography>Junior Full-Stack Developer with professional experience specializing in Django REST Framework and backend API development. During my time at Datagram, I collaborated on frontend tasks using React, Material UI, Axios, and JavaScript, integrating REST APIs and contributing to reusable UI components. Additionally, I have strengthened my frontend skills through personal projects and specialized training, achieving solid proficiency in JavaScript, Bootstrap, React, Material UI, and Django-based dynamic web applications.
                        </Typography>
                    </Grid>
                </Grid>
            </Card>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
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
                                <img
                                    src="/img/genio.webp"
                                    alt="django"
                                    style={{ width: "100%" }}
                                />

                                <Typography variant="h5">
                                    Django REST Framework
                                </Typography>

                                <Typography variant="body2">
                                    Backend Developer...
                                </Typography>
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
                                <Typography variant="h6">
                                    Backend services
                                </Typography>

                                <ul>
                                    <li>Excel report generation</li>
                                    <li>CRUD operations</li>
                                    <li>Custom logic views</li>
                                </ul>
                            </Card>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Carousel>
                <Carousel.Item>
                    <img
                        src="../../img/genio.webp"
                        alt="juan carlos"
                        style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="../../img/genio.webp"
                        alt="juan carlos"
                        style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}