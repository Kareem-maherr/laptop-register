require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const Device = require('./models/Device');
const Assignment = require('./models/Assignment');

async function viewDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/laptop-registration');
        console.log('Connected to MongoDB');

        console.log('\n=== Employees ===');
        const employees = await Employee.find();
        console.log(JSON.stringify(employees, null, 2));

        console.log('\n=== Devices ===');
        const devices = await Device.find().populate('assignedTo');
        console.log(JSON.stringify(devices, null, 2));

        console.log('\n=== Assignments ===');
        const assignments = await Assignment.find().populate(['device', 'employee']);
        console.log(JSON.stringify(assignments, null, 2));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

viewDatabase();
