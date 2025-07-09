// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Play, Menu, LogOut } from "lucide-react";
// import { confirmAlert } from "react-confirm-alert";
// import "../App.css";
// import "react-confirm-alert/src/react-confirm-alert.css";

// // Icon with double play
// const DoublePlayIcon = () => (
//   <div className="flex items-center">
//     <Play size={20} className="-mr-3.5 text-white fill-white" />
//     <Play size={24} />
//   </div>
// );

// const AdminNavbar = () => {
//   const [showSubMenus, setShowSubMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("jwtToken");
//     if (token) {
//       const payload = JSON.parse(atob(token.split(".")[1]));

//       // Normalize keys (optional but useful for consistency)
//       const normalizedUser = {
//         ...payload,
//         department: payload.Department,
//         epfNo: payload.EpfNo,
//         name: payload.EName,
//         contactNo: payload.ContactNo,
//         isApproved: payload.IsApproved,
//         role: payload[
//           "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//         ],
//       };

//       setUser(normalizedUser);
//       console.log("Decoded JWT payload:", normalizedUser);
//       console.log("User department:", normalizedUser.department);
//     }
//   }, []);

//   const getEmployeeSubMenu = () => {
//     if (!user) return [];

//     if (user.department === "Dyeing-India") {
//       return [
//         {
//           name: "Dyeing-India",
//           path: "/admin-dashboard/employee/dyeingI",
//           icon: <DoublePlayIcon />,
//         },
//       ];
//     }

//     return [
//       {
//         name: "Dyeing-Lanka",
//         path: "/admin-dashboard/employee/dyeing",
//         icon: <DoublePlayIcon />,
//       },
//       {
//         name: "Quality-Lanka",
//         path: "/admin-dashboard/employee/quality",
//         icon: <DoublePlayIcon />,
//       },
//     ];
//   };

//   const menuItems = [
//     { name: "Track File", path: "/admin-dashboard", icon: <DoublePlayIcon /> },
//     { name: "Files", path: "/admin-dashboard/files", icon: <DoublePlayIcon /> },
//     {
//       name: "File History",
//       path: "/admin-dashboard/file-history",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "Add Files",
//       path: "/admin-dashboard/add-files",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "Generate QR",
//       path: "/admin-dashboard/generateQR",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "Employee",
//       path: "/admin-dashboard/employee",
//       icon: <DoublePlayIcon />,
//       hasSubMenu: true,
//       subMenu: getEmployeeSubMenu(),
//     },
//     {
//       name: "Pending",
//       path: "/admin-dashboard/pending",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "Admin",
//       path: "/admin-dashboard/admin",
//       icon: <DoublePlayIcon />,
//     },
//     {
//       name: "My Profile",
//       path: "/admin-dashboard/admin-profile",
//       icon: <DoublePlayIcon />,
//     },
//   ];

//   useEffect(() => {
//     const expanded = {};
//     menuItems.forEach((item) => {
//       if (
//         item.hasSubMenu &&
//         item.subMenu.some((sub) => location.pathname.startsWith(sub.path))
//       ) {
//         expanded[item.name] = true;
//       }
//     });
//     setShowSubMenus(expanded);
//   }, [location.pathname, user]);

//   const toggleSubMenu = (itemName) => {
//     setShowSubMenus((prev) => ({
//       ...prev,
//       [itemName]: !prev[itemName],
//     }));
//   };

//   const handleLogout = () => {
//     confirmAlert({
//       title: "Confirm Logout",
//       message: "Are you sure you want to logout?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             localStorage.removeItem("jwtToken");
//             navigate("/");
//             setIsMobileOpen(false);
//           },
//         },
//         {
//           label: "No",
//         },
//       ],
//     });
//   };

//   if (!user) return null;

//   return (
//     <>
//       {/* Mobile Top Navbar */}
//       <div className="md:hidden flex items-center justify-between bg-primaryBg px-3 -py-1 text-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-white/20">
//         <img src="/logo1.jpg" alt="Logo" className="h-16 w-auto -ml-3" />
//         <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
//           <Menu size={32} />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-[64px] left-0 z-40 h-[calc(100%-64px)] w-64 bg-primaryBg text-white transform transition-transform duration-300 ease-in-out
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
//         md:top-0 md:h-full md:translate-x-0 md:relative md:w-96 md:flex md:flex-col`}
//       >
//         <div className="overflow-y-auto h-[calc(100%-64px)] md:h-auto md:p-4 md:space-y-4">
//           <div className="hidden md:block mb-2">
//             <img
//               src="/logo1.jpg"
//               alt="Logo"
//               className="w-72 h-auto mt-2 mb-1"
//             />
//           </div>

//           {/* Menu Items */}
//           {menuItems.map((item) => {
//             const isActive =
//               location.pathname === item.path ||
//               (item.subMenu &&
//                 item.subMenu.some((sub) => location.pathname === sub.path));

//             return (
//               <div key={item.name}>
//                 <button
//                   className={`flex items-center space-x-3 p-3 w-full text-left transition-all duration-300 rounded-lg hover:bg-[#007a9c] ${
//                     isActive ? "bg-[#00a2cd]" : ""
//                   }`}
//                   onClick={() => {
//                     if (item.hasSubMenu) {
//                       toggleSubMenu(item.name);
//                     } else {
//                       navigate(item.path);
//                       setIsMobileOpen(false);
//                     }
//                   }}
//                 >
//                   {item.icon}
//                   <span className="font-medium">{item.name}</span>
//                 </button>

