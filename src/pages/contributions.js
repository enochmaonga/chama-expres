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
  Paper,
  CircularProgress,
  Grid,
  Card,
} from "@mui/material";
import { SERVER_URL } from "@/config";

const monthsList = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ContributionsPage = () => {

  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [filters, setFilters] = useState({
    year: currentYear,
    memberNumber: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.year) params.append("year", filters.year);
      if (filters.memberNumber) params.append("memberNumber", filters.memberNumber);

      const res = await fetch(`${SERVER_URL}/api/contributions?${params.toString()}`);
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

  return (
    <Box p={{ xs: 2, md: 4 }}>


      <Box mb={3} sx={{ mt: 8 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" textAlign={{ xs: "center", sm: "left" }}>
              Contributions - {currentYear}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent={{ xs: "center", sm: "flex-end" }}>
              <FormControl fullWidth sx={{ maxWidth: 200 }}>
                <InputLabel>
                  <Typography>
                    Year
                  </Typography>
                </InputLabel>
                <Select
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  label="Year"
                >
                  {[...Array(10)].map((_, i) => {
                    const year = currentYear - i;
                    return <MenuItem key={year} value={year}>{year}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : contributorRows.length > 0 ? (
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f7dabdff' }}> {/* Light gray background */}
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Member #</TableCell>
                {monthsList.map(month => (
                  <TableCell key={month} sx={{ fontWeight: 'bold' }}>
                    {month}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributorRows.map((contributor, i) => (
                <TableRow key={i}>
                  <TableCell>{contributor.name}</TableCell>
                  <TableCell>{contributor.memberNumber}</TableCell>
                  {monthsList.map(month => (
                    <TableCell key={month}>
                      {contributor.monthly[month] || 0}
                    </TableCell>
                  ))}
                  <TableCell><strong>{contributor.rowTotal}</strong></TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}><strong>Monthly Totals</strong></TableCell>
                {monthsList.map(month => (
                  <TableCell key={month}><strong>{monthTotals[month]}</strong></TableCell>
                ))}
                <TableCell><strong>{totalRowSum}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Typography textAlign="center" mt={3}>No contributions found.</Typography>
      )}

    </Box>
  );
};

export default ContributionsPage;
