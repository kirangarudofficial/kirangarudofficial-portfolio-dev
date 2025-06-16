import React from 'react';
import { Github, Linkedin, Mail, Zap, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-900 dark:bg-black border-t border-gray-800 dark:border-gray-700 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  kirangarudofficial
                </span>
                <div className="text-sm text-gray-400 font-medium">
                  DevOps Engineer
                </div>
              </div>
            </motion.div>
            
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Pioneering the future of cloud infrastructure through AI-enhanced automation, 
              enterprise-grade security, and next-generation DevOps practices.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Ready to transform your infrastructure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Solutions
            </h3>
            <ul className="space-y-3">
              {['AI Integration', 'Cloud Architecture', 'DevOps Automation', 'Security Framework'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Connect
            </h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:contact@kirangarudofficial.com"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-4 w-4" />
                contact@kirangarudofficial.com
              </motion.a>
              
              <div className="flex space-x-4 pt-2">
                {[
                  { icon: Github, href: 'https://github.com/kirangarudofficial', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/kirangarudofficial', label: 'LinkedIn' }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 dark:bg-gray-700 rounded-xl text-gray-400 hover:text-cyan-400 hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Kiran Garud. Transforming infrastructure through innovation.
            </p>
            
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl text-cyan-400 hover:bg-cyan-400/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;