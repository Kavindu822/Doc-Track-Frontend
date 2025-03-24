import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

const DoublePlayIcon = () => (
  <div className="flex items-center">
    <Play size={20} className="-mr-3.5 text-white fill-white" />
    <Play size={24} />
  </div>
);

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [showTransferSubMenu, setShowTransferSubMenu] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const menuItems = [
    { name: "Track File", path: "/track", icon: <DoublePlayIcon /> },
    { name: "My Files", path: "/my-files", icon: <DoublePlayIcon /> },
    { name: "Take File", path: "/take-file", icon: <DoublePlayIcon /> },
    { 
      name: "Transfer File", 
      path: "/transfer-file", 
      icon: <DoublePlayIcon />, 
      hasSubMenu: true,
      subMenu: [
        { name: "QR Transfer", path: "/transfer-file/qr", icon: <DoublePlayIcon /> },
        { name: "Seat Transfer", path: "/transfer-file/seat", icon: <DoublePlayIcon /> },
      ],
    },
    { name: "My History", path: "/my-history", icon: <DoublePlayIcon /> },
  ];

  return (
    <div className="h-screen w-96 bg-primaryBg text-white flex flex-col p-4 space-y-4">
      {menuItems.map((item) => (
        <div key={item.name}>
          <button
            className={`flex items-center space-x-3 p-3 transition-all duration-300 w-full ${
              active === item.name ? "bg-[#00a2cd]" : ""
            }`}
            onClick={() => {
              if (item.hasSubMenu) {
                setShowTransferSubMenu(!showTransferSubMenu);
              } else {
                setActive(item.name);
                navigate(item.path); // Navigate to the corresponding path
              }
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
          {item.hasSubMenu && showTransferSubMenu && (
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

export default Navbar;
