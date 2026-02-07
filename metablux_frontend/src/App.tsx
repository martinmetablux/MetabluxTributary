import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./module/auth/AuthContext";
import AppRouter from "./router/mainRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
