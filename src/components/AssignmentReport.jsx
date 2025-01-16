import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import Button from '@mui/material/Button';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  signatureSection: {
    marginTop: 50,
  },
  signatureLine: {
    marginTop: 30,
    borderTop: '1px solid black',
    width: '60%',
  },
  signatureText: {
    fontSize: 10,
    marginTop: 5,
  },
});

// Create Document Component
const AssignmentReportPDF = ({ device, employee }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Device Assignment Report</Text>
      
      <Text style={styles.text}>Generated on: {new Date().toLocaleString()}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Device Information</Text>
        <Text style={styles.text}>Device Name: {device.name}</Text>
        <Text style={styles.text}>Serial Number: {device.serialNumber}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employee Information</Text>
        <Text style={styles.text}>Employee Name: {employee.name}</Text>
        <Text style={styles.text}>Employee Number: {employee.number}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assignment Details</Text>
        <Text style={styles.text}>Assignment Date: {new Date().toLocaleString()}</Text>
        <Text style={styles.text}>Status: Assigned</Text>
      </View>
      
      <View style={styles.signatureSection}>
        <View>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Employee Signature</Text>
        </View>
        
        <View style={{ marginTop: 30 }}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>IT Department Signature</Text>
        </View>
        
        <View style={{ marginTop: 30 }}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Date</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Export a component that provides a download button
const AssignmentReport = ({ device, employee, onClose }) => (
  <PDFDownloadLink
    document={<AssignmentReportPDF device={device} employee={employee} />}
    fileName={`assignment-report-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`}
  >
    {({ blob, url, loading, error }) => (
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={() => {
          if (!loading && !error) {
            setTimeout(onClose, 1000); // Close dialog after download starts
          }
        }}
      >
        {loading ? 'Generating PDF...' : 'Download Report'}
      </Button>
    )}
  </PDFDownloadLink>
);

export default AssignmentReport;
