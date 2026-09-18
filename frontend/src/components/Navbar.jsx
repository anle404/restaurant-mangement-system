import { NavLink } from "react-router"

export default function Navbar() {
    const iconSize="2.5rem"
    const navItems = [
        {
            name: "Table",
            icon: <i className="ri-restaurant-line" style={{fontSize: iconSize}}></i>,
            url: "/table"
        },
        {
            name: "History",
            icon: <i className="ri-history-line" style={{fontSize: iconSize}}></i>,
            url: "/history"
        },
        {
            name: "Dashboard",
            icon: <i className="ri-dashboard-line" style={{fontSize: iconSize}}></i>,
            url: "/dashboard"
        }
    ]

    return (
        <nav className="flex flex-col justify-between items-center h-full w-fit px-2 py-5 bg-azure-500">
            <div className="flex flex-col h-[55%] justify-between items-center">
                <i className="ri-menu-line text-honeydew-500" style={{fontSize: iconSize}}></i>
                <div className="flex flex-col gap-12 text-[1rem] text-honeydew-500">
                    {navItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-1">
                            {item.icon}
                        </div>
                    ))}
                </div>
            </div>
            <i className="ri-logout-box-line text-honeydew-500" style={{fontSize: iconSize}}></i>
        </nav>
    )
}