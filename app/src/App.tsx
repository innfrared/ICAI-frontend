import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedLayout from './routes/layouts/ProtectedLayout';
import AuthLayout from './routes/layouts/AuthLayout';
import Home from './pages/home/Home';
import InterviewCoach from './pages/interview-coach-screen/InterviewCoach';
import InterviewSession from './pages/interview-session/InterviewSession';
import InterviewSessions from './pages/interview-sessions/InterviewSessions';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="interview-coach" element={<InterviewCoach />} />
            
            <Route element={<ProtectedLayout />}>
              <Route path="interviews" element={<InterviewSessions />} />
              <Route path="interviews/:sessionId" element={<InterviewSession />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
