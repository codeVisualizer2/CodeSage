import { Suspense } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Codesage from "./pages/CodeSage";
import LoginPage from "./pages/LoginPage";
import PricingPage from "./pages/PricingPage"
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage"
import { AuthProvider } from "./contexts/AuthContext";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code-sage" element={<Codesage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
