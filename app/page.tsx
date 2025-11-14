'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, MapPin, Clock, ChevronRight, Star, Scissors, Palette, Sparkles, ChevronLeft, ChevronRight as RightIcon } from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Hero Carousel Images
  const carouselImages = [
    {
      src: '/images/hero-salon.jpg',
      alt: 'Luxury Salon Interior',
      title: 'Premium Salon Experience',
      description: 'Step into our elegant, modern space designed for your comfort'
    },
    {
      src: '/images/gallery-1.jpg',
      alt: 'Hair Styling Service',
      title: 'Expert Hair Styling',
      description: 'Transform your look with our talented stylists'
    },
    {
      src: '/images/gallery-2.jpg',
      alt: 'Color Treatment',
      title: 'Vibrant Color Services',
      description: 'Experience stunning color transformations'
    }
  ]

  // Services data
  const services = [
    {
      icon: <Scissors className="w-8 h-8" />,
      name: 'Precision Cuts',
      description: 'Expert haircuts tailored to your style',
      price: 'From $35',
      image: '/images/service-women.jpg'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      name: 'Color & Highlights',
      description: 'Vibrant colors and beautiful highlights',
      price: 'From $150',
      image: '/images/service-special.jpg'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      name: 'Special Treatments',
      description: 'Premium hair treatments and styling',
      price: 'From $200',
      image: '/images/service-men.jpg'
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Best salon experience in Atlanta! The stylists are true artists.',
      rating: 5,
      image: '/images/staff-1.jpg'
    },
    {
      name: 'James L.',
      text: 'Finally found a salon that understands my hair needs perfectly.',
      rating: 5,
      image: '/images/staff-2.jpg'
    },
    {
      name: 'Emily R.',
      text: 'The color treatment exceeded all my expectations. Absolutely stunning!',
      rating: 5,
      image: '/images/staff-3.jpg'
    }
  ]

  // Auto-advance carousels
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => {
      clearInterval(heroTimer)
      clearInterval(testimonialTimer)
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Bigger with actual image */}
            <Link href="/" className="flex items-center">
              <div className="relative w-16 h-16">
                <Image
                  src="/logos/logo.png"
                  alt="Myy Signature Myy Style"
                  width={64}
                  height={64}
                  className="object-contain rounded-2xl"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#6A8EA4] transition-colors font-medium">
                Home
              </Link>
              <Link href="/customer/booking" className="text-gray-700 hover:text-[#6A8EA4] transition-colors font-medium">
                Services
              </Link>
              <Link href="/customer/booking" className="text-gray-700 hover:text-[#6A8EA4] transition-colors font-medium">
                Book Now
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-[#6A8EA4] transition-colors font-medium">
                Admin
              </Link>
              <Link 
                href="/customer/booking" 
                className="bg-gradient-to-r from-[#6A8EA4] to-[#5a7a90] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-4 space-y-1">
                <Link 
                  href="/" 
                  className="block px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/customer/booking" 
                  className="block px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/customer/booking" 
                  className="block px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
                <Link 
                  href="/admin" 
                  className="block px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <Link 
                  href="/customer/booking" 
                  className="block px-3 py-3 bg-gradient-to-r from-[#6A8EA4] to-[#5a7a90] text-white rounded-lg text-center font-semibold hover:shadow-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <div className="pt-20 min-h-screen flex items-center relative">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <RightIcon className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-white">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {carouselImages[currentSlide].title}
                </h1>
                <p className="text-xl opacity-90 leading-relaxed">
                  {carouselImages[currentSlide].description}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 opacity-90">
                  <Star className="w-5 h-5 text-white" />
                  <span className="font-medium">5-Star Rated</span>
                </div>
                <div className="flex items-center space-x-2 opacity-90">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="font-medium">Flexible Hours</span>
                </div>
                <div className="flex items-center space-x-2 opacity-90">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="font-medium">Prime Location</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/customer/booking"
                  className="bg-white text-[#6A8EA4] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <span>Book Your Appointment</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="tel:404-555-0123"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#6A8EA4] transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>(404) 555-0123</span>
                </Link>
              </div>
            </div>

            {/* Right Content - Services Preview */}
            <div className="space-y-6">
              {/* Services Cards */}
              <div className="grid gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group cursor-pointer"
                    onClick={() => window.location.href = '/customer/booking'}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6A8EA4] to-[#5a7a90] opacity-20"></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{service.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#6A8EA4] text-lg">{service.price}</p>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#6A8EA4] transition-colors mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials Carousel */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="font-semibold text-gray-900 mb-4">What Our Clients Say</h3>
                <div className="relative">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className={`transition-opacity duration-500 ${
                        index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-1 mb-2">
                            {renderStars(testimonial.rating)}
                          </div>
                          <p className="text-gray-700 text-sm italic">"{testimonial.text}"</p>
                          <p className="text-gray-900 font-semibold text-sm mt-2">— {testimonial.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Testimonial Controls */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentTestimonial ? 'bg-[#6A8EA4] scale-125' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={prevTestimonial}
                        className="p-1 text-gray-400 hover:text-[#6A8EA4] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="p-1 text-gray-400 hover:text-[#6A8EA4] transition-colors"
                      >
                        <RightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="mt-16 border-t border-white/20 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              <div className="flex flex-col items-center space-y-2">
                <MapPin className="w-6 h-6" />
                <div>
                  <p className="font-semibold">123 Salon Street</p>
                  <p className="opacity-90 text-sm">Atlanta, GA 30301</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Clock className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Open Today</p>
                  <p className="opacity-90 text-sm">9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Phone className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="opacity-90 text-sm">(404) 555-0123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}