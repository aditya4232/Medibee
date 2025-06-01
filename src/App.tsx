
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionProvider from "./components/SessionProvider";
import SessionGuard from "./components/SessionGuard";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analysis = lazy(() => import("./pages/Analysis"));
const Reports = lazy(() => import("./pages/Reports"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <SessionProvider>
            <Suspense fallback={
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading MediBee..." />
              </div>
            }>
              <Routes>
                {/* Public routes - no session required */}
                <Route path="/" element={
                  <SessionGuard requireSession={false} allowedPaths={['/']}>
                    <Index />
                  </SessionGuard>
                } />
                
                <Route path="/privacy" element={
                  <SessionGuard requireSession={false} allowedPaths={['/privacy']}>
                    <PrivacyPolicy />
                  </SessionGuard>
                } />
                
                {/* Protected routes - session required */}
                <Route path="/dashboard" element={
                  <SessionGuard requireSession={true}>
                    <Dashboard />
                  </SessionGuard>
                } />
                
                <Route path="/analysis" element={
                  <SessionGuard requireSession={true}>
                    <Analysis />
                  </SessionGuard>
                } />
                
                <Route path="/reports" element={
                  <SessionGuard requireSession={true}>
                    <Reports />
                  </SessionGuard>
                } />
                
                {/* 404 fallback */}
                <Route path="*" element={
                  <SessionGuard requireSession={false} allowedPaths={['*']}>
                    <NotFound />
                  </SessionGuard>
                } />
              </Routes>
            </Suspense>
          </SessionProvider>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
