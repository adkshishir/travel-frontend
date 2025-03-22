'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function TravelAccordion() {
  return (
    <div className='w-full bg-white p-6 rounded-lg'>
      <Accordion
        type='single'
        defaultValue='item-1'
        collapsible
        className='w-full'>
        <AccordionItem value='item-1' className='border-b border-gray-200 '>
          <AccordionTrigger className='flex justify-between items-center w-full'>
            <span className='text-[#475569] font-medium text-base'>
              What destinations do you offer tours to
            </span>
            {/* <ChevronUp className='h-5 w-5 text-gray-400 shrink-0 transition-transform' /> */}
          </AccordionTrigger>
          <AccordionContent className='pt-4 text-gray-500'>
            Quisque rutrum. Aenean imperdl. Etiam ultricies nisi vel augue.
            Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
            Maecenas tempus, tellus eget.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-3' className='border-b border-gray-200 '>
          <AccordionTrigger className='flex justify-between items-center w-full'>
            <span className='text-[#475569] font-medium text-base'>
              What is included in the tour package?
            </span>
          </AccordionTrigger>
          <AccordionContent className='pt-4 text-gray-500'>
            Our tour packages typically include accommodation, transportation,
            guided tours, entrance fees to attractions, some meals, and 24/7
            customer support. Specific inclusions vary by package and are
            detailed in each tour description.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-4' className='border-b border-gray-200 '>
          <AccordionTrigger className='flex justify-between items-center w-full'>
            <span className='text-[#475569] font-medium text-base'>
              What should I pack for my trip?
            </span>
          </AccordionTrigger>
          <AccordionContent className='pt-4 text-gray-500'>
            We recommend packing weather-appropriate clothing, comfortable
            walking shoes, travel documents, basic medications, adapters for
            electronic devices, and any personal items you may need. A detailed
            packing list will be provided based on your specific destination and
            the season of travel.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
