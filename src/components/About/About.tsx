import React from 'react';
import { Award, Target, Zap, Users, TrendingUp, Globe, Code, Cloud, Shield, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const skills = [
    'AWS', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions',
    'Linux', 'Python', 'Bash', 'CloudFormation', 'Ansible', 'Prometheus',
    'Grafana', 'ELK Stack', 'CI/CD', 'Infrastructure as Code', 'Monitoring',
    'Security', 'Cost Optimization', 'Multi-cloud'
  ];

  const highlights = [
    {
      icon: Award,
      title: 'AWS Certified',
      description: 'Solutions Architect Associate with hands-on expertise in cloud architecture design',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Code,
      title: '20+ Projects',
      description: 'Real-world cloud and DevOps implementations across diverse industry domains',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Zap,
      title: 'AI Integration',
      description: 'Pioneering the fusion of artificial intelligence with traditional DevOps practices',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security implementations with compliance and best practices',
      color: 'from-orange-400 to-red-500'
    }
  ];

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

  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-8"
          >
            <Globe className="h-5 w-5 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">About Me</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-bold mb-8 text-white leading-tight"
          >
            Meet the Engineer Behind
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Next-Gen Infrastructure
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-24">
          {/* Left Column - Profile (2 columns) */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Profile Card */}
            <motion.div
              variants={itemVariants}
              className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/50 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-500/5 to-purple-600/5"></div>
              
              {/* Profile Image Placeholder */}
              <div className="relative mb-8">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="w-36 h-36 bg-gray-800 rounded-full flex items-center justify-center">
                    <Users className="h-20 w-20 text-cyan-400" />
                  </div>
                  
                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-pulse"></div>
                </div>
                
                {/* Status Indicator */}
                <div className="absolute top-0 right-1/2 transform translate-x-20 translate-y-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400 font-medium">Available for Work</span>
                  </div>
                </div>
              </div>

              {/* Name and Title */}
              <div className="text-center relative">
                <h3 className="text-4xl font-bold text-white mb-3">
                  Kiran Garud
                </h3>
                <p className="text-xl text-cyan-400 font-semibold mb-6">
                  DevOps Engineer
                </p>
                <div className="px-8 py-4 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl">
                  <p className="text-gray-300 text-base leading-relaxed font-medium">
                    "Transforming Infrastructure with AI-Powered Automation"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                  20+
                </div>
                <div className="text-sm text-gray-400 font-medium">Projects Delivered</div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
                  AWS
                </div>
                <div className="text-sm text-gray-400 font-medium">Certified Expert</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content (3 columns) */}
          <motion.div
            className="lg:col-span-3 space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main Content */}
            <motion.div variants={textVariants} className="space-y-8">
              <div className="prose prose-xl prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-xl mb-6">
                  I'm <span className="text-cyan-400 font-semibold">Kiran Garud</span>, a DevOps Engineer with a uniquely diverse background that shapes the way I build and innovate in the cloud. My journey began in commerce, moved through the logistics sector, and ultimately led me to cloud computing — where I discovered a deep passion for automation, infrastructure, and scalable solutions.
                </p>

                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  Driven by resilience and curiosity, I've earned multiple certifications including the <span className="text-purple-400 font-semibold">AWS Solutions Architect – Associate</span>, and delivered <span className="text-cyan-400 font-semibold">20+ real-world cloud projects</span> across diverse domains. My expertise lies in architecting secure, scalable, and intelligent infrastructure using tools like Terraform, Jenkins, Docker, and Kubernetes, while integrating modern DevOps best practices.
                </p>

                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  I operate at the crossroads of <span className="text-green-400 font-semibold">AI and automation</span>, where strategy meets execution. Whether it's implementing robust CI/CD pipelines, infrastructure as code, or containerized deployments, I bring precision, creativity, and performance-driven solutions to every engagement.
                </p>

                <p className="text-gray-300 leading-relaxed text-lg">
                  Beyond infrastructure, I build <span className="text-pink-400 font-semibold">AI-powered, microservices-ready websites</span> — end-to-end systems that are fully cloud-native, responsive, and deployment-ready. These applications are optimized for high availability, security, and seamless scaling in production environments.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-transparent transition-all duration-500"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${highlight.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
              
              <div className={`relative w-16 h-16 bg-gradient-to-r ${highlight.color} rounded-2xl flex items-center justify-center mb-6`}>
                <highlight.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                {highlight.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            variants={itemVariants}
            className="text-4xl font-bold text-white mb-12"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Technology Expertise
            </span>
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                className="px-6 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-gray-300 rounded-full font-medium hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 20px -5px rgba(6, 182, 212, 0.3)"
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;