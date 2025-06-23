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
  data: { question: string; answer: string }[] | undefined;
}) {
  return (
    <div className='w-full  rounded-lg'>
      <Accordion
        type='single'
        defaultValue='item-0'
        collapsible
        className='w-full bg-white  rounded-xl'>
        {data?.map((item, index) => (
        index<8 &&  <AccordionItem
            key={index}
            value={`item-${index}`}
            className='border-b border-gray-200 '>
            <AccordionTrigger className='flex px-4 lg:px-8 justify-between items-center w-full'>
              <span className='text-[#475569] font-medium text-base'>
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className='pt-4 px-4 lg:px-8 text-gray-500'>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
