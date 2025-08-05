import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { SERVER_URL } from "@/config";
import TopAppBar from "./Topbar";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

function CashCollectionForm() {
  const [formData, setFormData] = useState({
    phoneNumber: "", // optional
    firstName: "",
    lastName: "",
    memberNumber: "",
    amount: "",
    month: "",
    year: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameBlur = async () => {
    const { firstName, lastName } = formData;

    if (!firstName && !lastName) return;

    try {
      const query = new URLSearchParams();
      if (firstName) query.append("firstName", firstName);
      if (lastName) query.append("lastName", lastName);

      const res = await fetch(`${backendUrl}/api/by-name?${query.toString()}`);
      const data = await res.json();

      if (res.ok) {
        if (data.length === 1) {
          const member = data[0]; // Assuming it's the matched user object

          setFormData((prev) => ({
            ...prev,
            firstName: member.firstName || prev.firstName,
            lastName: member.lastName || prev.lastName,
            memberNumber: member.memberNumber || "",
            phoneNumber: member.phoneNumber || "",
          }));
        } else if (data.length > 1) {
          alert("Multiple users found. Please refine your name input.");
          console.table(data); // For developer visibility
        } else {
          alert("No user found with the given name.");
        }
      } else {
        alert(data.error || "User not found.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch user data.");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await fetch(`${backendUrl}/api/contributions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.error}`);
      } else {
        alert("Submission successful!");
        setFormData({
          phoneNumber: "",
          firstName: "",
          lastName: "",
          memberNumber: "",
          amount: "",
          month: "",
          year: ""
        });
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An unexpected error occurred.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Box sx={{ maxWidth: 400, margin: "auto", padding: 2, mt: 10 }}>
        <Typography variant="h4" gutterBottom sx={{ mt: 8 }}>
          Cash Collection Form
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Please fill in the details below:
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <TopAppBar />
      </Box>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Grid container direction="column" spacing={2} sx={{ width: "100%", maxWidth: "50%", mt: 2 }}>


            <Grid item xs={12}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleNameBlur}
                fullWidth
                required
              />
            </Grid>
            <Grid>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleNameBlur}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                // onBlur={handlePhoneBlur}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Member No"
                name="memberNumber"
                value={formData.memberNumber}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                fullWidth
                required
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                fullWidth
                required
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}

export default CashCollectionForm;
