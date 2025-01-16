import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import * as dbService from '../services/dbService'

function Devices({ laptops, employees, onAddLaptop }) {
  const [newLaptop, setNewLaptop] = useState({ 
    serialNumber: '', 
    name: '', 
    status: 'Available', 
    description: '' 
  })

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    laptop: null
  })

  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const handleLaptopSubmit = (e) => {
    e.preventDefault()
    if (newLaptop.serialNumber.trim() && newLaptop.name.trim()) {
      onAddLaptop(newLaptop)
      setNewLaptop({ 
        serialNumber: '', 
        name: '', 
        status: 'Available', 
        description: '' 
      })
    }
  }

  const handleDeleteClick = (laptop) => {
    setDeleteDialog({
      open: true,
      laptop
    })
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      laptop: null
    })
  }

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true)
      const response = await dbService.deleteDevice(deleteDialog.laptop._id)
      console.log('Delete response:', response)
      
      // Refresh the page to update the lists
      window.location.reload()
    } catch (error) {
      console.error('Error deleting device:', error)
      alert('Failed to delete device. Please try again.')
    } finally {
      setIsDeleting(false)
      handleDeleteCancel()
    }
  }

  return (
    <div className="page">
      <h1>Devices Management</h1>
      
      <div className="section">
        <h2>Register New Device</h2>
        <form onSubmit={handleLaptopSubmit}>
          <input
            type="text"
            placeholder="Serial Number"
            value={newLaptop.serialNumber}
            onChange={(e) => setNewLaptop({ ...newLaptop, serialNumber: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Device Name"
            value={newLaptop.name}
            onChange={(e) => setNewLaptop({ ...newLaptop, name: e.target.value })}
            required
          />
          <select
            value={newLaptop.status}
            onChange={(e) => setNewLaptop({ ...newLaptop, status: e.target.value })}
            required
          >
            <option value="Available">Available</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <input
            type="text"
            placeholder="Device Description"
            value={newLaptop.description}
            onChange={(e) => setNewLaptop({ ...newLaptop, description: e.target.value })}
          />
          <button type="submit">Register Device</button>
        </form>
      </div>

      <div className="section">
        <h2>Registered Devices</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Devices List">
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Assignment Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laptops.map((laptop) => (
                <TableRow
                  key={laptop._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {laptop.serialNumber}
                  </TableCell>
                  <TableCell>{laptop.name}</TableCell>
                  <TableCell>{laptop.status}</TableCell>
                  <TableCell>{laptop.description}</TableCell>
                  <TableCell>
                    {laptop.assignedTo ? laptop.assignedTo.name : ''}
                  </TableCell>
                  <TableCell>
                    {formatDate(laptop.assignedDate)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(laptop)}
                      color="error"
                      disabled={isDeleting || laptop.status === 'Assigned'}
                    >
                      {isDeleting && deleteDialog.laptop?._id === laptop._id ? (
                        <CircularProgress size={24} color="error" />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={!isDeleting ? handleDeleteCancel : undefined}
      >
        <DialogTitle>Delete Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete device {deleteDialog.laptop?.name} ({deleteDialog.laptop?.serialNumber})?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Devices
