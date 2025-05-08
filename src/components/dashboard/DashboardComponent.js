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
} from "@mui/material";

const DashboardComponent = () => {
  const [stats, setStats] = useState({
    activeMembers: 0,
    totalContributions: 0,
    balance: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
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
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

<Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6">Active Members</Typography>
      <Typography variant="h4">{stats.activeMembers}</Typography>
    </Paper>
  </Grid>

  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6">Total Contributions</Typography>
      <Typography variant="h4">${stats.totalContributions}</Typography>
    </Paper>
  </Grid>

  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6">Balance</Typography>
      <Typography variant="h4">${stats.balance}</Typography>
    </Paper>
  </Grid>
</Grid>

    <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Recent Activities</Typography>
            <List dense>
              {recentActivities.map((activity, i) => (
                <ListItem key={i}>
                  <ListItemText primary={activity.description} secondary={activity.date} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Upcoming Events</Typography>
            <List dense>
              {upcomingEvents.map((event, i) => (
                <ListItem key={i}>
                  <ListItemText primary={event.name} secondary={event.date} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardComponent;
