import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Box,
  Autocomplete,
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
  const [nameOptions, setNameOptions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
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

  const searchTimeoutRef = useRef(null);

  const handleFirstNameInputChange = (event, newInputValue) => {
    setFormData((prev) => ({ ...prev, firstName: newInputValue }));

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (newInputValue.length < 2) {
      setNameOptions([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const res = await fetch(`${backendUrl}/api/by-name?firstName=${newInputValue}`);
        const data = await res.json();
        if (res.ok) {
          setNameOptions(data);
        } else {
          setNameOptions([]);
        }
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
        setNameOptions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 400); // debounce delay
  };


  const handleNameSelect = (event, selectedOption) => {
    setSelectedMember(selectedOption); // update selected member

    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        firstName: selectedOption.firstName || "",
        lastName: selectedOption.lastName || "",
        memberNumber: selectedOption.memberNumber || "",
        phoneNumber: selectedOption.phoneNumber || "",
      }));
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
        setSelectedMember(null); // Reset selected member

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
              <Autocomplete
                freeSolo={false}
                options={nameOptions}
                value={selectedMember}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : `${option.firstName} ${option.lastName} (${option.memberNumber})`
                }
                isOptionEqualToValue={(option, value) =>
                  option.memberNumber === value.memberNumber
                }
                onInputChange={handleFirstNameInputChange}
                onChange={handleNameSelect}
                loading={loadingSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Member"
                    fullWidth
                    required
                  />
                )}
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}

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
