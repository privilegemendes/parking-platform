import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/contexts/authentication-provider";
import { Logo } from "~/components/ui/logo";
import { Link } from "@tanstack/react-router";
import { useMediaQuery } from "~/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { LogOutIcon } from "lucide-react";

export function NavMenu() {
  const { logout } = useAuth();
  const isDesktop = useMediaQuery("md");
  return (
    <>
      {isDesktop ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={logout}>
                <LogOutIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <Logo />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  super@parkdemeer.nl
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to="/dashboard" className="text-sm [&.active]:font-bold">
                  Overview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/parking-logs"
                  className="text-sm [&.active]:font-bold"
                >
                  Logs
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-center items-center">
              <Button onClick={logout}>Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
