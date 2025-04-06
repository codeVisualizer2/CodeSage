import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Codesage from "./pages/CodeSage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/ui/theme-provider";
import routes from "tempo-routes";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="codesage-ui-theme">
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/code-sage" element={<Codesage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
