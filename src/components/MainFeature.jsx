import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

// Sample service data
const services = [
  { id: "basic-tune", name: "Basic Tune-Up", duration: "1 hour", price: 49 },
  { id: "full-service", name: "Full Service", duration: "3 hours", price: 129 },
  { id: "wheel-build", name: "Custom Wheel Building", duration: "4 hours", price: 199 },
  { id: "bike-fitting", name: "Professional Bike Fitting", duration: "2 hours", price: 149 },
  { id: "suspension", name: "Suspension Service", duration: "2 hours", price: 99 },
];

// Sample time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    if (hour !== 12) { // Skip lunch hour
      slots.push(`${hour}:00`);
      if (hour !== 17) slots.push(`${hour}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Generate dates for the next 14 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Sundays (0 is Sunday in getDay())
    if (date.getDay() !== 0) {
      dates.push({
        date: date,
        formatted: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          weekday: 'short'
        })
      });
    }
  }
  
  return dates;
};

const availableDates = generateDates();

const MainFeature = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

  // Generate a random booking number when booking is complete
  useEffect(() => {
    if (bookingComplete) {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setBookingNumber(`BP-${randomNum}`);
    }
  }, [bookingComplete]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setBookingComplete(true);
      }, 1500);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      notes: ""
    });
    setErrors({});
    setBookingComplete(false);
    setBookingNumber("");
  };

  return (
    <div className="card overflow-hidden">
      <div className="bg-primary p-6">
        <h3 className="text-white text-2xl font-bold">Book Your Service</h3>
        <p className="text-primary-light mt-1">
          Schedule a maintenance appointment with our expert technicians
        </p>
      </div>
      
      {!bookingComplete ? (
        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div 
                key={stepNumber}
                className="flex flex-col items-center"
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= stepNumber 
                      ? "bg-primary text-white" 
                      : "bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400"
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="text-xs mt-1 text-center">
                  {stepNumber === 1 && "Service"}
                  {stepNumber === 2 && "Date"}
                  {stepNumber === 3 && "Time"}
                  {stepNumber === 4 && "Details"}
                </div>
              </div>
            ))}
          </div>
          
          {/* Step 1: Service Selection */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-bold mb-4">Select a Service</h4>
                <div className="space-y-3">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedService?.id === service.id
                          ? "border-primary bg-primary/5"
                          : "border-surface-200 dark:border-surface-700 hover:border-primary/50"
                      }`}
                      onClick={() => handleServiceSelect(service)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">{service.name}</h5>
                          <div className="flex items-center text-sm text-surface-500 dark:text-surface-400 mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                        <div className="text-lg font-bold">${service.price}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Date Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold">Select a Date</h4>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    Change Service
                  </button>
                </div>
                
                <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-surface-500 dark:text-surface-400">Selected Service</div>
                      <div className="font-medium">{selectedService?.name} (${selectedService?.price})</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
                  {availableDates.map((dateObj, index) => (
                    <motion.div
                      key={index}
                      className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-all ${
                        selectedDate?.date.toDateString() === dateObj.date.toDateString()
                          ? "border-primary bg-primary/5"
                          : "border-surface-200 dark:border-surface-700 hover:border-primary/50"
                      }`}
                      onClick={() => handleDateSelect(dateObj)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-sm font-medium">{dateObj.formatted.split(',')[0]}</div>
                      <div className="text-lg font-bold mt-1">{dateObj.formatted.split(',')[1]}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Time Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold">Select a Time</h4>
                  <button 
                    onClick={() => setStep(2)}
                    className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    Change Date
                  </button>
                </div>
                
                <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-surface-500 dark:text-surface-400">Selected Date</div>
                      <div className="font-medium">{selectedDate?.formatted}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
                  {timeSlots.map((time, index) => (
                    <motion.div
                      key={index}
                      className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-all ${
                        selectedTime === time
                          ? "border-primary bg-primary/5"
                          : "border-surface-200 dark:border-surface-700 hover:border-primary/50"
                      }`}
                      onClick={() => handleTimeSelect(time)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-lg font-bold">{time}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 4: Contact Details */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold">Your Details</h4>
                  <button 
                    onClick={() => setStep(3)}
                    className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    Change Time
                  </button>
                </div>
                
                <div className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg mb-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-surface-500 dark:text-surface-400">Appointment Summary</div>
                      <div className="font-medium">{selectedService?.name} (${selectedService?.price})</div>
                      <div className="text-sm mt-1">{selectedDate?.formatted} at {selectedTime}</div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`input-field ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-field ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`input-field ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium mb-1">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="3"
                        className="input-field resize-none"
                        placeholder="Tell us about your bike or any specific issues..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full btn btn-primary mt-6 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          className="p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2
            }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            Your service has been scheduled successfully.
          </p>
          
          <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-xl mb-6">
            <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Booking Reference</div>
            <div className="text-xl font-bold text-primary">{bookingNumber}</div>
          </div>
          
          <div className="space-y-3 text-left mb-8">
            <div className="flex justify-between">
              <span className="text-surface-500 dark:text-surface-400">Service:</span>
              <span className="font-medium">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500 dark:text-surface-400">Date:</span>
              <span className="font-medium">{selectedDate?.formatted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500 dark:text-surface-400">Time:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500 dark:text-surface-400">Price:</span>
              <span className="font-medium">${selectedService?.price}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              A confirmation email has been sent to <strong>{formData.email}</strong>. Please arrive 10 minutes before your appointment.
            </p>
          </div>
          
          <motion.button
            onClick={resetBooking}
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Another Service
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default MainFeature;