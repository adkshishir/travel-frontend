"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

import { Button } from "@/components/ui/button"
import TestimonialCard from "./testimonial-card"

const testimonials = [
  {
    name: "John Snow",
    quote:
      "As a seasoned traveler, I can confidently say that Tourica is one of the best travel agencies I've had the pleasure of working.",
    rating: 5,
    avatarUrl: "/images/hero.jpg",
    role: "Customer",
  },
  {
    name: "Sarah Johnson",
    quote: "Their attention to detail and personalized service made our family vacation absolutely perfect!",
    rating: 5,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Customer",
  },
  {
    name: "Michael Chen",
    quote: "The team went above and beyond to accommodate our last-minute changes. Truly exceptional service.",
    rating: 4,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Business Traveler",
  },
  {
    name: "Emma Rodriguez",
    quote: "From booking to return, every aspect of our journey was handled with professionalism and care.",
    rating: 5,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Customer",
  },
  {
    name: "David Wilson",
    quote: "I've recommended Tourica to all my colleagues. They make business travel stress-free and enjoyable.",
    rating: 4,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Corporate Client",
  },
]

export function TestimonialCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()

  return (
    <div className="relative max-w-full mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="lg:-ml-4">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="lg:pl-4 md:basis-1/2 lg:basis-1/3">
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center gap-2 mt-6">
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => api?.scrollPrev()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => api?.scrollNext()}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Carousel>
    </div>
  )
}

