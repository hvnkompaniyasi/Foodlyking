import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Customers from './pages/Customers';
import Operators from './pages/Operators';
import AddOperator from './pages/AddOperator';
import Statistics from './pages/Statistics';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes with Dashboard Layout */}
          <Route 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/operators" element={<Operators />} />
            <Route path="/operators/add" element={<AddOperator />} />
            <Route path="/statistics" element={<Statistics />} />
            {/* Catch-all for any other protected routes */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
