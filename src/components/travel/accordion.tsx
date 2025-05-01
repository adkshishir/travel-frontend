'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function TravelAccordion({
  data,
}: {
  data: { question: string; answer: string }[];
}) {
  return (
    <div className='w-full bg-white  rounded-lg'>
      <Accordion
        type='single'
        defaultValue='item-0'
        collapsible
        className='w-full'>
        {
          data.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className='border-b border-gray-200 '>
              <AccordionTrigger className='flex justify-between items-center w-full'>
                <span className='text-[#475569] font-medium text-base'>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className='pt-4 text-gray-500'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        }

      </Accordion>
    </div>
  );
}
