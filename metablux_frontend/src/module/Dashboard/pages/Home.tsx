import { useAuth } from "../../auth/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard (Protected)</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
