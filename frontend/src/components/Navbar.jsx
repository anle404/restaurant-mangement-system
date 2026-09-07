import { NavLink } from "react-router"
import { RiRestaurantLine, RiHistoryLine, RiDashboardLine, RiMenuLine, RiLogoutBoxLine } from "@remixicon/react"

export default function Navbar() {
    const iconSize="2.5rem"
    const navItems = [
        {
            name: "Table",
            icon: <RiRestaurantLine size={iconSize} />,
            url: "/table"
        },
        {
            name: "History",
            icon: <RiHistoryLine size={iconSize}/>,
            url: "/history"
        },
        {
            name: "Dashboard",
            icon: <RiDashboardLine size={iconSize}/>,
            url: "/dashboard"
        }
    ]

    return (
        <nav className="flex flex-col justify-between items-center h-full w-fit px-2 py-5 bg-azure-500">
            <div className="flex flex-col h-[55%] justify-between items-center">
                <RiMenuLine size={iconSize} className="text-honeydew-500"/>
                <div className="flex flex-col gap-12 text-[1rem] text-honeydew-500">
                    {navItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-1">
                            {item.icon}
                        </div>
                    ))}
                </div>
            </div>
            <RiLogoutBoxLine size={iconSize} className="text-honeydew-500" />
        </nav>
    )
}