import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import CalculatorPage from './pages/CalculatorPage'
import ComparisonPage from './pages/ComparisonPage'
import ConversionPage from './pages/ConversionPage'
import HomePage from './pages/HomePage'
import LoginSuccess from './pages/LoginSuccess'
import Welcome from './pages/Welcome'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/convert"
                element={
                  <ProtectedRoute>
                    <ConversionPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/oauth-success" element={<LoginSuccess />} />
              <Route path="/login-success" element={<LoginSuccess />} />
              <Route
                path="/calculator"
                element={
                  <ProtectedRoute>
                    <CalculatorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compare"
                element={
                  <ProtectedRoute>
                    <ComparisonPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
