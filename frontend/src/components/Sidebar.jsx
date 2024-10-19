// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChartLine } from "react-icons/fa"; // Example icons
import { MdOutlineDashboard } from "react-icons/md";
import { BsListColumnsReverse } from "react-icons/bs";
import { FcAcceptDatabase } from "react-icons/fc";
import { VscGitStashApply } from "react-icons/vsc";
import { FaToggleOff } from "react-icons/fa";
function Sidebar({ role }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    {
      to: role === "admin" ? "/admin/dashboard" : "/student/dashboard",
      label: "Dashboard",
      icon: <MdOutlineDashboard />,
    },
    ...(role === "admin"
      ? [
          {
            to: "/admin/review-applications/:id",
            label: "Review Applications",
            icon: <BsListColumnsReverse />,
          },
          {
            to: "/admin/approve-reject",
            label: "Approve/Reject Applications",
            icon: <FcAcceptDatabase />,
          },
          { to: "/admin/reports", label: "Reports", icon: <FaChartLine /> },
        ]
      : [
          {
            to: "/bursary-application",
            label: "Apply for Bursary",
            icon: <VscGitStashApply />,
          },
        ]),
  ];

  return (
    <div
      className={`fixed h-full bg-blue-600 text-white transition-width ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className={`p-2 bg-blue-700 hover:bg-blue-800 transition-all ${
          collapsed ? "block" : "hidden"
        }`}
      >
        <FaToggleOff />
      </button>
      <nav className="mt-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center py-2.5 px-4 hover:bg-blue-500 ${
                isActive ? "bg-blue-500" : ""
              }`
            }
          >
            {item.icon}
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
