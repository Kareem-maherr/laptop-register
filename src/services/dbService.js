const API_URL = 'http://localhost:5000/api';

// Initialize database on module load
// Removed initDB function as it's not needed with MongoDB backend

// Read database
// Removed readDB function as it's not needed with MongoDB backend

// Write to database
// Removed writeDB function as it's not needed with MongoDB backend

// Employee operations
export const getAllEmployees = async () => {
  try {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched employees:', data);
    return data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Added employee:', data);
    return data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    console.log('Deleting employee with ID:', employeeId);
    const response = await fetch(`${API_URL}/employees/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Delete response:', data);
    return data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

// Device operations
export const getAllDevices = async () => {
  try {
    const response = await fetch(`${API_URL}/devices`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched devices:', data);
    return data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

export const addDevice = async (device) => {
  try {
    const response = await fetch(`${API_URL}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Added device:', data);
    return data;
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};

export const deleteDevice = async (deviceId) => {
  try {
    console.log('Deleting device with ID:', deviceId);
    const response = await fetch(`${API_URL}/devices/${deviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Delete response:', data);
    return data;
  } catch (error) {
    console.error('Error deleting device:', error);
    throw error;
  }
};

// Assignment operations
export const assignDevice = async (deviceId, employeeId) => {
  try {
    const response = await fetch(`${API_URL}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId, employeeId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Created assignment:', data);
    return data;
  } catch (error) {
    console.error('Error assigning device:', error);
    throw error;
  }
};

export const getDeviceAssignments = async () => {
  try {
    const response = await fetch(`${API_URL}/assignments`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched assignments:', data);
    return data;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};

// Get device with its assigned employee details
export const getDeviceWithAssignment = async (deviceId) => {
  try {
    const response = await fetch(`${API_URL}/devices/${deviceId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching device with assignment:', error);
    return null;
  }
};

// Get employee with their assigned devices
export const getEmployeeWithDevices = async (employeeId) => {
  try {
    const response = await fetch(`${API_URL}/employees/${employeeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employee with devices:', error);
    return null;
  }
};

// Report generation
export const generateAssignmentReport = async (device, employee) => {
  try {
    const response = await fetch(`${API_URL}/assignments/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ device, employee }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the blob from the response
    const blob = await response.blob();
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link and click it to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = `assignment-report-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

// Export database to JSON file
// Removed exportDB function as it's not needed with MongoDB backend

// Import database from JSON file
// Removed importDB function as it's not needed with MongoDB backend
