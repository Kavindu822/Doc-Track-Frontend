import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

const DoublePlayIcon = () => (
  <div className="flex items-center">
    <Play size={20} className="-mr-3.5 text-white fill-white" />
    <Play size={24} />
  </div>
);

const AdminNavbar = () => {
  const [active, setActive] = useState("Home");
  const [showTransferSubMenu, setShowTransferSubMenu] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const menuItems = [
    { name: "Track File", path: "/admin-dashboard", icon: <DoublePlayIcon /> },
    { name: "Files", path: "/admin-dashboard/files", icon: <DoublePlayIcon /> },
    { 
      name: "Employee", 
      path: "/admin-dashboard/employee", 
      icon: <DoublePlayIcon />, 
      hasSubMenu: true,
      subMenu: [
        { name: "Deying", path: "/admin-dashboard/employee/deying", icon: <DoublePlayIcon /> },
        { name: "Quality", path: "/admin-dashboard/employee/quality", icon: <DoublePlayIcon /> },
      ],
    },
    { name: "Admin", path: "/admin-dashboard/admin", icon: <DoublePlayIcon /> },
    { 
      name: "Transfer File", 
      path: "/admin-dashboard/transfer-file", 
      icon: <DoublePlayIcon />, 
      hasSubMenu: true,
      subMenu: [
        { name: "QR Transfer", path: "/admin-dashboard/transfer-file/qr", icon: <DoublePlayIcon /> },
        { name: "Seat Transfer", path: "/admin-dashboard/transfer-file/seat", icon: <DoublePlayIcon /> },
      ],
    },
    { name: "File History", path: "/admin-dashboard/file-history", icon: <DoublePlayIcon /> },
  ];

  const toggleSubMenu = (itemName) => {
    setShowTransferSubMenu((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };

  return (
    <div className="h-screen w-96 bg-primaryBg text-white flex flex-col p-4 space-y-4">
      {menuItems.map((item) => (
        <div key={item.name}>
          <button
            className={`flex items-center space-x-3 p-3 transition-all duration-300 w-full ${active === item.name ? "bg-[#00a2cd]" : ""}`}
            onClick={() => {
              if (item.hasSubMenu) {
                toggleSubMenu(item.name);
              } else {
                setActive(item.name);
                navigate(item.path); // Navigate to the corresponding path
              }
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
          {item.hasSubMenu && showTransferSubMenu[item.name] && (
            <div className="ml-8 space-y-2">
              {item.subMenu.map((sub) => (
                <button
                  key={sub.name}
                  className="flex items-center space-x-3 p-2 transition-all duration-300 hover:bg-[#007a9c] w-full text-left"
                  onClick={() => navigate(sub.path)}
                >
                  {sub.icon}
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminNavbar;
