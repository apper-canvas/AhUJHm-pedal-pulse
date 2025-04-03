import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-9xl font-bold text-primary mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2
          }}
        >
          404
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-lg text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center btn btn-primary"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-12 w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="text-center">
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Looking for something specific?
          </p>
          
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="input-field rounded-r-none flex-grow"
            />
            <button className="bg-primary text-white px-4 py-3 rounded-r-xl hover:bg-primary-dark transition-colors">
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;