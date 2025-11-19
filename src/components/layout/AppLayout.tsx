import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SessionsSidebar } from '@/components/SessionsSidebar';
import { cn } from '@/lib/utils';
type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
export function AppLayout({ children, className }: AppLayoutProps): JSX.Element {
  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <SessionsSidebar />
        <SidebarInset className={cn('flex-1 flex flex-col', className)}>
          <div className="absolute left-2 top-2 z-20 md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}