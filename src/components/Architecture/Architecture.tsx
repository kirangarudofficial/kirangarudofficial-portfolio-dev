import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { architectures } from '../../data/architectureData';

const Architecture: React.FC = () => {
  const [selectedArchitecture, setSelectedArchitecture] = useState<string | null>(null);

  const openModal = (id: string) => {
    setSelectedArchitecture(id);
  };

  const closeModal = () => {
    setSelectedArchitecture(null);
  };

  const selectedArch = architectures.find(arch => arch.id === selectedArchitecture);

  return (
    <section id="architecture" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Architecture Designs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive cloud architectures showcasing scalable, secure, and cost-effective solutions 
            for various business requirements
          </p>
        </div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {architectures.map((architecture) => (
            <div
              key={architecture.id}
              className="group relative bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openModal(architecture.id)}
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden relative">
                <img
                  src={architecture.thumbnail}
                  alt={architecture.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
                    {architecture.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {architecture.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {architecture.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedArchitecture && selectedArch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedArch.title}
                  </h3>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                    {selectedArch.category}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Architecture Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedArch.thumbnail}
                    alt={selectedArch.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Architecture Overview
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedArch.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                    Key Components & Benefits
                  </h4>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Scalable and highly available infrastructure design</li>
                    <li>• Cost-optimized resource allocation and management</li>
                    <li>• Security best practices and compliance considerations</li>
                    <li>• Monitoring and observability integration</li>
                    <li>• Disaster recovery and backup strategies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Architecture;