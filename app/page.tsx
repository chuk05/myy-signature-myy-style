'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, MapPin, Clock, ChevronRight, Star, Scissors, Palette, Sparkles, ChevronLeft, ChevronRight as RightIcon, Search, ShoppingCart, User } from 'lucide-react'
import { salonInfo } from '@/lib/constants'
import { useOpeningStatus } from '@/hooks/useOpeningStatus'
import ProfileDropdown from '@/components/ui/ProfileDropdown'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { isOpen } = useOpeningStatus()

  // Header expansion content
  const headerContent = {
    title: "Atlanta Premier: Hair Design",
    expandedText: "Founded in 2010, Atlanta Premier Hair Design has been serving the community with exceptional hair care services. Our journey began with a simple vision: to create a space where artistry meets personalized care. Over the years, we've grown into a team of passionate stylists dedicated to making every client feel beautiful and confident. We believe in the power of transformation - not just of hair, but of spirit."
  }

  // Hero Carousel Images
  const carouselImages = [
    {
      src: '/images/home/hero-salon.jpg',
      alt: 'Luxury Salon Interior',
      title: 'Premium Salon Experience',
      description: 'Step into our elegant, modern space designed for your comfort'
    },
    {
      src: '/images/home/gallery-1.jpg',
      alt: 'Hair Styling Service',
      title: 'Expert Hair Styling',
      description: 'Transform your look with our talented stylists'
    },
    {
      src: '/images/home/gallery-2.jpg',
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
      image: '/images/categories/womens-haircut.jpg',
      link: '/services/booking?category=women'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      name: 'Color & Highlights',
      description: 'Vibrant colors and beautiful highlights',
      price: 'From $150',
      image: '/images/categories/color-treatment.jpg',
      link: '/services/booking?category=color'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      name: 'Special Treatments',
      description: 'Premium hair treatments and styling',
      price: 'From $200',
      image: '/images/categories/keratin-treatment.jpg',
      link: '/services/booking?category=special'
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Best salon experience in Atlanta! The stylists are true artists.',
      rating: 5,
      image: '/images/staff/staff-1.jpg'
    },
    {
      name: 'James L.',
      text: 'Finally found a salon that understands my hair needs perfectly.',
      rating: 5,
      image: '/images/staff/staff-2.jpg'
    },
    {
      name: 'Emily R.',
      text: 'The color treatment exceeded all my expectations. Absolutely stunning!',
      rating: 5,
      image: '/images/staff/staff-3.jpg'
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
        className={`w-4 h-4 ${i < rating ? 'text-[#FFD700] fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header Bar */}
      <header className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
            className="w-full py-3 text-center hover:bg-[#2A2A2A] transition-colors"
          >
            <span className="text-lg font-semibold hover:text-[#FFD700] transition-colors">
              {headerContent.title}
            </span>
          </button>
          
          {/* Expandable Content */}
          {isHeaderExpanded && (
            <div className="bg-[#2A2A2A] px-6 py-4 border-t border-[#3A3A3A]">
              <p className="text-[#F8F9FA] leading-relaxed max-w-4xl mx-auto text-center">
                {headerContent.expandedText}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Left - 4x Bigger, Centered Height, No Round, No BG Color */}
            <Link href="/" className="flex items-center h-full py-4">
              <div className="relative h-full flex items-center">
                <Image
                  src="/images/logos/logo-white.png"
                  alt="Myy Signature Myy Style"
                  width={360}
                  height={64}
                  className="object-contain h-full w-auto"
                  style={{ 
                    borderRadius: '0',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </Link>

            {/* Navigation Pages - Middle */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-[#FFD700] font-semibold border-b-2 border-[#FFD700] flex items-center space-x-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
              </Link>
              <Link href="/services" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Services
              </Link>
              <Link href="/gallery" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/staff" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Our Team
              </Link>
              <Link href="/shop" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Shop
              </Link>
              <Link 
                href="/services/booking" 
                className="bg-[#FFD700] text-[#1A1A1A] px-6 py-3 rounded-full font-semibold hover:bg-[#B39700] transition-all duration-300"
              >
                Book Now
              </Link>
            </div>

            {/* Right Section - Profile, Basket, Search */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors">
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#1A1A1A] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>

              {/* Profile Dropdown */}
              <ProfileDropdown />

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#1A1A1A] p-2 rounded-lg hover:bg-[#FFE766] transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-4 space-y-1">
                <Link 
                  href="/" 
                  className="block px-3 py-3 bg-[#FFD700] text-[#1A1A1A] rounded-lg font-semibold flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                  <span>Home</span>
                </Link>
                <Link 
                  href="/services" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/gallery" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  href="/staff" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Team
                </Link>
                <Link 
                  href="/shop" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  href="/services/booking" 
                  className="block px-3 py-3 bg-[#1A1A1A] text-white rounded-lg text-center font-semibold hover:bg-[#2A2A2A] transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Body Section - Now fits one screen */}
      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <div className="h-[70vh] flex items-center relative">
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
                    <Star className="w-5 h-5 text-[#FFD700]" />
                    <span className="font-medium">5-Star Rated</span>
                  </div>
                  <div className="flex items-center space-x-2 opacity-90">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="font-medium">
                      {isOpen ? 'Open Now' : 'Closed Now'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 opacity-90">
                    <a 
                      href={salonInfo.googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:text-[#FFD700] transition-colors"
                    >
                      <MapPin className="w-5 h-5 text-white" />
                      <span className="font-medium">Prime Location</span>
                    </a>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/services/booking"
                    className="bg-[#FFD700] text-[#1A1A1A] px-8 py-4 rounded-full font-semibold hover:bg-[#B39700] hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center space-x-2"
                  >
                    <span>Book Your Appointment</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href={`tel:${salonInfo.phone.replace(/\D/g, '')}`}
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 text-center flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{salonInfo.phone}</span>
                  </Link>
                </div>
              </div>

              {/* Right Content - Services Preview */}
              <div className="space-y-6">
                {/* Services Cards */}
                <div className="grid gap-4">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.link}
                      className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group cursor-pointer block"
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
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#B39700] opacity-20"></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#1A1A1A] text-lg">{service.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#FFD700] text-lg">{service.price}</p>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#FFD700] transition-colors mt-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Testimonials Carousel */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                  <h3 className="font-semibold text-[#1A1A1A] mb-4">What Our Clients Say</h3>
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
                            <p className="text-[#1A1A1A] font-semibold text-sm mt-2">— {testimonial.name}</p>
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
                              index === currentTestimonial ? 'bg-[#FFD700] scale-125' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={prevTestimonial}
                          className="p-1 text-gray-400 hover:text-[#FFD700] transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextTestimonial}
                          className="p-1 text-gray-400 hover:text-[#FFD700] transition-colors"
                        >
                          <RightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#1A1A1A] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative h-32 flex items-center mb-4">
                <Image
                  src="/images/logos/logo-white.png"
                  alt="Myy Signature Myy Style"
                  width={350}
                  height={64}
                  className="object-contain h-full w-auto"
                  style={{ 
                    borderRadius: '0',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
              <p className="text-gray-300 text-sm text-center md:text-left">
                Transforming beauty, one style at a time.
              </p>
            </div>

            {/* Mysignature Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-[#FFD700]">Myysignature</h3>
              <ul className="space-y-2">
                <li><Link href="/staff" className="text-gray-300 hover:text-[#FFD700] transition-colors">Team</Link></li>
                <li><Link href="/services" className="text-gray-300 hover:text-[#FFD700] transition-colors">Service</Link></li>
                <li><Link href="/shop" className="text-gray-300 hover:text-[#FFD700] transition-colors">Shop</Link></li>
                <li><Link href="/services/booking" className="text-gray-300 hover:text-[#FFD700] transition-colors">Booking</Link></li>
                <li><Link href="/blog" className="text-gray-300 hover:text-[#FFD700] transition-colors">Blog</Link></li>
                <li><Link href="/career" className="text-gray-300 hover:text-[#FFD700] transition-colors">Career</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-[#FFD700]">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-300 hover:text-[#FFD700] transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/refund" className="text-gray-300 hover:text-[#FFD700] transition-colors">Refund Policy</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-[#FFD700] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/conduct" className="text-gray-300 hover:text-[#FFD700] transition-colors">Team Code of Conduct</Link></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="font-semibold text-base mb-3 text-[#FFD700]">Contact</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>{salonInfo.address}</p>
                <p>Phone: {salonInfo.phone}</p>
                <p>Email: {salonInfo.email}</p>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>{isOpen ? 'Open Now' : 'Closed Now'} • Tue-Sat: 9AM-5PM, Sun: 11AM-7PM</span>
                </div>
                
                {/* Social Media Links */}
                <div className="flex space-x-3 mt-3">
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#1877F2] transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </Link>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#1DA1F2] transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </Link>
                  <Link href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#FFFC00] transition-colors">
                    <span className="sr-only">Snapchat</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.312-.015.705-.195.953-.494.495-.539.764-1.439.764-2.466 0-.3-.03-.585-.075-.855.57.39 1.275.6 2.01.6 1.65 0 3.99-1.05 3.99-3.03 0-.48-.195-.915-.51-1.275.03-.09.045-.195.045-.315 0-.615-.495-1.125-1.125-1.125-.345 0-.645.18-.855.435-.36-.27-.81-.435-1.305-.435-1.395 0-2.37 1.095-2.37 2.205 0 .135.03.27.06.405-.645-.195-1.59-.36-2.865-.36-3.144 0-5.084 1.5-5.454 3.66-.57-.75-1.305-1.125-2.205-1.125-1.215 0-2.58.705-2.58 2.895 0 1.755 1.005 2.58 2.58 2.58.345 0 .675-.06.99-.165-.03.315-.06.615-.06.93 0 1.965 1.005 3.69 3 3.69.945 0 1.785-.435 2.355-1.125.27.03.555.045.855.045 3.144 0 5.084-1.5 5.454-3.66.57.75 1.305 1.125 2.205 1.125 1.215 0 2.58-.705 2.58-2.895 0-1.755-1.005-2.58-2.58-2.58-.345 0-.675.06-.99.165.03-.315.06-.615.06-.93 0-1.965-1.005-3.69-3-3.69-.945 0-1.785.435-2.355 1.125-.27-.03-.555-.045-.855-.045z"/></svg>
                  </Link>
                  <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#25D366] transition-colors">
                    <span className="sr-only">WhatsApp</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.187-3.55-8.444"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Atlanta Premier Hair Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}