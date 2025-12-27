import { Link, useLocation } from 'react-router-dom';
import { Megaphone, Settings } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
            <Megaphone className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Event Registration</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button 
              variant={!isAdmin ? "secondary" : "ghost"} 
              size="sm"
              className="rounded-full px-3 py-1.5"
            >
              Events
            </Button>
          </Link>
          <Link to="/admin">
            <Button 
              variant={isAdmin ? "secondary" : "ghost"} 
              size="sm"
              className="gap-2 rounded-full px-3 py-1.5"
            >
              <Settings className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
