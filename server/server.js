require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./models/Employee');
const Device = require('./models/Device');
const Assignment = require('./models/Assignment');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB connection string is not defined in environment variables');
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes

// Employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log('Fetched employees:', employees);
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    console.log('Creating employee:', req.body);
    const employee = new Employee(req.body);
    const newEmployee = await employee.save();
    console.log('Created employee:', newEmployee);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete employee and remove their device assignments
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    console.log('Deleting employee:', employeeId);

    // Find all devices assigned to this employee
    const assignedDevices = await Device.find({ assignedTo: employeeId });
    console.log('Found assigned devices:', assignedDevices);

    // Update all devices to remove the assignment
    for (const device of assignedDevices) {
      device.assignedTo = null;
      device.assignedDate = null;
      device.status = 'Available';
      await device.save();
      console.log('Updated device:', device);
    }

    // Delete all assignments for this employee
    const deletedAssignments = await Assignment.deleteMany({ employee: employeeId });
    console.log('Deleted assignments:', deletedAssignments);

    // Delete the employee using findByIdAndDelete
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      console.log('Employee not found:', employeeId);
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log('Successfully deleted employee:', deletedEmployee);

    res.json({ 
      message: 'Employee deleted successfully', 
      employee: deletedEmployee,
      devicesUpdated: assignedDevices.length,
      assignmentsDeleted: deletedAssignments.deletedCount
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: error.message });
  }
});

// Devices
app.get('/api/devices', async (req, res) => {
  try {
    const devices = await Device.find().populate('assignedTo');
    console.log('Fetched devices:', devices);
    res.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/devices', async (req, res) => {
  try {
    console.log('Creating device:', req.body);
    const device = new Device(req.body);
    const newDevice = await device.save();
    console.log('Created device:', newDevice);
    res.status(201).json(newDevice);
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete device and remove its assignments
app.delete('/api/devices/:id', async (req, res) => {
  try {
    const deviceId = req.params.id;
    console.log('Deleting device:', deviceId);

    // Delete all assignments for this device
    const deletedAssignments = await Assignment.deleteMany({ device: deviceId });
    console.log('Deleted assignments:', deletedAssignments);

    // Delete the device
    const deletedDevice = await Device.findByIdAndDelete(deviceId);
    if (!deletedDevice) {
      console.log('Device not found:', deviceId);
      return res.status(404).json({ message: 'Device not found' });
    }
    console.log('Successfully deleted device:', deletedDevice);

    res.json({ 
      message: 'Device deleted successfully', 
      device: deletedDevice,
      assignmentsDeleted: deletedAssignments.deletedCount
    });
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ message: error.message });
  }
});

// Assignments
app.post('/api/assignments', async (req, res) => {
  try {
    const { deviceId, employeeId } = req.body;
    console.log('Creating assignment:', { deviceId, employeeId });
    const timestamp = new Date().toISOString();

    // Update device
    const updatedDevice = await Device.findByIdAndUpdate(
      deviceId,
      {
        assignedTo: employeeId,
        assignedDate: timestamp,
        status: 'Assigned'
      },
      { new: true }
    ).populate('assignedTo');

    // Create assignment record
    const assignment = new Assignment({
      device: deviceId,
      employee: employeeId,
      assignedDate: timestamp
    });
    await assignment.save();

    console.log('Created assignment:', assignment);
    console.log('Updated device:', updatedDevice);
    res.status(201).json(updatedDevice);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('device')
      .populate('employee');
    console.log('Fetched assignments:', assignments);
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: error.message });
  }
});

// Generate assignment report
app.post('/api/assignments/report', async (req, res) => {
  try {
    const { device, employee } = req.body;
    console.log('Generating report for:', { device, employee });

    // Create reports directory if it doesn't exist
    const reportsDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `assignment-report-${timestamp}.pdf`;
    const filePath = path.join(reportsDir, filename);

    // Create write stream
    const stream = fs.createWriteStream(filePath);

    // Handle stream errors
    stream.on('error', (error) => {
      console.error('Stream error:', error);
      res.status(500).json({ message: 'Error generating PDF' });
    });

    // Pipe the PDF document to the file
    doc.pipe(stream);

    // Add content to the PDF
    doc
      .fontSize(20)
      .text('Device Assignment Report', { align: 'center' })
      .moveDown()
      .fontSize(12);

    doc
      .text('Generated on: ' + new Date().toLocaleString())
      .moveDown()
      .moveDown();

    // Device Information
    doc
      .fontSize(16)
      .text('Device Information')
      .moveDown()
      .fontSize(12)
      .text(`Device Name: ${device.name}`)
      .text(`Serial Number: ${device.serialNumber}`)
      .moveDown();

    // Employee Information
    doc
      .fontSize(16)
      .text('Employee Information')
      .moveDown()
      .fontSize(12)
      .text(`Employee Name: ${employee.name}`)
      .text(`Employee Number: ${employee.number}`)
      .moveDown();

    // Assignment Details
    doc
      .fontSize(16)
      .text('Assignment Details')
      .moveDown()
      .fontSize(12)
      .text(`Assignment Date: ${new Date().toLocaleString()}`)
      .text(`Status: Assigned`)
      .moveDown();

    // Signatures
    doc
      .fontSize(16)
      .text('Signatures')
      .moveDown()
      .fontSize(12)
      .text('Employee Signature: _______________________')
      .moveDown()
      .text('IT Department Signature: _______________________')
      .moveDown()
      .text('Date: _______________________');

    // Finalize the PDF
    doc.end();

    // Wait for the stream to finish
    stream.on('finish', () => {
      // Set response headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      // Send the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      // Delete the file after sending
      fileStream.on('end', () => {
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
