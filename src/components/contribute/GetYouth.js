/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
  Button,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SERVER_URL } from "@/config";
// import MiniAppBar from "../MiniAppbar";
import Link from "next/link";

const YouthDatabase = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Filter states
  const [homeChurchFilter, setHomeChurchFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [baptizedFilter, setBaptizedFilter] = useState("");

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch users data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`${SERVER_URL}/getmembers`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        console.log("SERVER_URL:", SERVER_URL);
        if (response.status === 200) {
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            setUsers(responseData);
            setFilteredUsers(responseData); // Initialize filtered users
          } else {
            console.error(
              "Data from the server is not an array:",
              responseData
            );
          }
          console.log("Data", responseData);
        } else {
          console.error("Server error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  // Handle filtering
  useEffect(() => {
    let filtered = users;

    if (homeChurchFilter) {
      filtered = filtered.filter((user) =>
        user.homechurch.toLowerCase().includes(homeChurchFilter.toLowerCase())
      );
    }

    if (genderFilter) {
      filtered = filtered.filter((user) => user.gender === genderFilter);
    }

    if (baptizedFilter) {
      filtered = filtered.filter(
        (user) => user.baptizedSDA === (baptizedFilter === "Yes")
      );
    }

    setFilteredUsers(filtered);
    setPage(0); // Reset to first page when filters change
  }, [homeChurchFilter, genderFilter, baptizedFilter, users]);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Convert filtered users to CSV and trigger download
  const handleDownloadCSV = () => {
    const headers = [
      "First Name",
      "Middle Name",
      "Last Name",
      "Phone",
      "Email",
    ];

    const csvContent = [
      headers.join(","), // Add headers
      ...filteredUsers.map((user) =>
        [
          user.firstname,
          user.middlename,
          user.lastname,
          user.phone,
          user.email,
          user.submittedAt
            ? new Date(user.submittedAt).toLocaleDateString()
            : "N/A",
        ].join(",")
      ),
    ].join("\n");

    // Create a Blob and trigger a download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Pathfinder_Club_Data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: -4,
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            {/* Mini AppBar */}
            {/* <MiniAppBar /> */}
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              component={Link}
              href="/view-youthfeedback"
              onClick={handleMenuClose}
              sx={{ background: "linear-gradient(to left, #FFCC00, #2196F3)" }}
            >
              Feedback Report
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allow wrapping for mobile screens
          gap: 2,
          p: 2,
          justifyContent: { xs: "center", sm: "flex-start" }, // Center items on smaller screens
        }}
      >
     
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadCSV}
          sx={{
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            padding: { xs: "4px 8px", sm: "6px 16px" },
            minWidth: { xs: "80px", sm: "120px" },
            textTransform: "none",
            flex: "1 1 auto", // Allow dynamic resizing
            maxWidth: { xs: "100%", sm: "auto" },
          }}
        >
          Download CSV
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : filteredUsers.length > 0 ? (
          <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9e9e9e" }}>
                  <TableCell>
                    <strong>First Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Middle Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Last Name</strong>
                  </TableCell>
                 
                  <TableCell>
                    <strong>Phone Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                 
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <strong>Reg Date</strong>
                  </TableCell>
                  {/* <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <strong>Other Church</strong>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.firstname}</TableCell>
                      <TableCell>{user.middlename}</TableCell>
                      <TableCell>{user.lastname}</TableCell>
                     
                      <TableCell>{user.phone}</TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {user.email}
                      </TableCell>
                     
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {user.submittedAt
                          ? new Date(user.submittedAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <Typography>No users found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default YouthDatabase;
