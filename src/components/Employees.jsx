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

function Employees({ employees, onAddEmployee, onDeleteEmployee }) {
  const [newEmployee, setNewEmployee] = useState({ 
    number: '', 
    name: '', 
    status: 'Active', 
    description: '' 
  })

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    employee: null
  })

  const [isDeleting, setIsDeleting] = useState(false)

  const handleEmployeeSubmit = (e) => {
    e.preventDefault()
    if (newEmployee.number.trim() && newEmployee.name.trim()) {
      onAddEmployee(newEmployee)
      setNewEmployee({ 
        number: '', 
        name: '', 
        status: 'Active', 
        description: '' 
      })
    }
  }

  const handleDeleteClick = (employee) => {
    setDeleteDialog({
      open: true,
      employee
    })
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      employee: null
    })
  }

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true)
      const response = await dbService.deleteEmployee(deleteDialog.employee._id)
      console.log('Delete response:', response)
      
      // Refresh the page to update the lists
      window.location.reload()
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert('Failed to delete employee. Please try again.')
    } finally {
      setIsDeleting(false)
      handleDeleteCancel()
    }
  }

  return (
    <div className="page">
      <h1>Employees Management</h1>
      
      <div className="section">
        <h2>Register New Employee</h2>
        <form onSubmit={handleEmployeeSubmit}>
          <input
            type="text"
            placeholder="Employee Number"
            value={newEmployee.number}
            onChange={(e) => setNewEmployee({ ...newEmployee, number: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Employee Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            required
          />
          <select
            value={newEmployee.status}
            onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            type="text"
            placeholder="Description"
            value={newEmployee.description}
            onChange={(e) => setNewEmployee({ ...newEmployee, description: e.target.value })}
          />
          <button type="submit">Register Employee</button>
        </form>
      </div>

      <div className="section">
        <h2>Registered Employees</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Employees List">
            <TableHead>
              <TableRow>
                <TableCell>Employee Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  key={employee._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.number}
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell>{employee.description}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(employee)}
                      color="error"
                      disabled={isDeleting}
                    >
                      {isDeleting && deleteDialog.employee?._id === employee._id ? (
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
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete employee {deleteDialog.employee?.name}? 
            This will also remove any device assignments for this employee.
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

export default Employees
