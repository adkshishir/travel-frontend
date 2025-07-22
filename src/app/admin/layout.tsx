'use client';

import type React from 'react';

import { useState, Suspense, use, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Users,
  Package,
  Settings,
  ChevronLeft,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  HelpCircle,
  Home,
  Eye,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { getCookie } from '@/utils/cookie-handler';
import { useRouter } from 'next/navigation';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = await getCookie('token');
      console.log(token);
      if (!token) {
        router.push('/auth');
        return;
      }
      setHasToken(true);
    })();
  }, []);

  const navItems = [
    {
      icon: Home,
      label: 'Dashboard',
      href: '/admin',
      description: 'Overview of your business',
    },
    {
      icon: Settings,
      label: 'Carousels',
      href: '/admin/carousels',
      description: 'Manage your carousels',
    },
    {
      icon: BarChart3,
      label: 'Activities',
      href: '/admin/activities',
      description: 'Track your activities',
    },
    {
      icon: Users,
      label: 'Destinations',
      href: '/admin/destinations',
      description: 'Manage your destinations ',
    },
    {
      icon: Package,
      label: 'Packages',
      href: '/admin/packages',
      description: 'Manage your packages',
    },
    {
      icon: Eye,
      label: 'Review',
      href: '/admin/reviews',
      description: 'Manage your reviews',
    },
    {
      icon: Eye,
      label: 'Faq',
      href: '/admin/faq',
      description: 'Manage your Home page faq',
    },
    {
      icon: Package,
      label: 'Blogs',
      href: '/admin/blogs',
      description: 'Manage your blog posts',
    },
  ];

  console.log(hasToken);
  return hasToken ? (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50 lg:hidden'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-all duration-300',
          collapsed ? 'w-[70px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}>
        {/* Sidebar Header */}
        <div className='flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800'>
          <Link href='/admin' className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary'>
              <span className='text-lg font-bold text-primary-foreground'>
                P
              </span>
            </div>
            {!collapsed && (
              <span className='text-lg font-semibold'>Admin Panel</span>
            )}
          </Link>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setCollapsed(!collapsed)}
            className='hidden lg:flex'>
            <ChevronLeft
              className={cn(
                'h-4 w-4 transition-transform',
                collapsed && 'rotate-180'
              )}
            />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileOpen(false)}
            className='lg:hidden'>
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 overflow-auto p-3'>
          <ul className='space-y-2'>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                    title={!collapsed ? undefined : item.description}>
                    <item.icon
                      className={cn(
                        'h-5 w-5',
                        isActive ? 'text-primary' : 'text-slate-400'
                      )}
                    />
                    {!collapsed && (
                      <div className='flex flex-col'>
                        <span>{item.label}</span>
                        {isActive && (
                          <span className='text-xs font-normal text-slate-500 dark:text-slate-400'>
                            {item.description}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className='border-t border-slate-200 p-4 dark:border-slate-800'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage
                src='/placeholder.svg?height=40&width=40'
                alt='User'
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className='flex-1 overflow-hidden'>
                <p className='text-sm font-medium leading-none'>John Doe</p>
                <p className='text-xs text-slate-500 dark:text-slate-400 truncate'>
                  admin@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-300',
          collapsed ? 'lg:pl-[70px]' : 'lg:pl-64'
        )}>
        {/* Header */}
        <header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileOpen(true)}
            className='lg:hidden'>
            <Menu className='h-5 w-5' />
          </Button>

          <div className='hidden md:flex md:flex-1 md:items-center md:gap-4'>
            <form className='flex-1 md:max-w-sm'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400' />
                <Input
                  type='search'
                  placeholder='Search...'
                  className='w-full bg-slate-100 pl-8 dark:bg-slate-800'
                />
              </div>
            </form>
          </div>

          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='h-5 w-5' />
              <span className='absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-primary'></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage
                      src='/placeholder.svg?height=32&width=32'
                      alt='User'
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className='mr-2 h-4 w-4' />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className='mr-2 h-4 w-4' />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className='mr-2 h-4 w-4' />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className='mr-2 h-4 w-4' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className='p-4'>
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  ) : (
    <></>
  );
}
