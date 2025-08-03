import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const backendUrl = process.env.NEXT_PUBLIC_API_URL; 

// Full columns list
const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'memberNumber', label: 'Member Number', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 150 },
    { id: 'userType', label: 'User Type', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 }
];

// Columns to show on small screens only
const mobileColumns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'memberNumber', label: 'Member No.', minWidth: 80 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 100 }
];

function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    // Detect if screen is small (sm breakpoint or below)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Choose columns based on screen size
    const visibleColumns = isSmallScreen ? mobileColumns : columns;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/users`);
                const data = await res.json();

                const formattedUsers = data.map((user) => ({
                    ...user,
                    name: [user.firstName, user.middleName, user.lastName]
                        .filter(Boolean)
                        .join(' ')
                }));

                setUsers(formattedUsers);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ backgroundColor: "#daebf5ff" }}>
                <Table stickyHeader aria-label="users table">
                    <TableHead>
                        <TableRow>
                            {visibleColumns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user, idx) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                    {visibleColumns.map((column) => {
                                        const value = user[column.id];
                                        return (
                                            <TableCell key={column.id}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default Users;
