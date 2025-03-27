import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CodeStage from "./pages/CodeStage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code-stage" element={<CodeStage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
