import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  MessageSquare,
  Users,
  User,
  HelpCircle,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Campaigns", href: "/", icon: <Home className="h-5 w-5" /> },
  { name: "Wobble", href: "/wobble", icon: <Users className="h-5 w-5" /> },
  {
    name: "Messages",
    href: "/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  { name: "Profile", href: "/profile", icon: <User className="h-5 w-5" /> },
  { name: "Help", href: "/help", icon: <HelpCircle className="h-5 w-5" /> },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              <div className="relative flex h-8 w-8 overflow-hidden rounded-full bg-primary">
                <span className="font-bold text-primary-foreground">W</span>
              </div>
            </div>
            <span className="hidden font-bold sm:inline-block">Wobb</span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button variant="outline" size="sm">
            Log in
          </Button>
          <Button size="sm">Sign up</Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="ml-auto">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7 mt-4">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative flex h-8 w-8 overflow-hidden rounded-full bg-primary">
                  <span className="font-bold text-primary-foreground">W</span>
                </div>
                <span className="font-bold">Wobb</span>
              </Link>
            </div>
            <nav className="mt-8 flex flex-col gap-4 px-7">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-2 px-7">
              <Button variant="outline" className="w-full justify-start">
                Log in
              </Button>
              <Button className="w-full justify-start">Sign up</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
