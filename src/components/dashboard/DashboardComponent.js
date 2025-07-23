import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Card,
  Button,
} from "@mui/material";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { GiExpense } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";

const DashboardComponent = () => {
  const [stats, setStats] = useState({
    activeMembers: 0,
    totalContributions: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchDashboardData = async () => {
  //       try {
  //         const [statsRes, activityRes, eventsRes] = await Promise.all([
  //           fetch("/api/dashboard/stats").then(res => res.json()),
  //           fetch("/api/dashboard/recent-activities").then(res => res.json()),
  //           fetch("/api/dashboard/upcoming-events").then(res => res.json()),
  //         ]);
  //         setStats(statsRes);
  //         setRecentActivities(activityRes);
  //         setUpcomingEvents(eventsRes);
  //       } catch (error) {
  //         console.error("Failed to fetch dashboard data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchDashboardData();
  //   }, []);

  //   if (loading) return <CircularProgress />;

  return (
    <Box p={4} >

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          p: 2,
          mt: 8

        }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box >
            <Button component={Link} href="/new-member" variant="contained"
              sx={{ borderRadius: 8, p: 2, width: '300px', textTransform: "none", fontSize: '1.5rem' }}>
              <CiCirclePlus size={34} style={{ marginRight: 12 }} />
              Add Member
            </Button>
          </Box>
        </Grid>
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ margin: '0 auto', mt: 4 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
              <Typography variant="h4">
                <FaPeopleGroup style={{ color: '#1976d2', marginRight: 8 }} /> Active Members
              </Typography>
              <Typography variant="h4">{stats.activeMembers}</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
              <Typography variant="h4">
                <GiCash style={{ color: '#fc6005ff', marginRight: 8 }} /> Total Contributions
              </Typography>
              <Typography variant="h4">${stats.totalContributions}</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
              <Typography variant="h4">
                <GiExpense style={{ color: '#ec4fa6ff', marginRight: 8 }} /> Total Expenses
              </Typography>
              <Typography variant="h4">${stats.totalExpenses}</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
              <Typography variant="h4">
                <MdAccountBalance style={{ color: '#2610e7ff', marginRight: 8 }} /> Balance
              </Typography>
              <Typography variant="h4">${stats.balance}</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>


      
    </Box>

  );
};

export default DashboardComponent;
