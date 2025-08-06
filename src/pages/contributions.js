import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
} from "@mui/material";
import { SERVER_URL } from "@/config";
import { useMediaQuery, useTheme } from "@mui/material"; // ← Add this at the top



const monthsList = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

const ContributionsPage = () => {

  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [filters, setFilters] = useState({
    year: currentYear,
    memberNumber: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.year) params.append("year", filters.year);
      if (filters.memberNumber) params.append("memberNumber", filters.memberNumber);

      const res = await fetch(`${backendUrl}/api/contributions?${params.toString()}`);
      const result = await res.json();

      if (res.ok) {
        let normalizedData = Array.isArray(result.data) ? result.data : [result.data];
        normalizedData = normalizedData.map((item) => {
          if (!item.monthly && item.amount !== undefined && item.firstName) {
            return {
              ...item,
              monthly: {}
            };
          }
          return item;
        });

        setContributions(normalizedData);
      }

    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContributions();
  }, [filters.year]);

  useEffect(() => {
    if (filters.memberNumber.trim() !== "") {
      const delayDebounce = setTimeout(() => {
        fetchContributions();
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [filters.memberNumber]);

  // Grouping contributions by member and month
  const grouped = {};
  contributions.forEach((contrib) => {
    const key = contrib.memberNumber;
    if (!grouped[key]) {
      grouped[key] = {
        name: `${contrib.firstName} ${contrib.lastName}`,
        memberNumber: contrib.memberNumber,
        monthly: {},
      };
    }

    for (const [month, amount] of Object.entries(contrib.monthly || {})) {
      grouped[key].monthly[month] = amount;
    }

    grouped[key].rowTotal = Object.values(grouped[key].monthly).reduce((sum, val) => sum + (Number(val) || 0), 0);
  });

  const contributorRows = Object.values(grouped);

  const monthTotals = monthsList.reduce((acc, month) => {
    acc[month] = contributorRows.reduce((sum, contributor) => {
      return sum + (Number(contributor.monthly[month]) || 0);
    }, 0);
    return acc;
  }, {});

  const totalRowSum = Object.values(monthTotals).reduce((sum, val) => sum + val, 0);

  const downloadCSV = () => {
    const headers = ["Name", "Member No", ...monthsList, "Total"];
    const rows = contributorRows.map((contributor) => [
      contributor.name,
      contributor.memberNumber,
      ...monthsList.map(month => contributor.monthly[month] || 0),
      contributor.rowTotal
    ]);
    rows.push([
      "Monthly Totals", "",
      ...monthsList.map(month => monthTotals[month]),
      totalRowSum
    ]);

    const csvContent = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contributions_${filters.year}.csv`;
    link.click();
  };


  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Box mb={3} sx={{ mt: 8 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ mt: 2 }}
        >
          {/* Heading */}
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h5"
              textAlign={{ xs: "center", sm: "left" }}
              fontWeight="bold"
            >
              Contributions - {filters.year}
            </Typography>
          </Grid>

          {/* Year Filter */}
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Year</InputLabel>
              <Select
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                label="Year"
              >
                {[...Array(10)].map((_, i) => {
                  const year = currentYear - i;
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          {/* Member Number Filter */}
          <Grid item xs={12} sm={3}>
            <TextField
              name="memberNumber"
              value={filters.memberNumber}
              onChange={handleFilterChange}
              label="Member #"
              fullWidth
              size="small"
            />
          </Grid>

          {/* Download Button */}
          <Grid item xs={12} sm={2}>
            <Box display="flex" justifyContent={{ xs: "center", sm: "flex-end" }}>
              <button
                onClick={downloadCSV}
                style={{
                  background: "#95a2b0ff",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Download CSV
              </button>
            </Box>
          </Grid>
        </Grid>


      </Box>

      {/* Table Section */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : contributorRows.length > 0 ? (
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ width: '100%', minWidth: isMobile ? 0 : 1000 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f7dabdff' }}>
                <TableCell sx={{ fontWeight: 'bold', position: 'sticky', top: 0, backgroundColor: '#f7dabdff', zIndex: 1 }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', position: 'sticky', top: 0, backgroundColor: '#f7dabdff', zIndex: 1 }}>
                  Member No
                </TableCell>

                {!isMobile && monthsList.map((month) => (
                  <TableCell
                    key={month}
                    sx={{ fontWeight: 'bold', position: 'sticky', top: 0, backgroundColor: '#f7dabdff', zIndex: 1 }}
                  >
                    {month}
                  </TableCell>
                ))}

                <TableCell sx={{ fontWeight: 'bold', position: 'sticky', top: 0, backgroundColor: '#f7dabdff', zIndex: 1 }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributorRows.map((contributor, i) => (
                <TableRow key={i}>
                  <TableCell>{contributor.name}</TableCell>
                  <TableCell>{contributor.memberNumber}</TableCell>

                  {!isMobile && monthsList.map((month) => (
                    <TableCell key={month}>
                      {contributor.monthly[month] || 0}
                    </TableCell>
                  ))}

                  <TableCell><strong>{contributor.rowTotal}</strong></TableCell>
                </TableRow>
              ))}

              {!isMobile && (
                <TableRow>
                  <TableCell colSpan={2}><strong>Monthly Totals</strong></TableCell>
                  {monthsList.map((month) => (
                    <TableCell key={month}><strong>{monthTotals[month]}</strong></TableCell>
                  ))}
                  <TableCell><strong>{totalRowSum}</strong></TableCell>
                </TableRow>
              )}

              {/* Show only total on mobile */}
              {isMobile && (
                <TableRow>
                  <TableCell colSpan={2}><strong>Total Contributions</strong></TableCell>
                  <TableCell colSpan={1}><strong>{totalRowSum}</strong></TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>

        </Box>

      ) : (
        <Typography textAlign="center" mt={3}>No contributions found.</Typography>
      )}
    </Box>

  );
};

export default ContributionsPage;