//                 {/* Submenu Items */}
//                 {item.hasSubMenu && showSubMenus[item.name] && (
//                   <div className="ml-8 space-y-2">
//                     {item.subMenu.map((sub) => (
//                       <button
//                         key={sub.name}
//                         className={`flex items-center space-x-3 p-2 w-full text-left transition-all duration-300 rounded-md hover:bg-[#007a9c] ${
//                           location.pathname === sub.path ? "bg-[#00a2cd]" : ""
//                         }`}
//                         onClick={() => {
//                           navigate(sub.path);
//                           setIsMobileOpen(false);
//                         }}
//                       >
//                         {sub.icon}
//                         <span>{sub.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {/* Logout Button */}
//           <div className="p-3 border-t border-white/30">
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-3 p-2 w-full text-left hover:bg-[#007a9c] transition-all duration-300"
//             >
//               <LogOut size={24} />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminNavbar;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Play, Menu, LogOut } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import "../App.css";
import "react-confirm-alert/src/react-confirm-alert.css";

// Double Play Icon
const DoublePlayIcon = () => (
  <div className="flex items-center">
    <Play size={20} className="-mr-3.5 text-white fill-white" />
    <Play size={24} />
  </div>
);

const AdminNavbar = () => {
  const [showSubMenus, setShowSubMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const normalizedUser = {
        ...payload,
        department: payload.Department,
        epfNo: payload.EpfNo,
        name: payload.EName,
        contactNo: payload.ContactNo,
        isApproved: payload.IsApproved,
        role: payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      };
      setUser(normalizedUser);
    }
  }, []);

  const getEmployeeSubMenu = () => {
    if (!user) return [];
    if (user.department === "Dyeing-India") {
      return [
        {
          name: "Dyeing-India",
          path: "/admin-dashboard/employee/dyeingI",
          icon: <DoublePlayIcon />,
        },
      ];
    }
    return [
      {
        name: "Dyeing-Lanka",
        path: "/admin-dashboard/employee/dyeing",
        icon: <DoublePlayIcon />,
      },
      {
        name: "Quality-Lanka",
        path: "/admin-dashboard/employee/quality",
        icon: <DoublePlayIcon />,
      },
    ];
  };

  const menuItems = [
    { name: "Track File", path: "/admin-dashboard", icon: <DoublePlayIcon /> },
    { name: "Files", path: "/admin-dashboard/files", icon: <DoublePlayIcon /> },
    {
      name: "File History",
      path: "/admin-dashboard/file-history",
      icon: <DoublePlayIcon />,
    },
    {
      name: "Add Files",
      path: "/admin-dashboard/add-files",
      icon: <DoublePlayIcon />,
    },
    {
      name: "Generate QR",
      path: "/admin-dashboard/generateQR",
      icon: <DoublePlayIcon />,
    },
    {
      name: "Employee",
      path: "/admin-dashboard/employee",
      icon: <DoublePlayIcon />,
      hasSubMenu: true,
      subMenu: getEmployeeSubMenu(),
    },
    {
      name: "Pending",
      path: "/admin-dashboard/pending",
      icon: <DoublePlayIcon />,
    },
    {
      name: "Admin",
      path: "/admin-dashboard/admin",
      icon: <DoublePlayIcon />,
    },
    {
      name: "My Profile",
      path: "/admin-dashboard/admin-profile",
      icon: <DoublePlayIcon />,
    },
  ];

  useEffect(() => {
    const expanded = {};
    menuItems.forEach((item) => {
      if (
        item.hasSubMenu &&
        item.subMenu?.some((sub) => location.pathname.startsWith(sub.path))
      ) {
        expanded[item.name] = true;
      }
    });
    setShowSubMenus(expanded);
  }, [location.pathname, user]);

  const toggleSubMenu = (itemName) => {
    setShowSubMenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("jwtToken");
            navigate("/");
            setIsMobileOpen(false);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  if (!user) return null;

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between bg-primaryBg px-3 py-1 text-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-white/20">
        <img src="/logo1.jpg" alt="Logo" className="h-16 w-auto -ml-3" />
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[64px] left-0 z-40 h-[calc(100%-64px)] w-64 bg-primaryBg text-white transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:top-0 md:h-full md:translate-x-0 md:relative md:w-96 md:flex md:flex-col`}
      >
        <div className="overflow-y-auto h-full custom-scrollbar md:p-4 md:space-y-4">
          {/* Desktop Logo */}
          <div className="hidden md:block mb-2">
            <img
              src="/logo1.jpg"
              alt="Logo"
              className="w-72 h-auto mt-2 mb-1"
            />
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.subMenu &&
                item.subMenu.some((sub) => location.pathname === sub.path));

            return (
              <div key={item.name}>
                <button
                  className={`flex items-center space-x-3 p-3 w-full text-left transition-all duration-300 rounded-lg hover:bg-[#007a9c] ${
                    isActive ? "bg-[#00a2cd]" : ""
                  }`}
                  onClick={() => {
                    if (item.hasSubMenu) {
                      toggleSubMenu(item.name);
                    } else {
                      navigate(item.path);
                      setIsMobileOpen(false);
                    }
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </button>

                {/* Submenu */}
                {item.hasSubMenu && showSubMenus[item.name] && (
                  <div className="ml-8 space-y-2">
                    {item.subMenu.map((sub) => (
                      <button
                        key={sub.name}
                        className={`flex items-center space-x-3 p-2 w-full text-left transition-all duration-300 rounded-md hover:bg-[#007a9c] ${
                          location.pathname === sub.path ? "bg-[#00a2cd]" : ""
                        }`}
                        onClick={() => {
                          navigate(sub.path);
                          setIsMobileOpen(false);
                        }}
                      >
                        {sub.icon}
                        <span>{sub.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Logout */}
          <div className="p-3 border-t border-white/30">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-2 w-full text-left hover:bg-[#007a9c] transition-all duration-300"
            >
              <LogOut size={24} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
