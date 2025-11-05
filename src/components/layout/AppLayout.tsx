import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { RoleSwitcher } from '@/components/shared/RoleSwitcher';
type AppLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({
  children,
  sidebar,
  container = true,
  className,
  contentClassName,
}: AppLayoutProps): JSX.Element {
  return (
    <SidebarProvider defaultOpen={true}>
      {sidebar}
      <SidebarInset className={cn('bg-muted/40 min-h-screen', className)}>
        <div className="absolute left-4 top-4 z-20 md:hidden">
          <SidebarTrigger />
        </div>
        <main>
          {container ? (
            <div
              className={cn(
                'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12',
                contentClassName
              )}
            >
              {children}
            </div>
          ) : (
            <div className={cn(contentClassName)}>{children}</div>
          )}
        </main>
        <footer className="app-footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-muted-foreground text-sm">
            <p>Built with ❤️ at Cloudflare</p>
          </div>
        </footer>
        <div className="ai-notice">
          <p>
            <strong>Note:</strong> AI features have a shared request limit across all users.
          </p>
        </div>
        <RoleSwitcher />
      </SidebarInset>
      <Toaster richColors closeButton />
    </SidebarProvider>
  );
}