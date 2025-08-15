'use client';
import {
  DynamicForm,
  type FormConfig,
} from '@/components/admin-dynamics/form/form';
import ENDPOINTS from '@/utils/endpoints';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PackageForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
    initialData?.faqs || [{ question: '', answer: '' }]
  );
  const [mediaIds, setMediaIds] = useState<string[]>(
    initialData?.mediaIds || []
  );

  const config: FormConfig = {
    fields: [
      // Basic Information Section

      {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter title',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.title || '',
      },
      {
        name: 'subtitle',
        label: 'Subtitle',
        type: 'text',
        placeholder: 'Enter subtitle',
        required: false,
        defaultValue: initialData?.subtitle || '',
      },
      {
        name: 'slug',
        label: 'Slug',
        type: 'text',
        placeholder: 'Enter slug',
        required: true,
        validation: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        },
        defaultValue: initialData?.slug || '',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description',
        required: true,
        defaultValue: initialData?.description || '',
      },
      {
        name: 'destinationId',
        label: 'Destination',
        type: 'select',
        placeholder: 'Select destination',
        required: true,
        defaultValue: initialData?.destinationId || '',
        options: [], // Will be populated with destinations from API
      },

      {
        name: 'accommodation',
        label: 'Accommodation',
        type: 'textarea',
        placeholder: 'Enter accommodation details',
        required: false,
        defaultValue: initialData?.accommodation || '',
      },
      {
        name: 'startFrom',
        label: 'Start From',
        type: 'text',
        placeholder: 'Enter start location',
        required: false,
        defaultValue: initialData?.startFrom || '',
      },
      {
        name: 'endAt',
        label: 'End At',
        type: 'text',
        placeholder: 'Enter end location',
        required: false,
        defaultValue: initialData?.endAt || '',
      },
      {
        name: 'duration',
        label: 'Duration',
        type: 'text',
        placeholder: 'e.g., 7 days / 6 nights',
        required: false,
        defaultValue: initialData?.duration || '',
      },
      {
        name: 'price',
        label: 'Price',
        type: 'text',
        placeholder: 'Enter price',
        required: false,
        defaultValue: initialData?.price || '',
      },
      {
        name: 'groupSize',
        label: 'Group Size',
        type: 'text',
        placeholder: 'e.g., 2-12 people',
        required: false,
        defaultValue: initialData?.groupSize || '',
      },
      {
        name: 'groupAge',
        label: 'Group Age',
        type: 'text',
        placeholder: 'e.g., 18+ years',
        required: false,
        defaultValue: initialData?.groupAge || '',
      },

      {
        name: 'altitude',
        label: 'Altitude',
        type: 'text',
        placeholder: 'e.g., 1200-3500m',
        required: false,
        defaultValue: initialData?.altitude || '',
      },
      {
        name: 'bestSeason',
        label: 'Best Season',
        type: 'text',
        placeholder: 'e.g., March-May, September-November',
        required: false,
        defaultValue: initialData?.bestSeason || '',
      },
      {
        name: 'rating',
        label: 'Rating',
        type: 'number',
        placeholder: 'Enter rating (0-5)',
        required: false,
        validation: {
          min: 0,
          max: 5,
        },
        defaultValue: initialData?.rating || 0,
      },
      {
        name: 'culture',
        label: 'Culture',
        type: 'textarea',
        placeholder: 'Enter cultural information',
        required: false,
        defaultValue: initialData?.culture || '',
      },
      {
        name: 'attractions',
        label: 'Attractions',
        type: 'textarea',
        placeholder: 'Enter attractions information',
        required: false,
        defaultValue: initialData?.attractions || '',
      },
      {
        name: 'nature',
        label: 'Nature',
        type: 'textarea',
        placeholder: 'Enter nature information',
        required: false,
        defaultValue: initialData?.nature || '',
      },
      {
        name: 'activity',
        label: 'Activity',
        type: 'textarea',
        placeholder: 'Enter activity information',
        required: false,
        defaultValue: initialData?.activity || '',
      },

      {
        name: 'overview',
        label: 'Overview',
        type: 'richtext',
        placeholder: 'Enter overview',
        required: false,
        defaultValue: initialData?.overview || '',
      },
      {
        name: 'itinerary',
        label: 'Itinerary',
        type: 'richtext',
        placeholder: 'Enter itinerary details',
        required: false,
        defaultValue: initialData?.itinerary || '',
      },
      {
        name: 'includes',
        label: 'Includes',
        type: 'richtext',
        placeholder: "Enter what's included",
        required: false,
        defaultValue: initialData?.includes || '',
      },
      {
        name: 'goodtoknow',
        label: 'Good to Know',
        type: 'richtext',
        placeholder: 'Enter good to know information',
        required: false,
        defaultValue: initialData?.goodtoknow || '',
      },
      {
        name: 'highlights',
        label: 'Highlights',
        type: 'richtext',
        placeholder: 'Enter highlights',
        required: false,
        defaultValue: initialData?.highlights || '',
      },

      {
        name: 'videoLink',
        label: 'Video Link',
        type: 'text',
        placeholder: 'Enter YouTube or Vimeo link',
        required: false,
        defaultValue: initialData?.videoLink || '',
      },
      {
        name: 'mapId',
        label: 'Map',
        type: 'select',
        placeholder: 'Select map',
        required: false,
        defaultValue: initialData?.mapId || '',
        options: [], // Will be populated with maps from API
      },
      {
        name: 'mainMedia',
        label: 'Main Image',
        type: 'file',
        required: false,
      },
      {
        name: 'mainMediaAlt',
        label: 'Main Image Alt',
        type: 'text',
        required: false,
        defaultValue: initialData?.media?.alt || '',
      },
      // Note: mediaIds array will be handled with a custom component

      {
        name: 'metaTitle',
        label: 'Meta Title',
        type: 'text',
        placeholder: 'Enter meta title',
        required: false,
        defaultValue: initialData?.seo?.metaTitle || '',
      },
      {
        name: 'metaKeywords',
        label: 'Meta Keywords',
        type: 'text',
        placeholder: 'Enter meta keywords',
        required: false,
        defaultValue: initialData?.seo?.metaKeywords || '',
      },
      {
        name: 'seomedia',
        label: 'Og Image',
        type: 'file',
        required: false,
      },
      {
        name: 'seomediaAlt',
        label: 'Og Image Alt',
        type: 'text',
        required: false,
        defaultValue: initialData?.seo?.media?.alt || '',
      },
      {
        name: 'metaCanonical',
        label: 'Canonical URL',
        type: 'text',
        placeholder: 'https://example.com/page',
        required: false,
        defaultValue: initialData?.seo?.metaCanonical || '',
      },
      {
        name: 'metaDescription',
        label: 'Meta Description',
        type: 'textarea',
        placeholder: 'Enter meta description',
        required: false,
        defaultValue: initialData?.seo?.metaDescription || '',
      },
      {
        name: 'schema',
        label: 'Schema Markup',
        type: 'textarea',
        placeholder: 'Enter schema JSON-LD',
        required: false,
        defaultValue: initialData?.seo?.schema || '',
      },
    ],
    submitLabel: initialData ? 'Update Tour' : 'Add Tour',
  };

  // Fetch destinations and maps for select options

  // Custom component for handling FAQs
  const FAQsManager = () => {
    const addFAQ = () => {
      setFaqs([...faqs, { question: '', answer: '' }]);
    };

    const removeFAQ = (index: number) => {
      const newFaqs = [...faqs];
      newFaqs.splice(index, 1);
      setFaqs(newFaqs);
    };

    const updateFAQ = (
      index: number,
      field: 'question' | 'answer',
      value: string
    ) => {
      const newFaqs = [...faqs];
      newFaqs[index][field] = value;
      setFaqs(newFaqs);
    };

    return (
      <div className='space-y-4 mt-6 mb-6'>
        <h3 className='text-lg font-medium'>FAQs</h3>
        {faqs.map((faq, index) => (
          <div key={index} className='p-4 border rounded-md space-y-2'>
            <div className='flex justify-between items-center'>
              <h4 className='font-medium'>FAQ #{index + 1}</h4>
              <button
                type='button'
                onClick={() => removeFAQ(index)}
                className='text-red-500 hover:text-red-700'>
                Remove
              </button>
            </div>
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Question</label>
              <input
                type='text'
                value={faq.question}
                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                className='w-full p-2 border rounded-md'
                placeholder='Enter question'
              />
            </div>
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Answer</label>
              <textarea
                value={faq.answer}
                onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                className='w-full p-2 border rounded-md'
                rows={3}
                placeholder='Enter answer'
              />
            </div>
          </div>
        ))}
        <button
          type='button'
          onClick={addFAQ}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
          Add FAQ
        </button>
      </div>
    );
  };

  // Custom component for handling multiple media uploads
  const MediaManager = () => {
    const [galleryImages, setGalleryImages] = useState<File[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files);
        setGalleryImages([...galleryImages, ...filesArray]);
      }
    };

    const removeImage = (index: number) => {
      const newImages = [...galleryImages];
      newImages.splice(index, 1);
      setGalleryImages(newImages);
    };

    return (
      <div className='space-y-4 mt-6 mb-6'>
        <h3 className='text-lg font-medium'>Gallery Images</h3>
        <div className='flex flex-wrap gap-4'>
          {galleryImages.map((image, index) => (
            <div key={index} className='relative w-24 h-24'>
              <img
                src={URL.createObjectURL(image) || '/placeholder.svg'}
                alt={`Gallery image ${index + 1}`}
                className='w-full h-full object-cover rounded-md'
              />
              <button
                type='button'
                onClick={() => removeImage(index)}
                className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center'>
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={handleImageChange}
          className='block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100'
        />
        <p className='text-sm text-gray-500'>
          You can select multiple images for the gallery
        </p>
      </div>
    );
  };

  async function handleSubmit(data: any) {
    // Extract file fields
    const { mainMedia, seomedia, ...rest } = data;

    // Prepare the base payload
    const payload: any = {
      title: data.title || initialData?.title || '',
      subtitle: data.subtitle || initialData?.subtitle || '',
      description: data.description || initialData?.description || '',
      slug: data.slug || initialData?.slug || '',
      accommodation: data.accommodation || initialData?.accommodation || '',
      startFrom: data.startFrom || initialData?.startFrom || '',
      endAt: data.endAt || initialData?.endAt || '',
      duration: data.duration || initialData?.duration || '',
      price: data.price || initialData?.price || '',
      videoLink: data.videoLink || initialData?.videoLink || '',
      rating: data.rating || initialData?.rating || 0,
      culture: data.culture || initialData?.culture || '',
      attractions: data.attractions || initialData?.attractions || '',
      groupSize: data.groupSize || initialData?.groupSize || '',
      groupAge: data.groupAge || initialData?.groupAge || '',
      nature: data.nature || initialData?.nature || '',
      activity: data.activity || initialData?.activity || '',
      overview: data.overview || initialData?.overview || '',
      itinerary: data.itinerary || initialData?.itinerary || '',
      includes: data.includes || initialData?.includes || '',
      goodtoknow: data.goodtoknow || initialData?.goodtoknow || '',
      highlights: data.highlights || initialData?.highlights || '',
      altitude: data.altitude || initialData?.altitude || '',
      bestSeason: data.bestSeason || initialData?.bestSeason || '',
      destinationId: data.destinationId || initialData?.destinationId || 0,
      mapId: data.mapId || initialData?.mapId || 0,
      faqs: faqs,
      mediaIds: [...(initialData?.mediaIds || [])], // Start with existing mediaIds
      seo: {
        metaTitle: data.metaTitle || initialData?.seo?.metaTitle || '',
        metaKeywords: data.metaKeywords || initialData?.seo?.metaKeywords || '',
        metaCanonical:
          data.metaCanonical || initialData?.seo?.metaCanonical || '',
        metaDescription:
          data.metaDescription || initialData?.seo?.metaDescription || '',
        schema: data.schema || initialData?.seo?.schema || '',
        mediaId: undefined,
      },
    };

    // Handle main media upload
    if (mainMedia) {
      const response = await uploadImage({
        img: data.mainMedia,
        folder: 'tours',
        alt: data.mainMediaAlt || initialData?.media?.alt,
        showSuccessMessage: false,
      });
      if (response) {
        payload.mediaId = response.id || initialData?.mediaId || undefined;
      }
    }

    // Handle SEO media upload
    if (seomedia) {
      const response = await uploadImage({
        img: data.seomedia,
        folder: 'tours',
        alt: data.seomediaAlt || initialData?.seo?.media?.alt,
        showSuccessMessage: false,
      });
      if (response) {
        payload.seo.mediaId =
          response.id || initialData?.seo?.mediaId || undefined;
      }
    }

    // Handle gallery images upload
    const galleryInputElement = document.querySelector(
      'input[type="file"][multiple]'
    ) as HTMLInputElement;
    if (
      galleryInputElement &&
      galleryInputElement.files &&
      galleryInputElement.files.length > 0
    ) {
      const files = Array.from(galleryInputElement.files);

      // Upload each gallery image
      for (const file of files) {
        const response = await uploadImage({
          img: file,
          folder: 'tours/gallery',
          alt: `Gallery image for ${data.title}`,
          showSuccessMessage: false,
        });

        if (response && response.id) {
          payload.mediaIds.push(response.id);
        }
      }
    }

    // Submit the form
    const responseData = await postAndPatch(
      ENDPOINTS.PACKAGES,
      payload,
      initialData?.id
    );
    if (responseData) {
      router.push('/admin/tours');
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            {initialData ? 'Edit Package' : 'Create New Package'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the package information below.' 
              : 'Fill in the details to create a new travel package.'
            }
          </p>
        </div>
        
        <div className="p-6">
          <DynamicForm config={config} onSubmit={handleSubmit} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <FAQsManager />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <MediaManager />
        </div>
      </div>
    </div>
  );
};

export default PackageForm;
