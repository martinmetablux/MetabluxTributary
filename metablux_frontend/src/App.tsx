import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./module/auth/AuthContext";
import AppRouter from "./router/mainRoutes";

import './style/global-buttons.css'
import './style/global-color.css'
import './style/global-space.css'
import './style/global-cards.css'
import './style/global-form.css'

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
