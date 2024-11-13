import { NavMenu } from "~/components/nav-menu";
import { Link } from "@tanstack/react-router";
import { CreateSession } from "~/components/create-session/create-session";
import { Logo } from "~/components/ui/logo";

export const Navbar = () => {
  return (
    <div className="flex items-center h-16 px-4 mb-4 border-b gap-4">
      <Logo />
      <div className="hidden p-2 md:flex gap-2">
        <Link to="/dashboard" className="text-sm [&.active]:font-bold">
          Overview
        </Link>
        <Link to="/parking-logs" className="text-sm [&.active]:font-bold">
          Logs
        </Link>
      </div>
      <div className="flex flex-1 gap-4 justify-end">
        <CreateSession />
        <NavMenu />
      </div>
    </div>
  );
};
