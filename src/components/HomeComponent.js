import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid
} from '@mui/material';

const HomeComponent = () => {
    return (
        <Container sx={{ color: "#616161" }}>
            <Box mt={{ xs: 8, md: 20 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                mt:12,
                                fontWeight: "bold",
                                color: "#00796b",
                                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }
                            }}
                        >
                            Welcome to ChamaXpress: Your Group&apos;s Trusted Fund Management Platform
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                        >
                            Empowering Transparency, Accountability, and Unity
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            variant='h5'
                            sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                        >
                            Welcome to your group&apos;s central hub for secure fund collection, easy record-keeping, and real-time updates. Our platform is designed to help you manage your contributions, track member payments, and generate accurate reports — all in one place.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box component="ul" sx={{ pl: 3 }}>
                            <Typography variant='h5' component="li" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                                Track Contributions
                            </Typography>
                            <Typography variant='h5' component="li" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                                Monitor Balances
                            </Typography>
                            <Typography variant='h5' component="li" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                                Access Reports Anytime
                            </Typography>
                            <Typography variant='h5' component="li" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                                Foster Financial Transparency
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            variant='h5'
                            sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                        >
                            Whether you are collecting monthly dues, fundraising for a cause, or managing welfare contributions — ChamaXpress is here to make every shilling count.
                            <br />
                            <span style={{ fontStyle: "italic" }}>
                               {"'Together, we grow stronger.'"}
                            </span>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default HomeComponent;
