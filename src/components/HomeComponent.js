import React from 'react';
import {
    Box,
    Container,
    Typography,
} from '@mui/material';


const HomeComponent = () => {


    return (
        <Container sx={{ color: "#616161" }}>
            <Box mt={20}>
                <Typography variant="h2" gutterBottom style={{ fontWeight: "bold", color: "#00796b" }}>
                    Welcome to ChamaXpress &ndash; Your Group&rsquo;s Trusted Fund Management Platform
                </Typography>


                <Typography variant="h3" gutterBottom >
                    Empowering Transparency, Accountability, and Unity
                </Typography>
                <Typography variant='h4'>
                    Welcome to your group&apos;s central hub for secure fund collection, easy record-keeping, and real-time updates. Our platform is designed to help you manage your contributions, track member payments, and generate accurate reports — all in one place.
                </Typography>
                <Typography variant='h4'>
                    <ul>
                        <li>
                            Track Contributions
                        </li>
                        <li>
                            Monitor Balances
                        </li>
                        <li>
                            Access Reports Anytime
                        </li>
                        <li>
                            Foster Financial Transparency
                        </li>
                    </ul>
                </Typography>
                <Typography variant='h4'>
                    Whether you&apos;re collecting monthly dues, fundraising for a cause, or managing welfare contributions — ChamaXpress is here to make every shilling count.

                    <span style={{ fontStyle: 'italic' }}>&apos;Together, we grow stronger.&apos;</span>
                </Typography>
            </Box>
        </Container>
    );
};

export default HomeComponent;
