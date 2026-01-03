import { MessageSquare, Activity, RefreshCw, Car, BarChart3, Settings, Menu, Phone, Users, LogOut, Search, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SearchModal } from './SearchModal';

interface NavbarProps {
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function Navbar({ onRefresh, isLoading }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: Activity, show: true },
    { to: '/drivers', label: 'Motoristas', icon: Car, show: true },
    { to: '/analytics', label: 'Analytics', icon: BarChart3, show: true },
    { to: '/users', label: 'Usuários', icon: Users, show: isAdmin },
    { to: '/settings', label: 'Config', icon: Settings, show: isAdmin },
  ].filter(item => item.show);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="border-b border-border bg-card px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Mi Chame Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFCC00] shadow-lg">
            <Phone className="w-5 h-5 text-[#141414]" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground leading-tight tracking-tight">
              Mi Chame
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              WhatsApp Taxi
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              activeClassName="text-foreground bg-muted"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Buscar...</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-muted rounded text-[10px] font-medium">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </Button>

          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-status-accepted animate-pulse" />
            <span className="text-xs">Online</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="gap-2 hidden sm:flex"
          >
            <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
            <span className="hidden lg:inline">Refresh</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} disabled={!isAdmin}>
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0 bg-card">
              {/* Mobile Sidebar Header with Mi Chame branding */}
              <div className="p-5 bg-gradient-to-r from-[#FFCC00] to-[#FFD633]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#141414] flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6 text-[#FFCC00]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#141414] text-lg">Mi Chame</h2>
                    <p className="text-xs text-[#141414]/70">WhatsApp Taxi</p>
                  </div>
                </div>
              </div>

              {/* User Profile Section */}
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 ring-2 ring-[#FFCC00]/30">
                    <AvatarFallback className="bg-[#FFCC00] text-[#141414] font-semibold">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFCC00]/20 text-[#FFCC00]">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Search Button in Mobile */}
              <div className="p-3 border-b border-border">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-[#FFCC00]/10 hover:border-[#FFCC00]/30"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">Buscar...</span>
                </Button>
              </div>

              {/* Navigation Menu */}
              <nav className="p-2 flex-1">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Menu
                </p>
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/dashboard'}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[#FFCC00]/10 transition-colors"
                    activeClassName="text-[#141414] bg-[#FFCC00] hover:bg-[#FFCC00] hover:text-[#141414]"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="p-3 border-t border-border mt-auto">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Sair da conta
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelectResult={(result) => {
          // Navigate based on result type
          if (result.type === 'ride') {
            navigate(`/dashboard?ride=${result.id}`);
          } else if (result.type === 'customer') {
            navigate(`/dashboard?customer=${result.id}`);
          } else if (result.type === 'driver') {
            navigate(`/drivers?driver=${result.id}`);
          }
        }}
      />
    </header>
  );
}
