// @ts-nocheck

'use client';

import { useState, useEffect, Key } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  PlusCircle,
  X,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Star,
  Mountain,
  Compass,
  Info,
  CheckCircle,
} from 'lucide-react';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import dynamic from 'next/dynamic';
const CkEditor = dynamic(() => import('@/utils/ck-editor'), { ssr: false });

// Assuming these functions exist in your project
// If not, you'll need to implement them

// Mock endpoints
const ENDPOINTS = {
  PACKAGES: '/api/packages',
  DESTINATIONS: '/api/destinations',
};

const PackageForm = ({
  initialData = null,
  destinations,
}: {
  initialData?: any;
  destinations?: { id: number; name: string }[];
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [maps, setMaps] = useState<any[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    accommodation: initialData?.accommodation || '',
    startFrom: initialData?.startFrom || '',
    endAt: initialData?.endAt || '',
    duration: initialData?.duration || '',
    slug: initialData?.slug || '',
    subtitle: initialData?.subtitle || '',
    altitude: initialData?.altitude || '',
    bestSeason: initialData?.bestSeason || '',
    price: initialData?.price || '',
    videoLink: initialData?.videoLink || '',
    rating: initialData?.rating || 0,
    culture: initialData?.culture || '',
    attractions: initialData?.attractions || '',
    groupSize: initialData?.groupSize || '',
    groupAge: initialData?.groupAge || '',
    nature: initialData?.nature || '',
    activity: initialData?.activity || '',
    overview: initialData?.overview || '',
    itinerary: initialData?.itinerary || '',
    includes: initialData?.includes || '',
    goodtoknow: initialData?.goodtoknow || '',
    highlights: initialData?.highlights || '',
    mapId: initialData?.mapId || '',
    map:undefined,
    destinationId: initialData?.destinationId || '',
    seo: {
      metaTitle: initialData?.seo?.metaTitle || '',
      metaDescription: initialData?.seo?.metaDescription || '',
      metaKeywords: initialData?.seo?.metaKeywords || '',
      mediaId: initialData?.seo?.mediaId || '',
      metaCanonical: initialData?.seo?.metaCanonical || '',
      schema: initialData?.seo?.schema || '',
    },
    mediaIds: initialData?.media?.map((m: { id: any }) => m.id) || [],
    faqs: initialData?.faqs || [{ question: '', answer: '' }],
  });

  // Media state
  const [mainImage, setMainImage] = useState(null);
  const [mainImageAlt, setMainImageAlt] = useState(
    initialData?.media?.alt || ''
  );
  const [seoImage, setSeoImage] = useState(null);
  const [map, setMap] = useState(null);
  const [mapAlt, setMapAlt] = useState(initialData?.map?.alt || '');
  const [seoImageAlt, setSeoImageAlt] = useState(
    initialData?.seo?.media?.alt || ''
  );
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  // Fetch destinations and maps

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          // @ts-ignore
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file changes
  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
    }
  };

  // Handle gallery images
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages([...galleryImages, ...files]);
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Handle FAQs
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    setFormData({
      ...formData,
      faqs: updatedFaqs,
    });
  };

  // Add FAQ
  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }],
    });
  };

  // Remove FAQ
  const removeFaq = (index: Key | null | undefined) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_: any, i: any) => i !== index),
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.slug) newErrors.slug = 'Slug is required';
    if (formData.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      newErrors.slug =
        'Slug must contain only lowercase letters, numbers, and hyphens';
    }
    if (!formData.destinationId)
      newErrors.destinationId = 'Destination is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare payload
      const payload = {
        title: formData.title,
        description: formData.description,
        accommodation: formData.accommodation,
        startFrom: formData.startFrom,
        endAt: formData.endAt,
        duration: formData.duration,
        slug: formData.slug,
        subtitle: formData.subtitle,
        altitude: formData.altitude,
        bestSeason: formData.bestSeason,
        price: formData.price,
        videoLink: formData.videoLink,
        rating: Number(formData.rating),
        culture: formData.culture,
        attractions: formData.attractions,
        groupSize: formData.groupSize,
        groupAge: formData.groupAge,
        nature: formData.nature,
        activity: formData.activity,
        overview: formData.overview,
        itinerary: formData.itinerary,
        includes: formData.includes,
        goodtoknow: formData.goodtoknow,
        highlights: formData.highlights,
        mapId:  undefined,
        destinationId: Number(formData.destinationId),
        seo: {
          metaTitle: formData.seo.metaTitle,
          metaDescription: formData.seo.metaDescription,
          metaKeywords: formData.seo.metaKeywords,
          mediaId: formData.seo.mediaId,
          metaCanonical: formData.seo.metaCanonical,
          schema: formData.seo.schema,
        },
        mediaIds: [],
        faqs: formData.faqs.filter(
          (faq: { question: any; answer: any }) => faq.question && faq.answer
        ),
      };

      // Upload main image if exists
      if (mainImage) {
        const mainImageResponse = await uploadImage({
          img: mainImage,
          folder: 'packages',
          alt: mainImageAlt,
        });

        if (mainImageResponse) {
          payload.mediaIds.push(mainImageResponse.id || undefined);
        }
      }

      // Upload SEO image if exists
      if (seoImage) {
        const seoImageResponse = await uploadImage({
          img: seoImage,
          folder: 'packages/seo',
          alt: seoImageAlt,
        });

        if (seoImageResponse) {
          payload.seo.mediaId = seoImageResponse.id;
        }
      }
      if(map){
        const mapImageResponse = await uploadImage({
          img: map,
          folder: 'packages/map',
          alt: mapAlt,
        });
        if (mapImageResponse) {
          payload.mapId = mapImageResponse.id;
        }
      }

      // Upload gallery images if any
      if (galleryImages.length > 0) {
        const uploadPromises = galleryImages.map((img) =>
          uploadImage({
            img,
            folder: 'packages/gallery',
            alt: 'Gallery image',
          })
        );

        const galleryResponses = await Promise.all(uploadPromises);
        const galleryIds = galleryResponses.map((response) => response.id);
        payload.mediaIds = [...payload.mediaIds, ...galleryIds];
      }

      // Send data to API
      const response = await postAndPatch('packages', payload, initialData?.id);

      if (response.success) {
        router.push('/admin/packages');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>
            {initialData ? 'Edit Package' : 'Create New Package'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='basic' className='w-full'>
            <TabsList className='grid grid-cols-6 mb-8'>
              <TabsTrigger value='basic'>Basic Info</TabsTrigger>
              <TabsTrigger value='details'>Trip Details</TabsTrigger>
              <TabsTrigger value='content'>Content</TabsTrigger>
              <TabsTrigger value='media'>Media</TabsTrigger>
              <TabsTrigger value='faqs'>FAQs</TabsTrigger>
              <TabsTrigger value='seo'>SEO</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value='basic' className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>
                    Title <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Enter package title'
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className='text-red-500 text-sm'>{errors.title}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='slug'>
                    Slug <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='slug'
                    name='slug'
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder='enter-slug-here'
                    className={errors.slug ? 'border-red-500' : ''}
                  />
                  {errors.slug && (
                    <p className='text-red-500 text-sm'>{errors.slug}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='subtitle'>Subtitle</Label>
                  <Input
                    id='subtitle'
                    name='subtitle'
                    value={formData.subtitle}
                    onChange={handleChange}
                    placeholder='Enter subtitle'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='destinationId'>
                    Destination <span className='text-red-500'>*</span>
                  </Label>
                  <Select
                    value={formData.destinationId}
                    onValueChange={(value) =>
                      handleSelectChange('destinationId', value)
                    }>
                    <SelectTrigger
                      className={errors.destinationId ? 'border-red-500' : ''}>
                      <SelectValue placeholder='Select destination' />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations?.map((destination) => (
                        <SelectItem
                          key={destination.id}
                          value={destination.id.toString()}>
                          {destination.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.destinationId && (
                    <p className='text-red-500 text-sm'>
                      {errors.destinationId}
                    </p>
                  )}
                </div>

                <div className='col-span-2 space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Enter package description'
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Trip Details Tab */}
            <TabsContent value='details' className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='duration'>Duration</Label>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <Input
                      id='duration'
                      name='duration'
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder='e.g., 7 days, 6 nights'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='price'>Price</Label>
                  <div className='flex items-center space-x-2'>
                    <DollarSign className='h-4 w-4 text-muted-foreground' />
                    <Input
                      id='price'
                      name='price'
                      value={formData.price}
                      onChange={handleChange}
                      placeholder='e.g., $1,299'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='startFrom'>Start Date</Label>
                  <Input
                    id='startFrom'
                    name='startFrom'
                    value={formData.startFrom}
                    onChange={handleChange}
                    placeholder='e.g., March 15, 2023'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='endAt'>End Date</Label>
                  <Input
                    id='endAt'
                    name='endAt'
                    value={formData.endAt}
                    onChange={handleChange}
                    placeholder='e.g., March 22, 2023'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='accommodation'>Accommodation</Label>
                  <Input
                    id='accommodation'
                    name='accommodation'
                    value={formData.accommodation}
                    onChange={handleChange}
                    placeholder='e.g., 3-star hotels, teahouses'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='groupSize'>Group Size</Label>
                  <div className='flex items-center space-x-2'>
                    <Users className='h-4 w-4 text-muted-foreground' />
                    <Input
                      id='groupSize'
                      name='groupSize'
                      value={formData.groupSize}
                      onChange={handleChange}
                      placeholder='e.g., 2-12 people'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='groupAge'>Age Range</Label>
                  <Input
                    id='groupAge'
                    name='groupAge'
                    value={formData.groupAge}
                    onChange={handleChange}
                    placeholder='e.g., 12+ years'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='rating'>Rating (0-5)</Label>
                  <div className='flex items-center space-x-2'>
                    <Star className='h-4 w-4 text-muted-foreground' />
                    <Input
                      id='rating'
                      name='rating'
                      type='number'
                      min='0'
                      max='5'
                      step='0.1'
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder='4.5'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='altitude'>Altitude</Label>
                  <div className='flex items-center space-x-2'>
                    <Mountain className='h-4 w-4 text-muted-foreground' />
                    <Input
                      id='altitude'
                      name='altitude'
                      value={formData.altitude}
                      onChange={handleChange}
                      placeholder='e.g., Max 5,545m'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='bestSeason'>Best Season</Label>
                  <Input
                    id='bestSeason'
                    name='bestSeason'
                    value={formData.bestSeason}
                    onChange={handleChange}
                    placeholder='e.g., March-May, Sept-Nov'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='activity'>Activity Type</Label>
                  <Input
                    id='activity'
                    name='activity'
                    value={formData.activity}
                    onChange={handleChange}
                    placeholder='e.g., Trekking, Cultural Tour'
                  />
                </div>
              </div>

              <Separator />

              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='culture'>Culture</Label>
                  <Textarea
                    id='culture'
                    name='culture'
                    value={formData.culture}
                    onChange={handleChange}
                    placeholder='Describe cultural aspects'
                    rows={3}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='nature'>Nature</Label>
                  <Textarea
                    id='nature'
                    name='nature'
                    value={formData.nature}
                    onChange={handleChange}
                    placeholder='Describe natural aspects'
                    rows={3}
                  />
                </div>

                <div className='col-span-2 space-y-2'>
                  <Label htmlFor='attractions'>Attractions</Label>
                  <Textarea
                    id='attractions'
                    name='attractions'
                    value={formData.attractions}
                    onChange={handleChange}
                    placeholder='List key attractions'
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value='content' className='space-y-6'>
              <div className='space-y-6'>
                <div className='space-y-2 '>
                  <Label htmlFor='overview'>
                    <Compass className='h-4 w-4 inline mr-2' />
                    Overview
                  </Label>
                  <CkEditor
                    value={formData.overview}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        overview: e,
                      });
                    }}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='highlights'>
                    <Star className='h-4 w-4 inline mr-2' />
                    Highlights
                  </Label>
                  <CkEditor
                    value={formData.highlights}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        highlights: e,
                      });
                    }}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='itinerary'>
                    <MapPin className='h-4 w-4 inline mr-2' />
                    Itinerary
                  </Label>
                  <CkEditor
                    value={formData.itinerary}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        itinerary: e,
                      });
                    }}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='includes'>
                    <CheckCircle className='h-4 w-4 inline mr-2' />
                    Includes
                  </Label>
                  <CkEditor
                    value={formData.includes}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        includes: e,
                      });
                    }}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='goodtoknow'>
                    <Info className='h-4 w-4 inline mr-2' />
                    Good to Know
                  </Label>
                  <CkEditor
                    value={formData.goodtoknow}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        goodtoknow: e,
                      });
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value='media' className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='mainImage'>Main Image</Label>
                    <div className='flex items-center gap-2'>
                      <Input
                        id='mainImage'
                        type='file'
                        accept='image/*'
                        onChange={(e) => handleFileChange(e, setMainImage)}
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='mainImageAlt'>Main Image Alt Text</Label>
                    <Input
                      id='mainImageAlt'
                      value={mainImageAlt}
                      onChange={(e) => setMainImageAlt(e.target.value)}
                      placeholder='Describe the image'
                    />
                  </div>
                </div>

                <div className='grid  items-center'>
                  <div className='space-y-2'>
                    <Label htmlFor='videoLink'>Video Link</Label>
                    <Input
                      id='videoLink'
                      name='videoLink'
                      value={formData.videoLink}
                      onChange={handleChange}
                      placeholder='YouTube or Vimeo URL'
                    />
                  </div>
                  <div>
                    <div className='space-y-2'>
                      <Label htmlFor='map'>Map</Label>
                      <Input
                        id='map'
                        type='file'
                        accept='image/*'
                        onChange={(e) => handleFileChange(e, setMap)}
                      />
                    </div>
                  </div>
                </div>

                <div className='col-span-2 space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='galleryImages'>Gallery Images</Label>
                    <Input
                      id='galleryImages'
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={handleGalleryImages}
                    />
                  </div>

                  {galleryImages.length > 0 && (
                    <div className='space-y-2'>
                      <Label>Selected Gallery Images</Label>
                      <div className='grid grid-cols-4 gap-4'>
                        {galleryImages.map((image, index) => (
                          <div key={index} className='relative group'>
                            <div className='aspect-square bg-muted rounded-md flex items-center justify-center overflow-hidden'>
                              <div className='text-sm text-center p-2'>
                                {image.name}
                              </div>
                            </div>
                            <button
                              type='button'
                              onClick={() => removeGalleryImage(index)}
                              className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                              <X className='h-4 w-4' />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value='faqs' className='space-y-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <Label>Frequently Asked Questions</Label>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={addFaq}>
                    <PlusCircle className='h-4 w-4 mr-2' />
                    Add FAQ
                  </Button>
                </div>

                {formData.faqs.map(
                  (
                    faq: {
                      question: string | number | readonly string[] | undefined;
                      answer: string | number | readonly string[] | undefined;
                    },
                    index: Key | null | undefined
                  ) => (
                    <Card key={index} className='relative'>
                      <CardContent className='pt-6'>
                        <div className='absolute top-2 right-2'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            onClick={() => removeFaq(index)}
                            className='h-8 w-8 p-0 text-red-500'>
                            <X className='h-4 w-4' />
                          </Button>
                        </div>

                        <div className='space-y-4'>
                          <div className='space-y-2'>
                            <Label htmlFor={`faq-question-${index}`}>
                              Question
                            </Label>
                            <Input
                              id={`faq-question-${index}`}
                              value={faq.question}
                              onChange={(e) =>
                                handleFaqChange(
                                  index,
                                  'question',
                                  e.target.value
                                )
                              }
                              placeholder='Enter question'
                            />
                          </div>

                          <div className='space-y-2'>
                            <Label htmlFor={`faq-answer-${index}`}>
                              Answer
                            </Label>
                            <Textarea
                              id={`faq-answer-${index}`}
                              value={faq.answer}
                              onChange={(e) =>
                                handleFaqChange(index, 'answer', e.target.value)
                              }
                              placeholder='Enter answer'
                              rows={3}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value='seo' className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='seo.metaTitle'>Meta Title</Label>
                  <Input
                    id='seo.metaTitle'
                    name='seo.metaTitle'
                    value={formData.seo.metaTitle}
                    onChange={handleChange}
                    placeholder='Enter meta title'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='seo.metaKeywords'>Meta Keywords</Label>
                  <Input
                    id='seo.metaKeywords'
                    name='seo.metaKeywords'
                    value={formData.seo.metaKeywords}
                    onChange={handleChange}
                    placeholder='Enter meta keywords'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='seo.metaCanonical'>Canonical URL</Label>
                  <Input
                    id='seo.metaCanonical'
                    name='seo.metaCanonical'
                    value={formData.seo.metaCanonical}
                    onChange={handleChange}
                    placeholder='https://example.com/page'
                  />
                </div>

                <div className='col-span-2 space-y-2'>
                  <Label htmlFor='seo.metaDescription'>Meta Description</Label>
                  <Textarea
                    id='seo.metaDescription'
                    name='seo.metaDescription'
                    value={formData.seo.metaDescription}
                    onChange={handleChange}
                    placeholder='Enter meta description'
                    rows={3}
                  />
                </div>

                <div className='col-span-2 space-y-2'>
                  <Label htmlFor='seo.schema'>Schema Markup (JSON-LD)</Label>
                  <Textarea
                    id='seo.schema'
                    name='seo.schema'
                    value={formData.seo.schema}
                    onChange={handleChange}
                    placeholder='Enter schema JSON-LD'
                    rows={5}
                  />
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='seoImage'>SEO Image</Label>
                    <Input
                      id='seoImage'
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleFileChange(e, setSeoImage)}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='seoImageAlt'>SEO Image Alt Text</Label>
                    <Input
                      id='seoImageAlt'
                      value={seoImageAlt}
                      onChange={(e) => setSeoImageAlt(e.target.value)}
                      placeholder='Describe the SEO image'
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className='flex justify-end space-x-4'>
        <Button
          type='button'
          variant='outline'
          onClick={() => router.push('/admin/packages')}>
          Cancel
        </Button>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving...'
            : initialData
            ? 'Update Package'
            : 'Create Package'}
        </Button>
      </div>
    </form>
  );
};

export default PackageForm;
