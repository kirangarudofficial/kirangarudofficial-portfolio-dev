import React from 'react';
import { Cloud, Layers, Zap, Settings } from 'lucide-react';
import { services } from '../../data/servicesData';

const Services: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'IaaS': return Cloud;
      case 'PaaS': return Layers;
      case 'SaaS': return Zap;
      default: return Settings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'IaaS': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700';
      case 'PaaS': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'SaaS': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700';
      default: return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'IaaS':
        return 'Infrastructure automation, provisioning, and scalable cloud architectures';
      case 'PaaS':
        return 'Setup and management of cloud-native services, CI/CD, and managed containers';
      case 'SaaS':
        return 'Integration and management of cloud-based applications and monitoring services';
      default:
        return 'Additional DevOps consulting and specialized services';
    }
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Services Offered
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive cloud and DevOps services organized by delivery model to meet 
            your infrastructure and automation needs
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedServices).map(([category, categoryServices]) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <div key={category}>
                {/* Category Header */}
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${getCategoryColor(category)} mb-8`}>
                  <IconComponent className="h-6 w-6" />
                  <div>
                    <h3 className="text-xl font-bold">
                      {category === 'IaaS' && '☁️ Infrastructure as a Service (IaaS)'}
                      {category === 'PaaS' && '🧩 Platform as a Service (PaaS)'}
                      {category === 'SaaS' && '📦 Software as a Service (SaaS)'}
                      {category === 'Other' && '🔧 Other DevOps Offerings'}
                    </h3>
                    <p className="text-sm opacity-90">
                      {getCategoryDescription(category)}
                    </p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryServices.map((service) => (
                    <div key={service.id} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Tools/Technologies */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Tools & Technologies:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {service.tools.map((tool, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white dark:bg-gray-900 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Infrastructure?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Let's discuss how these services can help optimize your cloud infrastructure, 
            automate your deployments, and accelerate your development cycles.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;