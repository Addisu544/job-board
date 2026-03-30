import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/admin/users/${id}/status`, {
        status: newStatus,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "ADMIN"
              ? "error"
              : params.value === "RECRUITER"
                ? "primary"
                : "success"
          }
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
        >
          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
          <MenuItem value="BANNED">BANNED</MenuItem>
        </Select>
      ),
    },
  ];

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Loading users...</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Users Management
      </Typography>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            borderRadius: 3,
            boxShadow: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default Users;
