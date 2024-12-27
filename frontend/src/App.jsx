import './App.css';
import AdminGuidelines from './components/AdminGuidelines';
import AppointmentList from './components/AppointmentList';
import ClientSignup from './components/ClientSignup';
import ContactPage from './components/ContactPage';
import DoctorDetails from './components/DoctorDetails';
import HospitalDashboard from './components/HospitalDashboard';
import HospitalSignup from './components/HospitalSignup';
import { MediConnect } from './components/MediConnect';
// import ServicesSection from './components/ServiceSection';
import { UserProvider } from './Context/UserContext';
import Home from './pages/Home';
import ClientAppointments from './components/ClientAppointments'; // Import ClientAppointments Component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiseaseInfo from './components/DiseaseInfo';
import ResetPassword from './components/ResetPassword';
import ClientResetPassword from './components/ClientResetPassword';
import NotFound from './components/NotFound';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MediConnect />} />
          <Route path="/main" element={<Home />} />
          <Route path="/ClientSignup" element={<ClientSignup />} />
          <Route path="/HospitalSignup" element={<HospitalSignup />} />
          <Route path="/Medi-Info" element={<DiseaseInfo />} />

          {/* New route for Contact Page for hosapitals */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/check-clients/:hospitalId" element={<AppointmentList />} />
          
          {/* New route for Doctor Details only user */}
          <Route path="/doctor-details" element={<DoctorDetails />} />
          <Route path="/client-appointments" element={<ClientAppointments />} />

          {/* New route for Admin Guidelines */}
          <Route path="/admin-details" element={<AdminGuidelines />} />
          
          {/* New route for Client Appointments */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/client-reset-password/:token" element={<ClientResetPassword />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
