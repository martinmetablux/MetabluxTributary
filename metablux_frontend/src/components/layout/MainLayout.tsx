import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <h2>App Layout (Navbar / Sidebar here)</h2>
      <Outlet />
    </div>
  );
}
