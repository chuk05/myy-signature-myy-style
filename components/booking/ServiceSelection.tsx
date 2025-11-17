'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Service } from '@/types/database'
import { ChevronLeft, ChevronRight, Star, Clock, Scissors, Palette, Sparkles, Users } from 'lucide-react'

interface ServiceSelectionProps {
  services: Service[] | null // Allow null
  selectedService: Service | null
  selectedCategory: string | null
  categories: { id: string; name: string; icon: React.ReactNode }[]
  onServiceSelect: (service: Service) => void
  onCategorySelect: (categoryId: string) => void
}

export default function ServiceSelection({
  services,
  selectedService,
  selectedCategory,
  categories,
  onServiceSelect,
  onCategorySelect,
}: ServiceSelectionProps) {
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0)
  const [filteredServices, setFilteredServices] = useState<Service[]>([])

  // Service category images for carousel
  const categoryCarouselImages = [
    {
      src: '/images/categories/womens-haircut.jpg',
      alt: 'Women Haircut',
      category: 'women'
    },
    {
      src: '/images/categories/mens-grooming.jpg',
      alt: 'Men Grooming',
      category: 'men'
    },
    {
      src: '/images/categories/color-treatment.jpg',
      alt: 'Color Treatment',
      category: 'color'
    },
    {
      src: '/images/categories/highlights.jpg',
      alt: 'Highlights',
      category: 'color'
    },
    {
      src: '/images/categories/keratin-treatment.jpg',
      alt: 'Keratin Treatment',
      category: 'special'
    },
    {
      src: '/images/categories/hair-spa.jpg',
      alt: 'Hair Spa',
      category: 'special'
    }
  ]

  // Filter services when category changes - WITH SAFETY CHECK
  useEffect(() => {
    if (!services || !Array.isArray(services)) {
      setFilteredServices([])
      return
    }

    if (selectedCategory && selectedCategory !== 'all') {
      setFilteredServices(services.filter(service => {
        // Handle both old 'category' string and new 'category_id' UUID structure
        const serviceCategory = service.category_id || service.category_id
        return serviceCategory === selectedCategory
      }))
    } else {
      setFilteredServices(services)
    }
  }, [services, selectedCategory])

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceSlide((prev) => (prev + 1) % categoryCarouselImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentServiceSlide((prev) => (prev + 1) % categoryCarouselImages.length)
  }

  const prevSlide = () => {
    setCurrentServiceSlide((prev) => (prev - 1 + categoryCarouselImages.length) % categoryCarouselImages.length)
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.icon || <Scissors className="w-5 h-5" />
  }

  // Safe service count function
  const getServiceCount = (categoryId: string) => {
    if (!services || !Array.isArray(services)) return 0
    return services.filter(service => {
      const serviceCategory = service.category_id || service.category_id
      return serviceCategory === categoryId
    }).length
  }

  // Get category name for a service
  const getServiceCategoryName = (service: Service) => {
    const serviceCategory = service.category_id || service.category_id
    return categories.find(cat => cat.id === serviceCategory)?.name || 'Service'
  }

  // Get category ID for a service
  const getServiceCategoryId = (service: Service) => {
    return service.category_id || service.category_id
  }

  return (
    <div className="space-y-8">
      {/* Category Carousel */}
      <div className="relative bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-2xl overflow-hidden h-64">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {categoryCarouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentServiceSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
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

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
                <p className="text-lg opacity-90 mb-6">
                  Discover our comprehensive range of hair services designed to bring out your unique beauty
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-[#FFD700]" />
                    <span>5-Star Rated</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Expert Stylists</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>10,000+ Clients</span>
                  </div>
                </div>
              </div>
              
              {/* Category Indicators */}
              <div className="grid grid-cols-3 gap-4">
                {categories.slice(0, 3).map((category) => (
                  <div
                    key={category.id}
                    className={`text-center p-4 rounded-xl backdrop-blur-sm border-2 transition-all cursor-pointer ${
                      selectedCategory === category.id
                        ? 'bg-white/20 border-[#FFD700] text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
                    }`}
                    onClick={() => onCategorySelect(category.id)}
                  >
                    <div className="flex justify-center mb-2">
                      {category.icon}
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-[#FFD700] text-[#1A1A1A] shadow-lg'
                : 'bg-white text-[#1A1A1A] border-2 border-gray-200 hover:border-[#FFD700] hover:shadow-md'
            }`}
          >
            <span className="text-[#FFD700]">
              {category.icon}
            </span>
            <span>{category.name}</span>
            {selectedCategory === category.id && (
              <span className="bg-[#1A1A1A] text-white text-xs px-2 py-1 rounded-full ml-2">
                {getServiceCount(category.id)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => onServiceSelect(service)}
            className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 cursor-pointer ${
              selectedService?.id === service.id
                ? 'border-[#FFD700] ring-2 ring-[#FFD700]/20'
                : 'border-gray-100 hover:border-[#FFD700]/50'
            }`}
          >
            {/* Service Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={service.image || `/images/categories/${getServiceCategoryId(service)}-service.jpg`}
                alt={service.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-[#FFD700]">
                    {getCategoryIcon(getServiceCategoryId(service))}
                  </span>
                  <span className="text-sm font-semibold text-[#1A1A1A]">
                    {getServiceCategoryName(service)}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-[#FFD700] text-[#1A1A1A] px-3 py-2 rounded-full font-bold text-lg">
                  ${service.price}
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="p-6">
              <h3 className="font-bold text-xl text-[#1A1A1A] mb-2 group-hover:text-[#FFD700] transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>
              
              {/* Service Details */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-[#FFD700]" />
                  <span>4.9</span>
                </div>
              </div>

              {/* Select Button */}
              <div className={`mt-4 text-center py-2 rounded-lg font-semibold transition-all ${
                selectedService?.id === service.id
                  ? 'bg-[#FFD700] text-[#1A1A1A]'
                  : 'bg-[#F8F9FA] text-gray-600 group-hover:bg-[#FFD700] group-hover:text-[#1A1A1A]'
              }`}>
                {selectedService?.id === service.id ? 'Selected ✓' : 'Select Service'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Services Message */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Scissors className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {!services || !Array.isArray(services) ? 'Loading services...' : 'No Services Found'}
          </h3>
          <p className="text-gray-500">
            {!services || !Array.isArray(services) ? 'Please wait while we load services' : 'Try selecting a different category'}
          </p>
        </div>
      )}
    </div>
  )
}