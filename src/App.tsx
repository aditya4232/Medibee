
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SessionProvider from "./components/SessionProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import DisclaimerModal from "./components/DisclaimerModal";
import Footer from "./components/Footer";
import WebsiteLoader from "./components/WebsiteLoader";
import MedicalDisclaimer from "./components/MedicalDisclaimer";
import ScrollProgressBar from "./components/ScrollProgressBar";

const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analysis = lazy(() => import("./pages/Analysis"));
const Reports = lazy(() => import("./pages/Reports"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutDeveloper = lazy(() => import("./pages/AboutDeveloper"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <SessionProvider>
            <WebsiteLoader />
            <MedicalDisclaimer />
            <DisclaimerModal />
            <ScrollProgressBar />
            <div className="pt-8">
              <Suspense fallback={
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center">
                  <LoadingSpinner size="lg" text="Loading MediBee..." />
                </div>
              }>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={
                    <>
                      <Index />
                      <Footer />
                    </>
                  } />
                  <Route path="/privacy" element={
                    <>
                      <PrivacyPolicy />
                      <Footer />
                    </>
                  } />
                  <Route path="/about-developer" element={<AboutDeveloper />} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute requireSession={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/analysis" element={
                    <ProtectedRoute requireSession={true}>
                      <Analysis />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/reports" element={
                    <ProtectedRoute requireSession={true}>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </SessionProvider>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
