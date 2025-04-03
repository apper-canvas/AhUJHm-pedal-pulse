import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Menu, X, ShoppingCart, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import MainFeature from "../components/MainFeature";

// Sample bike data
const bikeCategories = [
  { id: "all", name: "All Bikes" },
  { id: "road", name: "Road Bikes" },
  { id: "mountain", name: "Mountain Bikes" },
  { id: "electric", name: "Electric Bikes" },
  { id: "hybrid", name: "Hybrid Bikes" },
  { id: "accessories", name: "Accessories" }
];

const featuredProducts = [
  {
    id: 1,
    name: "Alpine Explorer Pro",
    category: "mountain",
    price: 1899,
    discountPrice: 1699,
    imageUrl: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Premium mountain bike with advanced suspension system for the most challenging trails.",
    inStock: true,
    featuredProduct: true
  },
  {
    id: 2,
    name: "Urban Glide 7",
    category: "hybrid",
    price: 899,
    discountPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Perfect city commuter with comfortable riding position and reliable components.",
    inStock: true,
    featuredProduct: true
  },
  {
    id: 3,
    name: "Velocity Carbon Elite",
    category: "road",
    price: 2499,
    discountPrice: 2299,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Lightweight carbon frame road bike designed for speed and performance.",
    inStock: false,
    featuredProduct: true
  },
  {
    id: 4,
    name: "E-Power Cruiser",
    category: "electric",
    price: 2899,
    discountPrice: null,
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Powerful electric bike with extended range battery and smooth motor assistance.",
    inStock: true,
    featuredProduct: true
  }
];

