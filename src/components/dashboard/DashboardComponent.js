import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  CircularProgress,
} from "@mui/material";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiCash, GiExpense } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import { SERVER_URL } from "@/config";
import Users from "@/pages/users";

const DashboardComponent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/dashboard/stats`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("❌ Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <CircularProgress />;

  if (!stats) return <Typography>Error loading data.</Typography>;

  return (
    <Box p={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: 2,
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom style={{color: "#787676ff"}}>
          Admin Dashboard
        </Typography>

        <Button
          component={Link}
          href="/new-member"
          variant="contained"
          sx={{
            borderRadius: 5,
            p: 1,
            width: "200px",
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          <CiCirclePlus size={34} style={{ marginRight: 12 }} />
          Add Member
        </Button>
        <Button
          component={Link}
          href="/contribute"
          variant="contained"
          sx={{
            borderRadius: 5,
            p: 1,
            width: "200px",
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          <CiCirclePlus size={34} style={{ marginRight: 12 }} />
          Contribute
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
            <Typography variant="h5">
              <FaPeopleGroup style={{ color: "#1976d2", marginRight: 8 }} />
              Active Members
            </Typography>
            <Typography variant="h4">{stats.totalMembers}</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
            <Typography variant="h5">
              <GiCash style={{ color: "#fc6005ff", marginRight: 8 }} />
              Total Contributions
            </Typography>
            <Typography variant="h4">${stats.totalContributions}</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
            <Typography variant="h5">
              <GiExpense style={{ color: "#ec4fa6ff", marginRight: 8 }} />
              Total Expenses
            </Typography>
            <Typography variant="h4">${stats.totalExpenses}</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ p: 2, borderRadius: 4 }}>
            <Typography variant="h5">
              <MdAccountBalance style={{ color: "#2610e7ff", marginRight: 8 }} />
              Balance
            </Typography>
            <Typography variant="h4">${stats.balance}</Typography>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{mt: 8}}>
        <Users />
      </Box>
    </Box>
  );
};

export default DashboardComponent;
