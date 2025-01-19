import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Devices from './components/Devices'
import Employees from './components/Employees'
import Assignments from './components/Assignments'
import Navigation from './components/Navigation'
import * as dbService from './services/dbService'
import jsPDF from 'jspdf';


function App() {
  const [laptops, setLaptops] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [devicesData, employeesData] = await Promise.all([
          dbService.getAllDevices(),
          dbService.getAllEmployees()
        ]);
        setLaptops(devicesData);
        setEmployees(employeesData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please make sure the server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddLaptop = async (laptop) => {
    try {
      const newDevice = await dbService.addDevice(laptop);
      if (newDevice) {
        const updatedDevices = await dbService.getAllDevices();
        setLaptops(updatedDevices);
      }
    } catch (error) {
      console.error('Error adding laptop:', error);
      alert('Failed to add laptop. Please try again.');
    }
  };

  const handleAddEmployee = async (employee) => {
    try {
      const newEmployee = await dbService.addEmployee(employee);
      if (newEmployee) {
        const updatedEmployees = await dbService.getAllEmployees();
        setEmployees(updatedEmployees);
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee. Please try again.');
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await dbService.deleteEmployee(employeeId);
      // Refresh both employees and devices since device assignments might change
      const [updatedEmployees, updatedDevices] = await Promise.all([
        dbService.getAllEmployees(),
        dbService.getAllDevices()
      ]);
      setEmployees(updatedEmployees);
      setLaptops(updatedDevices);
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again.');
    }
  };

  const handleAssignment = async ({ laptopId, employeeId }) => {
    try {
      await dbService.assignDevice(laptopId, employeeId);
      // Refresh both devices and employees data
      const [updatedDevices, updatedEmployees] = await Promise.all([
        dbService.getAllDevices(),
        dbService.getAllEmployees()
      ]);
      setLaptops(updatedDevices);
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error assigning device:', error);
      alert('Failed to assign device. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="container">
        <h1>Device Registration Service</h1>
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/devices" replace />} />
            <Route 
              path="/devices" 
              element={
                <Devices 
                  laptops={laptops} 
                  employees={employees} 
                  onAddLaptop={handleAddLaptop} 
                />
              } 
            />
            <Route 
              path="/employees" 
              element={
                <Employees 
                  employees={employees} 
                  onAddEmployee={handleAddEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              } 
            />
            <Route 
              path="/assignments" 
              element={
                <Assignments 
                  laptops={laptops} 
                  employees={employees} 
                  onAssign={handleAssignment} 
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
