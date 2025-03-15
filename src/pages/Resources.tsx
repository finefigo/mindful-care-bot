
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import ResourcesSection from '@/components/ResourcesSection';

const Resources = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <Header />
      
      <main className="pt-20 pb-16 px-4">
        <ResourcesSection />
      </main>
      
      <footer className="border-t border-neutral-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Mindful. All rights reserved. 
          </p>
          <p className="text-neutral-400 text-xs mt-2">
            These resources are provided for informational purposes only and are not intended to replace 
            professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Resources;
