import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AssignmentReport from './AssignmentReport';

function Assignments({ laptops, employees, onAssign }) {
  const [assignment, setAssignment] = useState({
    laptopId: '',
    employeeId: ''
  });

  const [reportDialog, setReportDialog] = useState({
    open: false,
    device: null,
    employee: null
  });

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (assignment.laptopId && assignment.employeeId) {
      try {
        await onAssign(assignment);
        const laptop = laptops.find(l => l._id === assignment.laptopId);
        const employee = employees.find(e => e._id === assignment.employeeId);
        setReportDialog({
          open: true,
          device: laptop,
          employee
        });
        setAssignment({ laptopId: '', employeeId: '' });
      } catch (error) {
        console.error('Error assigning device:', error);
        alert('Failed to assign device. Please try again.');
      }
    }
  };

  const handleReportDialogClose = () => {
    setReportDialog({
      open: false,
      device: null,
      employee: null
    });
    // Refresh the page to show updated assignments
    window.location.reload();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="page">
      <h1>Device Assignments</h1>
      <div className="section">
        <h2>Assign Device</h2>
        <form onSubmit={handleAssignSubmit}>
          <select
            value={assignment.laptopId}
            onChange={(e) => setAssignment({ ...assignment, laptopId: e.target.value })}
            required
          >
            <option value="">Select Device</option>
            {laptops
              .filter(laptop => !laptop.assignedTo)
              .map((laptop) => (
                <option key={laptop._id} value={laptop._id}>
                  {laptop.name} - {laptop.serialNumber}
                </option>
              ))}
          </select>

          <select
            value={assignment.employeeId}
            onChange={(e) => setAssignment({ ...assignment, employeeId: e.target.value })}
            required
          >
            <option value="">Select Employee</option>
            {employees
              .filter(employee => employee.status === 'Active')
              .map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} - {employee.number}
                </option>
              ))}
          </select>

          <button type="submit">Assign Device</button>
        </form>
      </div>

      <div className="section">
        <h2>Current Assignments</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="assignments table">
            <TableHead>
              <TableRow>
                <TableCell>Device Name</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Employee Number</TableCell>
                <TableCell>Assignment Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laptops
                .filter(laptop => laptop.assignedTo)
                .map((laptop) => {
                  const employee = employees.find(e => e._id === laptop.assignedTo);
                  return (
                    <TableRow
                      key={laptop._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {laptop.name}
                      </TableCell>
                      <TableCell>{laptop.serialNumber}</TableCell>
                      <TableCell>{laptop.model}</TableCell>
                      <TableCell>{employee?.name || 'Unknown'}</TableCell>
                      <TableCell>{employee?.number || 'N/A'}</TableCell>
                      <TableCell>{formatDate(laptop.assignedDate)}</TableCell>
                      <TableCell>{laptop.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            setReportDialog({
                              open: true,
                              device: laptop,
                              employee: employee
                            });
                          }}
                        >
                          Download Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Report Generation Dialog */}
      <Dialog
        open={reportDialog.open}
        onClose={handleReportDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Assignment Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to generate a PDF report for this device assignment?
            <br /><br />
            Device: {reportDialog.device?.name} ({reportDialog.device?.serialNumber})
            <br />
            Employee: {reportDialog.employee?.name} ({reportDialog.employee?.number})
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportDialogClose}>
            Skip
          </Button>
          {reportDialog.device && reportDialog.employee && (
            <AssignmentReport
              device={reportDialog.device}
              employee={reportDialog.employee}
              onClose={handleReportDialogClose}
            />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Assignments;
