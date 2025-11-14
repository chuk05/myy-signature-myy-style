'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, MapPin, Clock, ChevronRight, Star, Scissors, Palette, Sparkles, ChevronLeft, ChevronRight as RightIcon, Search, ShoppingCart, User } from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Header expansion content
  const headerContent = {
    title: "Atlanta Premier: Hair Design",
    expandedText: "Founded in 2010, Atlanta Premier Hair Design has been serving the community with exceptional hair care services. Our journey began with a simple vision: to create a space where artistry meets personalized care. Over the years, we've grown into a team of passionate stylists dedicated to making every client feel beautiful and confident. We believe in the power of transformation - not just of hair, but of spirit."
  }

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
          <div className="flex justify-between items-center h-24">
            {/* Logo - Left - 4x Bigger, Centered Height, No Round, No BG Color */}
            <Link href="/" className="flex items-center h-full py-4">
              <div className="relative h-full flex items-center">
                <Image
                  src="/logos/logo-white.png"
                  alt="Myy Signature Myy Style"
                  width={320}
                  height={80}
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
              <Link href="/staff" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Staff
              </Link>
              <Link href="/service" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Service
              </Link>
              <Link href="/gallery" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/career" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Career
              </Link>
              <Link href="/shop" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Shop
              </Link>
              <Link href="/contact" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Contact
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
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors">
                <User className="w-6 h-6" />
              </button>
              
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
                  href="/staff" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Staff
                </Link>
                <Link 
                  href="/service" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Service
                </Link>
                <Link 
                  href="/gallery" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  href="/career" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Career
                </Link>
                <Link 
                  href="/shop" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  href="/contact" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Body Section */}
      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <div className="min-h-screen flex items-center relative">
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
                    className="bg-[#FFD700] text-[#1A1A1A] px-8 py-4 rounded-full font-semibold hover:bg-[#B39700] hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center space-x-2"
                  >
                    <span>Book Your Appointment</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="tel:404-555-0123"
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 text-center flex items-center justify-center space-x-2"
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
                    </div>
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
      </main>

      {/* Footer Section */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Section - Updated for footer */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative h-32 flex items-center mb-4">
                <Image
                  src="/logos/logo-white.png"
                  alt="Myy Signature Myy Style"
                  width={256}
                  height={64}
                  className="object-contain h-full w-auto"
                  style={{ 
                    borderRadius: '0',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
              <p className="text-[#FFE766] text-sm text-center md:text-left">
                Transforming beauty, one style at a time.
              </p>
            </div>

            {/* Mysignature Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-[#FFD700]">Myysignature</h3>
              <ul className="space-y-2">
                <li><Link href="/team" className="text-gray-300 hover:text-[#FFD700] transition-colors">Team</Link></li>
                <li><Link href="/service" className="text-gray-300 hover:text-[#FFD700] transition-colors">Service</Link></li>
                <li><Link href="/shop" className="text-gray-300 hover:text-[#FFD700] transition-colors">Shop</Link></li>
                <li><Link href="/booking" className="text-gray-300 hover:text-[#FFD700] transition-colors">Booking</Link></li>
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
              <h3 className="font-semibold text-lg mb-4 text-[#FFD700]">Contact</h3>
              <div className="space-y-3 text-gray-300">
                <p>123 Salon Street</p>
                <p>Atlanta, GA 30301</p>
                <p>Phone: (404) 555-0123</p>
                <p>Email: info@atlantapremier.com</p>
                
                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4">
                  <Link href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                    <span className="sr-only">Facebook</span>
                    <div className="w-8 h-8 bg-current rounded-full flex items-center justify-center">
                      <span className="text-[#1A1A1A] font-bold text-xs">f</span>
                    </div>
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-8 h-8 bg-current rounded-full flex items-center justify-center">
                      <span className="text-[#1A1A1A] font-bold text-xs">t</span>
                    </div>
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                    <span className="sr-only">Snapchat</span>
                    <div className="w-8 h-8 bg-current rounded-full flex items-center justify-center">
                      <span className="text-[#1A1A1A] font-bold text-xs">s</span>
                    </div>
                  </Link>
                  <Link href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">
                    <span className="sr-only">WhatsApp</span>
                    <div className="w-8 h-8 bg-current rounded-full flex items-center justify-center">
                      <span className="text-[#1A1A1A] font-bold text-xs">w</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Atlanta Premier Hair Design. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}