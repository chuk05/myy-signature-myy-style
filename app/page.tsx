import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const services = [
    {
      name: 'Women\'s Cut & Style',
      description: 'Precision cut, shampoo, and blow-dry style',
      price: 75,
      duration: 60
    },
    {
      name: 'Men\'s Cut',
      description: 'Classic barber cut and style',
      price: 35,
      duration: 30
    },
    {
      name: 'Color & Highlights',
      description: 'Full color with highlights and toner',
      price: 150,
      duration: 120
    }
  ]

  const staff = [
    {
      name: 'Sarah Johnson',
      specialty: 'Color Specialist',
      bio: 'With over 10 years of experience in color theory and technique.'
    },
    {
      name: 'Marcus Williams',
      specialty: 'Cutting Specialist',
      bio: 'Expert in precision cuts and modern styling techniques.'
    },
    {
      name: 'Emily Chen',
      specialty: 'Extensions',
      bio: 'Specialized in hair extensions and transformative styling.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-[#F0F0F0] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <Image
                  src="/logos/logo.png"
                  alt="Myy Signature Myy Style"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-xl font-bold text-[#222222]">
                Myy Signature<br />Myy Style
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#222222] hover:text-[#6A8EA4] transition-colors font-medium">
                Home
              </Link>
              <Link href="/customer/booking" className="text-[#222222] hover:text-[#6A8EA4] transition-colors font-medium">
                Services
              </Link>
              <Link href="#team" className="text-[#222222] hover:text-[#6A8EA4] transition-colors font-medium">
                Our Team
              </Link>
              <Link href="/customer/booking" className="bg-[#6A8EA4] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5a7a90] transition-colors">
                Book Now
              </Link>
              <Link href="/staff" className="text-[#222222] hover:text-[#6A8EA4] transition-colors font-medium">
                Staff Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-[#222222] hover:text-[#6A8EA4] transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative bg-[#F0F0F0] py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <Image
            src="/images/hero-salon.jpg"
            alt="Myy Signature Myy Style Salon"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#222222] mb-6 leading-tight">
            Atlanta's Premier<br />
            <span className="text-[#6A8EA4]">Salon Experience</span>
          </h1>
          <p className="text-xl text-[#222222] mb-8 max-w-3xl mx-auto leading-relaxed">
            Where your signature style begins. Experience premium hair care with our 
            expert stylists in the heart of Atlanta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/customer/booking" 
              className="bg-[#6A8EA4] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5a7a90] transition-colors shadow-lg"
            >
              Book Your Appointment
            </Link>
            <Link 
              href="#services" 
              className="bg-white text-[#222222] border border-[#6A8EA4] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#F0F0F0] transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222222] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From precision cuts to vibrant color transformations, we offer a full range 
              of hair services tailored to your unique style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-[#F0F0F0] p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#6A8EA4] group"
              >
                <div className="relative w-full h-48 mb-6 bg-[#6A8EA4] rounded-lg overflow-hidden">
                  <Image
                    src={`/images/service-${index + 1}.jpg`}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#222222] mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-bold text-[#6A8EA4]">
                      ${service.price}
                    </span>
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                      {service.duration} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/customer/booking" 
              className="inline-block bg-[#6A8EA4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#5a7a90] transition-colors"
            >
              View All Services & Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 lg:py-24 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222222] mb-4">
              Meet Our Expert Stylists
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our talented team of professionals is dedicated to helping you discover 
              and perfect your signature style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#6A8EA4]">
                  <Image
                    src={`/images/staff-${index + 1}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#222222] mb-2">
                  {member.name}
                </h3>
                <p className="text-[#6A8EA4] font-medium mb-4">
                  {member.specialty}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#222222] mb-4">
              Our Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the stunning transformations created by our talented stylists.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="relative aspect-square bg-[#F0F0F0] rounded-lg overflow-hidden group">
                <Image
                  src={`/images/gallery-${item}.jpg`}
                  alt="Salon work example"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Image */}
      <section className="py-16 lg:py-24 bg-[#222222] text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <Image
            src="/images/cta-background.jpg"
            alt="Salon interior"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the Myy Signature Myy Style difference. 
            Your perfect style is just a click away.
          </p>
          <Link 
            href="/customer/booking" 
            className="inline-block bg-[#6A8EA4] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5a7a90] transition-colors shadow-lg"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#222222] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="relative w-8 h-8 mr-3">
                  <Image
                    src="/logos/logo-white.png"
                    alt="Myy Signature Myy Style"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold">Myy Signature Myy Style</h3>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Premier hair salon in Atlanta, Georgia. Where your signature style begins 
                with our expert team of stylists and color specialists.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/customer/booking" className="text-gray-300 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#team" className="text-gray-300 hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/customer/booking" className="text-gray-300 hover:text-white transition-colors">
                    Book Appointment
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <address className="text-gray-300 not-italic">
                <p className="mb-2">123 Salon Street</p>
                <p className="mb-2">Atlanta, GA 30301</p>
                <p className="mb-2">(404) 555-0123</p>
                <p>info@mysignaturemystyle.com</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Myy Signature Myy Style. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}