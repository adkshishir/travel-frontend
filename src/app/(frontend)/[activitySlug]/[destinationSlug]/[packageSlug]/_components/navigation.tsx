'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NavigationProps {
  packageData?: any;
}

const allTabs = [
  { id: 'overview', label: 'Overview', condition: (pack: any) => pack?.overview },
  { id: 'highlights', label: 'Highlights', condition: (pack: any) => pack?.highlights },
  // { id: 'experience', label: 'Experience', condition: (pack: any) => pack?.culture || pack?.attractions || pack?.nature || pack?.activity },
  { id: 'itinerary', label: 'Itinerary', condition: (pack: any) => pack?.itinerary },
  { id: 'inclusions', label: 'Include & Exclude', condition: (pack: any) => pack?.includes },
  // { id: 'accommodation', label: 'Accommodation', condition: (pack: any) => pack?.accommodation },
  { id: 'good-to-know', label: 'Good To Know', condition: (pack: any) => pack?.goodtoknow },
  { id: 'map', label: 'Map', condition: (pack: any) => pack?.map?.original },
  { id: 'faq', label: 'FAQ', condition: (pack: any) => pack?.faqs && pack.faqs.length > 0 },
];

export function Navigation({ packageData }: NavigationProps) {
  const [activeTab, setActiveTab] = useState('');
  const [visibleTabs, setVisibleTabs] = useState<typeof allTabs>([]);

  // Filter tabs based on available content
  useEffect(() => {
    if (packageData) {
      const availableTabs = allTabs.filter(tab => tab.condition(packageData));
      setVisibleTabs(availableTabs);
      
      // Set the first available tab as active
      if (availableTabs.length > 0 && !activeTab) {
        setActiveTab(availableTabs[0].id);
      }
    }
  }, [packageData, activeTab]);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveTab(sectionId);
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = visibleTabs.map(tab => ({
        id: tab.id,
        element: document.getElementById(tab.id)
      })).filter(section => section.element);

      const scrollPosition = window.scrollY + 150; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleTabs]);

  // Don't render if no tabs are visible
  if (visibleTabs.length === 0) {
    return null;
  }

  return (
    <div className='mt-6 mb-6 sticky top-16 z-10 bg-white/95 backdrop-blur-sm border-b shadow-sm'>
      <div className='max-w-[1180px] mx-auto px-4'>
        <div className='overflow-x-auto scrollbar-hide'>
          <Tabs value={activeTab} onValueChange={scrollToSection} className='w-full'>
            <TabsList className='h-12 w-full justify-start bg-transparent border-0 p-0 space-x-0'>
              {visibleTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className='
                    relative h-12 rounded-none border-b-2 border-transparent 
                    bg-transparent px-4 py-2 text-sm font-medium 
                    text-muted-foreground transition-all duration-200
                    hover:text-foreground hover:border-muted-foreground/50
                    focus-visible:ring-0 focus-visible:ring-offset-0 
                    data-[state=active]:border-primary 
                    data-[state=active]:text-primary 
                    data-[state=active]:bg-transparent
                    data-[state=active]:shadow-none
                    whitespace-nowrap min-w-fit
                  '
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
