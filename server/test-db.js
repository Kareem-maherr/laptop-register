require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/laptop-registration', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
    
    // Test employee find
    const employees = await Employee.find();
    console.log('Found employees:', employees);
    
    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

testConnection();
