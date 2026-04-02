import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Skeleton,
  IconButton,
  Tooltip as MuiTooltip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { MoreVert, Security, WorkOutline, PersonOutline } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../../services/api";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ p: 2, display: "flex", justifyContent: "space-between", borderBottom: '1px solid #f0f0f0' }}>
      <Box>
        <GridToolbarFilterButton />
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </Box>
      <Box>
        <GridToolbarQuickFilter placeholder="Search users..." sx={{ width: 250 }} />
      </Box>
    </GridToolbarContainer>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // For Inline Action Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.users);
      } catch (err) {
        toast.error("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleStatusUpdate = async (newStatus) => {
    if (!selectedUser) return;
    const id = selectedUser.id;
    try {
      await api.patch(`/admin/users/${id}/status`, { status: newStatus });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
      );
      toast.success(`User status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
    handleMenuClose();
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "ADMIN": return <Security fontSize="small" />;
      case "RECRUITER": return <WorkOutline fontSize="small" />;
      default: return <PersonOutline fontSize="small" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN": return "error";
      case "RECRUITER": return "primary";
      default: return "success";
    }
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Typography fontWeight="500" sx={{ mt: 1.5 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 250,
      renderCell: (params) => (
        <Typography color="text.secondary" sx={{ mt: 1.5 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Chip
          icon={getRoleIcon(params.value)}
          label={params.value}
          color={getRoleColor(params.value)}
          variant="outlined"
          size="small"
          sx={{ fontWeight: "bold", borderWidth: 2 }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            fontWeight: "bold",
            borderRadius: 1,
            bgcolor: params.value === "ACTIVE" ? "#ecfdf5" : "#fef2f2",
            color: params.value === "ACTIVE" ? "#10b981" : "#ef4444",
            border: `1px solid ${params.value === "ACTIVE" ? "#a7f3d0" : "#fecaca"}`,
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <React.Fragment>
          <MuiTooltip title="More actions">
            <IconButton onClick={(e) => handleMenuClick(e, params.row)} size="small">
              <MoreVert />
            </IconButton>
          </MuiTooltip>
        </React.Fragment>
      ),
    },
  ];

  if (loading) {
    return (
      <Box p={4}>
        <Skeleton variant="text" width={300} height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: 4 }} />
      </Box>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Box p={{ xs: 2, md: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          User Directory
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Manage platform accounts, monitor statuses, and apply filters.
        </Typography>

        <Box
          sx={{
            height: 600,
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            overflow: "hidden",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#f8fafc",
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f8fafc",
            },
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            slots={{ toolbar: CustomToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>

        {/* INLINE ACTION MENU */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: { borderRadius: 2, minWidth: 150 },
          }}
        >
          {selectedUser?.status === "BANNED" ? (
            <MenuItem onClick={() => handleStatusUpdate("ACTIVE")} sx={{ fontWeight: "500", color: "#10b981" }}>
              Activate User
            </MenuItem>
          ) : (
            <MenuItem onClick={() => handleStatusUpdate("BANNED")} sx={{ fontWeight: "500", color: "#ef4444" }}>
              Ban User
            </MenuItem>
          )}
        </Menu>
      </Box>
    </motion.div>
  );
};

export default Users;