const services = [
  {
    id: "basic-tune",
    name: "Basic Tune-Up",
    description: "Brake adjustment, gear tuning, tire pressure check, and basic safety inspection.",
    duration: "1 hour",
    price: 49
  },
  {
    id: "full-service",
    name: "Full Service",
    description: "Complete bike overhaul including drivetrain cleaning, wheel truing, and bearing adjustments.",
    duration: "3 hours",
    price: 129
  },
  {
    id: "wheel-build",
    name: "Custom Wheel Building",
    description: "Professional wheel building service with your choice of hubs, rims, and spokes.",
    duration: "4 hours",
    price: 199
  }
];

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Filter products when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(featuredProducts);
    } else {
      setFilteredProducts(
        featuredProducts.filter(product => product.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero slider controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-blur py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <motion.div 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-xl">P</span>
              </motion.div>
              <span className="text-2xl font-bold text-surface-900 dark:text-white">
                Pro<span className="text-primary">Bikes</span>
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#bikes" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                Bikes
              </a>
              <a href="#services" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                Services
              </a>
              <a href="#booking" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                Book Repair
              </a>
              <a href="#about" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                About Us
              </a>
              <a href="#contact" className="font-medium text-surface-700 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
                Contact
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <motion.button 
                className="hidden md:flex items-center space-x-2 btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
              </motion.button>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-surface-100 dark:bg-surface-800"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-surface-700 dark:text-surface-300" />
                ) : (
                  <Menu className="w-6 h-6 text-surface-700 dark:text-surface-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-30 bg-surface-900/90 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="h-full w-3/4 max-w-sm bg-white dark:bg-surface-800 p-6 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold">ProBikes</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-6">
                <a 
                  href="#bikes" 
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bikes
                </a>
                <a 
                  href="#services" 
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a 
                  href="#booking" 
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Repair
                </a>
                <a 
                  href="#about" 
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </a>
                <a 
                  href="#contact" 
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
              
              <div className="mt-auto">
                <button className="w-full btn btn-primary flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Shop Now</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-900/80 to-surface-900/30 dark:from-surface-900/90 dark:to-surface-900/50" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-white mb-4">
              Ride the Future with <span className="text-gradient">ProBikes</span>
            </h1>
            <p className="text-xl md:text-2xl text-surface-100 mb-8 max-w-2xl">
              Premium bikes and expert service for every rider. Discover your perfect ride today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#bikes"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </motion.a>
              <motion.a
                href="#booking"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-surface-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Service
              </motion.a>
            </div>
          </motion.div>
          
          <div className="absolute bottom-10 left-4 md:left-6 right-4 md:right-6 flex justify-between items-center">
            <div className="flex space-x-2">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-primary w-10"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Bikes Section */}
      <section id="bikes" className="py-20 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore Our <span className="text-gradient">Premium Bikes</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              From mountain trails to city streets, find the perfect ride for your journey.
            </motion.p>
          </div>
          
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {bikeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-soft"
                    : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="card group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {!product.inStock && (
                      <div className="absolute top-4 right-4 bg-surface-800/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Out of Stock
                      </div>
                    )}
                    {product.discountPrice && (
                      <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                        Sale
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {product.discountPrice ? (
                          <>
                            <span className="text-xl font-bold text-primary">${product.discountPrice}</span>
                            <span className="ml-2 text-sm text-surface-500 line-through">${product.price}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold">${product.price}</span>
                        )}
                      </div>
                      
                      <motion.button
                        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-surface-600 dark:text-surface-400">
                  No products found in this category. Please check back later.
                </p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <motion.a
              href="#"
              className="inline-flex items-center text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary font-medium"
              whileHover={{ x: 5 }}
            >
              View all bikes
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Professional <span className="text-gradient">Bike Services</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Keep your bike in perfect condition with our expert maintenance and repair services.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="card p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xl font-bold">${service.price}</span>
                    <span className="text-sm text-surface-500 ml-2">/ {service.duration}</span>
                  </div>
                  
                  <motion.a
                    href="#booking"
                    className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Book now
                    <ArrowRight className="ml-1 inline w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section id="booking" className="py-20 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4">Book Your <span className="text-gradient">Bike Service</span></h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 mb-6">
                Schedule a maintenance appointment with our expert technicians to keep your bike running smoothly.
              </p>
              
              <div className="bg-surface-200/50 dark:bg-surface-700/30 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-medium mb-3">Why choose our service?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <span>Expert technicians with years of experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <span>Quality parts and premium lubricants</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <span>Quick turnaround times and convenient scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <span>Satisfaction guaranteed on all services</span>
                  </li>
                </ul>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1559348349-86112f4a31b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Bike mechanic working on a bicycle" 
                className="w-full h-64 object-cover rounded-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <MainFeature />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <h2 className="mb-4">About <span className="text-gradient">ProBikes</span></h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 mb-6">
                Founded in 2010, ProBikes has grown from a small repair shop to a premium bike retailer with a passion for cycling and customer satisfaction.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    To provide cyclists of all levels with quality bikes, expert service, and a welcoming community that inspires more people to ride.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Team</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    Our staff includes certified mechanics, professional cyclists, and passionate bike enthusiasts who are dedicated to helping you find the perfect ride.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">Community Involvement</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    We organize weekly group rides, cycling workshops, and support local cycling initiatives to promote a healthy, sustainable lifestyle.
                  </p>
                </div>
              </div>
              
              <motion.button
                className="btn btn-primary mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Bike shop interior" 
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-surface-900 p-4 rounded-2xl shadow-soft">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">12</span>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500">Years of</p>
                      <p className="font-bold">Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get in <span className="text-gradient">Touch</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have questions or need assistance? Contact our friendly team today.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="card p-8 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Mon-Fri: 9am - 6pm<br />
                Sat: 10am - 4pm
              </p>
              <a href="tel:+15551234567" className="text-primary font-medium">
                (555) 123-4567
              </a>
            </motion.div>
            
            <motion.div
              className="card p-8 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                We'll respond within 24 hours<br />
                during business days
              </p>
              <a href="mailto:info@probikes.com" className="text-primary font-medium">
                info@probikes.com
              </a>
            </motion.div>
            
            <motion.div
              className="card p-8 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                123 Bike Lane<br />
                Cycletown, CT 10001
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-primary font-medium">
                Get Directions
              </a>
            </motion.div>
          </div>
          
          <div className="mt-16 bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="input-field"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="input-field resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full btn btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
              
              <div className="bg-surface-100 dark:bg-surface-700 p-8 lg:p-12 flex items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Store Hours</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-surface-200 dark:bg-surface-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <span className="sr-only">Facebook</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-surface-200 dark:bg-surface-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <span className="sr-only">Instagram</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-surface-200 dark:bg-surface-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Join Our Newsletter
            </motion.h2>
            <motion.p 
              className="text-primary-light mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Subscribe to get exclusive offers, early access to new products, and cycling tips.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <motion.button
                type="submit"
                className="btn bg-white text-primary hover:bg-primary-light hover:text-primary-dark"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-surface-900 text-surface-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  Pro<span className="text-primary">Bikes</span>
                </span>
              </div>
              
              <p className="mb-6">
                Premium bikes and expert service for every rider. Discover your perfect ride today.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Home</a>
                </li>
                <li>
                  <a href="#bikes" className="hover:text-primary transition-colors">Bikes</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">Services</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Road Bikes</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Mountain Bikes</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Electric Bikes</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Hybrid Bikes</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Accessories</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                  <span>123 Bike Lane<br />Cycletown, CT 10001</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  <span>info@probikes.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-surface-800 text-center">
            <p className="text-surface-500">
              &copy; {new Date().getFullYear()} ProBikes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;