import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MemberCont = () => {
  const [members, setMembers] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]);

  const [selectedMember, setSelectedMember] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch filter options
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [memberRes, yearRes] = await Promise.all([
//           fetch("/api/members").then((res) => res.json()),
//           fetch("/api/years").then((res) => res.json()),
//         ]);
//         setMembers(memberRes);
//         setYears(yearRes);
//       } catch (error) {
//         console.error("Failed to fetch filters:", error);
//       }
//     };
//     fetchFilters();
//   }, []);

//   // Fetch contributions
//   useEffect(() => {
//     const fetchContributions = async () => {
//       if (selectedMember && selectedYear && selectedMonth) {
//         setLoading(true);
//         try {
//           const params = new URLSearchParams({
//             memberId: selectedMember,
//             year: selectedYear,
//             month: selectedMonth,
//           });
//           const res = await fetch(`/api/contributions?${params.toString()}`);
//           const data = await res.json();
//           setContributions(data);
//         } catch (error) {
//           console.error("Failed to fetch contributions:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchContributions();
//   }, [selectedMember, selectedYear, selectedMonth]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Contributions Page
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <FormControl fullWidth>
          <InputLabel>Member</InputLabel>
          <Select
            value={selectedMember}
            label="Member"
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            {members.map((m) => (
              <MenuItem key={m._id} value={m._id}>
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributions.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.month}</TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell>${c.amount}</TableCell>
                  <TableCell>${c.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default MemberCont;
