import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiCash, GiExpense } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import { SERVER_URL } from "@/config";
import Users from "@/pages/users";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const DashboardComponent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/dashboard/stats`);
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
    <Box p={{ xs: 2, sm: 4 }}>
      {/* Header & Action Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#787676ff", fontSize: {xs: "32px"}}}>
          Admin Dashboard
        </Typography>

        <Stack
          direction={{ xs: "row", sm: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            component={Link}
            href="/new-member"
            variant="contained"
            sx={{
              borderRadius: 5,
              px: { xs: 1.5, sm: 3 }, // Horizontal padding
              py: { xs: 0.5, sm: 1 }, // Vertical padding
              width: { xs: "50%", sm: "200px" },
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            <CiCirclePlus size={24} style={{ marginRight: 8 }} />
            Add Member
          </Button>
          <Button
            component={Link}
            href="/contribute"
            variant="contained"
            sx={{
              borderRadius: 5,
              px: { xs: 1.5, sm: 3 }, // Horizontal padding
              py: { xs: 0.5, sm: 1 }, // Vertical padding
              width: { xs: "50%", sm: "200px" },
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            <CiCirclePlus size={24} style={{ marginRight: 8 }} />
            Contribute
          </Button>
        </Stack>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {[
          {
            title: "Active Members",
            value: stats.totalMembers,
            icon: <FaPeopleGroup style={{ color: "#1976d2", fontSize: 28 }} />,
          },
          {
            title: "Total Contributions",
            value: `Kshs ${stats.totalContributions}`,
            icon: <GiCash style={{ color: "#fc6005ff", fontSize: 28 }} />,
          },
          {
            title: "Total Expenses",
            value: `Kshs ${stats.totalExpenses}`,
            icon: <GiExpense style={{ color: "#ec4fa6ff", fontSize: 28 }} />,
          },
          {
            title: "Current Balance",
            value: `Kshs ${stats.balance}`,
            icon: <MdAccountBalance style={{ color: "#2610e7ff", fontSize: 28 }} />,
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 4,
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Grid container spacing={1} >
                <Grid item sx={{}}>{item.icon}</Grid>
                <Grid item>
                  <Typography variant="h6" noWrap>
                    {item.title}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {item.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Users List Section */}
      <Box sx={{ mt: 8 }}>
        <Users />
      </Box>
    </Box>
  );
};

export default DashboardComponent;
