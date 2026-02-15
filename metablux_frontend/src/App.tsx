import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"
import AppRouter from "./router/mainRoutes";

import './style/global-buttons.css'
import './style/global-color.css'
import './style/global-color1.css'
import './style/global-layout.css'
import './style/global-space.css'
import './style/global-cards.css'
import './style/global-form.css'
import './style/global-nav.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="app">
        <AppRouter />
      </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
