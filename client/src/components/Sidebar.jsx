import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 bg-gray-800 text-white min-h-screen p-4">

      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <div className="flex flex-col gap-4">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/projects">Projects</Link>

        <Link to="/tasks">Tasks</Link>

      </div>

    </div>
  );
}

export default Sidebar;