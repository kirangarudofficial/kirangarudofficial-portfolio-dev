import React from 'react';
import { Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'career' | 'learning' | 'achievement';
  details: string[];
}

const Journey: React.FC = () => {
  const timeline: TimelineEvent[] = [
    {
      year: '2025',
      title: 'Industry-Ready DevOps Professional',
      description: 'Actively seeking opportunities to contribute expertise in cloud infrastructure, automation, and AI-enhanced DevOps practices.',
      type: 'career',
      details: [
        'Portfolio showcasing 20+ production-ready cloud solutions',
        'Advanced proficiency in multi-cloud environments (AWS, Azure, GCP)',
        'Proven track record in enterprise-grade infrastructure delivery',
        'Ready to drive digital transformation initiatives'
      ]
    },
    {
      year: '2024',
      title: 'Advanced Cloud & AI Integration Mastery',
      description: 'Completed comprehensive advanced training program, mastering cutting-edge DevOps tools and AI integration techniques.',
      type: 'achievement',
      details: [
        'Mastered Docker, Kubernetes, Ansible, and container orchestration',
        'Implemented monitoring solutions with Grafana, Prometheus, and ELK Stack',
        'Developed automation scripts in Python and advanced shell scripting',
        'Integrated AI tools into DevOps workflows for enhanced productivity'
      ]
    },
    {
      year: '2024',
      title: 'Multi-Cloud Platform Expertise',
      description: 'Expanded technical capabilities across major cloud platforms while deepening DevOps automation skills.',
      type: 'learning',
      details: [
        'Achieved proficiency in Azure and Google Cloud Platform',
        'Advanced Git workflows and collaborative development practices',
        'Infrastructure monitoring and observability implementation',
        'Cost optimization strategies across multi-cloud environments'
      ]
    },
    {
      year: '2023',
      title: 'Production Project Portfolio Development',
      description: 'Successfully delivered 20+ real-world cloud and DevOps projects, demonstrating consistent execution in production environments.',
      type: 'achievement',
      details: [
        'Architected and deployed scalable AWS infrastructure solutions',
        'Built robust CI/CD pipelines with automated testing and deployment',
        'Implemented Infrastructure as Code using Terraform and CloudFormation',
        'Delivered monitoring, security, and cost optimization solutions'
      ]
    },
    {
      year: '2023',
      title: 'AWS Certification & Hands-On Mastery',
      description: 'Achieved AWS Solutions Architect certification while gaining practical experience through intensive project-based learning.',
      type: 'learning',
      details: [
        'Earned AWS Solutions Architect – Associate certification',
        'Completed comprehensive DevOps training with real-world labs',
        'Mastered Linux system administration and cloud CLI tools',
        'Applied theoretical knowledge through 10+ practical AWS projects'
      ]
    },
    {
      year: '2022',
      title: 'Strategic Career Pivot to Cloud Technology',
      description: 'Made the decisive transition from traditional commerce sector to cloud computing, recognizing the transformative potential of DevOps.',
      type: 'career',
      details: [
        'Identified strong alignment with cloud computing principles',
        'Committed to full-time technology career development',
        'Began intensive self-study in AWS and DevOps fundamentals',
        'Established foundation for systematic skill development'
      ]
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'career': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'learning': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'achievement': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="journey" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-6"
          >
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Professional Evolution</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              My Professional
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A strategic transformation from traditional commerce to cutting-edge cloud technology — 
            showcasing rapid skill acquisition, practical application, and readiness for enterprise challenges.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-cyan-400 opacity-30"></div>

          {/* Timeline Events */}
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full ${getIconColor(event.type)} flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {event.type === 'career' && <MapPin className="h-4 w-4" />}
                  {event.type === 'learning' && <Calendar className="h-4 w-4" />}
                  {event.type === 'achievement' && <Award className="h-4 w-4" />}
                </motion.div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right md:mr-1/2' : 'md:pl-8 md:ml-1/2'}`}>
                  <motion.div
                    className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full shadow-lg">
                        {event.year}
                      </span>
                      <span className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${getIconColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-3">
                      {event.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          className={`flex items-start gap-3 text-gray-600 dark:text-gray-400 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <ArrowRight className={`h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0 ${index % 2 === 0 ? 'md:rotate-180' : ''}`} />
                          <span className="text-sm leading-relaxed">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Drive Your Next Innovation
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            This accelerated journey from commerce to cloud demonstrates adaptability, rapid learning, 
            and practical execution. Let's discuss how this unique perspective can benefit your organization.
          </p>
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;