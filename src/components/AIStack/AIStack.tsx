import React, { useState } from 'react';
import { Bot, Brain, Code, Database, Cloud, Cpu, Zap, Palette, Network, BarChart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiTools } from '../../data/aiToolsData';

const AIStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const getIconByName = (name: string) => {
    switch (name) {
      case 'ChatGPT': return Code;
      case 'Claude': return Bot;
      case 'Google Gemini': return Brain;
      case 'GitHub Copilot': return Code;
      case 'LangChain': return Network;
      case 'Pinecone': return Database;
      case 'Rollout.site': return Cloud;
      case 'Bolt.new': return Palette;
      case 'AWS Bedrock': return Cloud;
      case 'Replicate': return Cpu;
      default: return Zap;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development': return 'from-blue-400 to-cyan-500';
      case 'Documentation': return 'from-green-400 to-emerald-500';
      case 'Research': return 'from-purple-400 to-violet-500';
      case 'Automation': return 'from-orange-400 to-red-500';
      case 'Database': return 'from-red-400 to-pink-500';
      case 'Deployment': return 'from-teal-400 to-cyan-500';
      case 'Design': return 'from-pink-400 to-rose-500';
      case 'Cloud AI': return 'from-indigo-400 to-blue-500';
      case 'ML Ops': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const categories = ['all', ...Array.from(new Set(aiTools.map(tool => tool.category)))];
  const filteredTools = selectedCategory === 'all' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <section id="ai-stack" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">AI-Powered Innovation</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Next-Generation
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI Technology Stack
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Harness the power of cutting-edge AI tools to revolutionize DevOps workflows, 
            automate complex processes, and accelerate innovation cycles.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-400'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* AI Tools Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          layout
        >
          <AnimatePresence>
            {filteredTools.map((tool) => {
              const IconComponent = getIconByName(tool.name);
              const categoryGradient = getCategoryColor(tool.category);
              
              return (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500"
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>

                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div
                      className={`relative p-4 bg-gradient-to-r ${categoryGradient} rounded-2xl flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                      
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${categoryGradient} rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                          {tool.name}
                        </h3>
                        <motion.span
                          className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${categoryGradient} text-white`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tool.category}
                        </motion.span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>

                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-purple-400" />
                          DevOps Integration:
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {tool.useCase}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${categoryGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* AI Integration Benefits */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI-Enhanced DevOps Advantages
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart,
                title: 'Exponential Productivity',
                description: 'AI-driven automation accelerates development cycles by 300%, reduces manual tasks, and provides intelligent insights for faster problem resolution.',
                gradient: 'from-blue-400 to-cyan-500'
              },
              {
                icon: Brain,
                title: 'Intelligent Decision Making',
                description: 'Leverage machine learning for predictive scaling, automated log analysis, and intelligent infrastructure optimization recommendations.',
                gradient: 'from-green-400 to-emerald-500'
              },
              {
                icon: Zap,
                title: 'Continuous Innovation',
                description: 'Stay ahead with cutting-edge AI integration, automated learning systems, and adaptive infrastructure that evolves with your needs.',
                gradient: 'from-purple-400 to-pink-500'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`relative p-6 bg-gradient-to-r ${benefit.gradient} rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="h-10 w-10 text-white" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                </motion.div>
                
                <h4 className="text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIStack;