'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Scissors, Palette, Sparkles, Clock, Star, MapPin, Menu, X, Search, ShoppingCart, User, Crown, Zap, Users } from 'lucide-react'
import ProfileDropdown from '@/components/ui/ProfileDropdown'

export default function ServicesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  // Services Carousel Images
  const carouselImages = [
    {
      src: '/images/services/services-hero-1.jpg',
      alt: 'Hair Styling Services',
      title: 'Expert Hair Services',
      description: 'Discover our comprehensive range of premium hair services'
    },
    {
      src: '/images/services/services-hero-2.jpg',
      alt: 'Color Services',
      title: 'Vibrant Color Transformations',
      description: 'Experience stunning color services with our expert stylists'
    },
    {
      src: '/images/services/services-hero-3.jpg',
      alt: 'Special Treatments',
      title: 'Luxury Treatments',
      description: 'Pamper yourself with our exclusive hair treatments'
    }
  ]

  // Service Categories based on our structured table
  const serviceCategories = [
    {
      id: 'all',
      name: "All Services",
      icon: <Star className="w-8 h-8" />,
      description: 'Complete range of hair services',
      image: '/images/services/service-all.jpg'
    },
    {
      id: 'women',
      name: "Women's Hair",
      icon: <Sparkles className="w-8 h-8" />,
      description: 'Cuts, styling & transformations',
      image: '/images/services/service-women.jpg'
    },
    {
      id: 'color',
      name: 'Color Services',
      icon: <Palette className="w-8 h-8" />,
      description: 'Color, highlights & treatments',
      image: '/images/services/service-color.jpg'
    },
    {
      id: 'men',
      name: "Men's Grooming",
      icon: <Users className="w-8 h-8" />,
      description: 'Cuts, shaves & styling',
      image: '/images/services/service-men.jpg'
    },
    {
      id: 'treatment',
      name: 'Special Treatments',
      icon: <Zap className="w-8 h-8" />,
      description: 'Keratin, smoothing & spa',
      image: '/images/services/service-premium.jpg'
    },
    {
      id: 'special',
      name: 'Special Occasion',
      icon: <Crown className="w-8 h-8" />,
      description: 'Bridal & event styling',
      image: '/images/services/service-special.jpg'
    }
  ]

  // Detailed services from our structured table
  const allServices = [
    // Women's Hair Services
    {
      id: 1,
      name: 'Classic Cut & Style',
      category: 'women',
      description: 'Precision cut with professional blow-dry style',
      duration: '45-60 min',
      price: '$45-$65',
      image: '/images/services/service-women.jpg',
      featured: false
    },
    {
      id: 2,
      name: 'Advanced Cut & Style',
      category: 'women',
      description: 'Detailed cutting with thermal styling and finishing',
      duration: '60-75 min',
      price: '$65-$85',
      image: '/images/services/service-all.jpg',
      featured: true
    },
    {
      id: 3,
      name: 'Blowout & Style',
      category: 'women',
      description: 'Wash, blowout, and professional finishing',
      duration: '45 min',
      price: '$40-$55',
      image: '/images/services/service-premium.jpg',
      featured: false
    },
    {
      id: 4,
      name: 'Formal Styling',
      category: 'women',
      description: 'Updos, bridal, and special occasion styling',
      duration: '60-90 min',
      price: '$75-$120',
      image: '/images/services/service-special.jpg',
      featured: true
    },

    // Color Services
    {
      id: 5,
      name: 'Single Process Color',
      category: 'color',
      description: 'All-over color application with conditioning',
      duration: '60-90 min',
      price: '$75-$120',
      image: '/images/services/service-color.jpg',
      featured: false
    },
    {
      id: 6,
      name: 'Full Highlights',
      category: 'color',
      description: 'Full head foil highlights for dimensional color',
      duration: '90-120 min',
      price: '$120-$180',
      image: '/images/services/service-color.jpg',
      featured: true
    },
    {
      id: 7,
      name: 'Partial Highlights',
      category: 'color',
      description: 'Crown and face-framing foil highlights',
      duration: '60-90 min',
      price: '$85-$130',
      image: '/images/services/service-color.jpg',
      featured: false
    },
    {
      id: 8,
      name: 'Balayage/Ombré',
      category: 'color',
      description: 'Hand-painted color technique for natural look',
      duration: '120-180 min',
      price: '$150-$250',
      image: '/images/services/service-color.jpg',
      featured: true
    },

    // Men's Grooming
    {
      id: 9,
      name: 'Classic Men\'s Cut',
      category: 'men',
      description: 'Traditional cut and style with precision',
      duration: '30-45 min',
      price: '$30-$45',
      image: '/images/services/service-men.jpg',
      featured: false
    },
    {
      id: 10,
      name: 'Beard Trim & Shape',
      category: 'men',
      description: 'Precision beard grooming and shaping',
      duration: '20-30 min',
      price: '$20-$35',
      image: '/images/services/service-men.jpg',
      featured: false
    },
    {
      id: 11,
      name: 'Hot Towel Shave',
      category: 'men',
      description: 'Traditional straight razor shave experience',
      duration: '45 min',
      price: '$45-$65',
      image: '/images/services/service-men.jpg',
      featured: true
    },

    // Treatment Services
    {
      id: 12,
      name: 'Keratin Smoothing',
      category: 'treatment',
      description: 'Professional smoothing treatment for frizz control',
      duration: '120-180 min',
      price: '$200-$350',
      image: '/images/services/service-premium.jpg',
      featured: true
    },
    {
      id: 13,
      name: 'Hair Spa Treatment',
      category: 'treatment',
      description: 'Deep conditioning with relaxing scalp massage',
      duration: '60 min',
      price: '$65-$95',
      image: '/images/services/service-special.jpg',
      featured: false
    },
    {
      id: 14,
      name: 'Olaplex Treatment',
      category: 'treatment',
      description: 'Bond rebuilding treatment for damaged hair',
      duration: '30-45 min',
      price: '$40-$75',
      image: '/images/services/service-premium.jpg',
      featured: false
    },

    // Special Occasion
    {
      id: 15,
      name: 'Bridal Package',
      category: 'special',
      description: 'Complete bridal styling with trial and day-of service',
      duration: '180-240 min',
      price: '$200-$350',
      image: '/images/services/service-special.jpg',
      featured: true
    },
    {
      id: 16,
      name: 'Wedding Party Styling',
      category: 'special',
      description: 'Group styling services for wedding parties',
      duration: '60-90 min',
      price: '$85-$150 per person',
      image: '/images/services/service-special.jpg',
      featured: false
    }
  ]

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Navigation Bar - Consistent with Home Page */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center h-full py-4">
              <div className="relative h-full flex items-center">
                <Image
                  src="/images/logos/logo-white.png"
                  alt="Myy Signature Myy Style"
                  width={280}
                  height={70}
                  className="object-contain h-full w-auto"
                  style={{ 
                    borderRadius: '0',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Home
              </Link>
              <Link href="/services" className="text-[#FFD700] font-semibold border-b-2 border-[#FFD700]">
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

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#1A1A1A] text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
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
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/services" 
                  className="block px-3 py-3 bg-[#FFD700] text-[#1A1A1A] rounded-lg font-semibold"
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

      {/* Hero Section with Carousel */}
      <div className="h-[60vh] flex items-center relative">
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="space-y-6 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {carouselImages[currentSlide].title}
              </h1>
              <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
                {carouselImages[currentSlide].description}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 opacity-90">
                <Star className="w-5 h-5 text-[#FFD700]" />
                <span className="font-medium">5-Star Rated</span>
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-90">
                <Clock className="w-5 h-5 text-white" />
                <span className="font-medium">Expert Stylists</span>
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-90">
                <MapPin className="w-5 h-5 text-white" />
                <span className="font-medium">Prime Location</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link 
                href="/services/booking"
                className="bg-[#FFD700] text-[#1A1A1A] px-8 py-4 rounded-full font-semibold hover:bg-[#B39700] hover:shadow-xl transition-all duration-300 text-center flex items-center justify-center space-x-2"
              >
                <span>Book Your Appointment</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories Filter */}
      <div className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
              Browse Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Filter by category to find the perfect service for your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                  activeCategory === category.id
                    ? 'bg-[#FFD700] border-[#FFD700] text-[#1A1A1A] shadow-lg'
                    : 'bg-white border-gray-200 text-[#1A1A1A] hover:border-[#FFD700] hover:bg-[#FFE766] shadow-md'
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div className={`p-2 rounded-full ${
                    activeCategory === category.id ? 'bg-[#1A1A1A] text-[#FFD700]' : 'bg-gray-100 text-[#1A1A1A]'
                  }`}>
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-600">{category.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
              {activeCategory === 'all' ? 'All Services' : serviceCategories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {filteredServices.length} services found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {service.featured && (
                    <div className="absolute top-4 left-4 bg-[#FFD700] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-2 py-1 rounded text-xs font-medium">
                    {serviceCategories.find(cat => cat.id === service.category)?.name}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[#1A1A1A]">{service.name}</h3>
                    <span className="text-[#FFD700] font-bold text-lg">{service.price}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    
                    {service.featured && (
                      <div className="flex items-center space-x-1 text-[#FFD700]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      href={`/services/booking?service=${service.id}`}
                      className="flex-1 bg-[#FFD700] text-[#1A1A1A] py-3 px-4 rounded-lg font-semibold hover:bg-[#B39700] transition-colors text-center flex items-center justify-center space-x-2"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    
                    <button className="px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:border-[#FFD700] hover:text-[#FFD700] transition-colors">
                      <Scissors className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Services Message */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <Scissors className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Services Found</h3>
                <p className="text-gray-500">
                  No services available in this category at the moment.
                </p>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Look?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the exceptional service that sets us apart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/booking"
                className="bg-[#FFD700] text-[#1A1A1A] px-8 py-4 rounded-full font-semibold hover:bg-[#B39700] transition-all duration-300 text-lg"
              >
                Book Appointment Now
              </Link>
              <Link
                href="/staff"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 text-lg"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}