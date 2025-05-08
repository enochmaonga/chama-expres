import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
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

function CashCollectionForm() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    month: "",
    year: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await fetch(`${SERVER_URL}/post`, {
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
        setFormData({ name: "", amount: "", month: "", year: "" });
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Box sx={{ maxWidth: 400, margin: "auto", padding: 2, mt: 10 }}>
          <Typography variant="h5" component="div" gutterBottom>
            Cash Collection Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please fill in the details below:
          </Typography>
       
      </Box>

    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    padding: 2, // Optional: adds padding inside the box

  }}
>
  <TopAppBar />
</Box>
      <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container direction="column" spacing={2} sx={{ width: "100%", maxWidth: 400, mt: 2 }}>
              <Grid item xs={12} >
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
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
