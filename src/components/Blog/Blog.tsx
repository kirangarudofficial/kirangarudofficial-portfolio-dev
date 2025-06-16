import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const Blog: React.FC = () => {
  // Sample blog posts - these would typically come from a CMS or API
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Building Resilient CI/CD Pipelines with GitHub Actions',
      excerpt: 'Learn how to create robust continuous integration and deployment pipelines that handle failures gracefully and provide comprehensive feedback.',
      date: '2025-01-15',
      readTime: '8 min read',
      category: 'DevOps',
      slug: 'resilient-cicd-pipelines-github-actions'
    },
    {
      id: '2',
      title: 'Cost Optimization Strategies for AWS Infrastructure',
      excerpt: 'Practical techniques to reduce your AWS bill while maintaining performance and reliability. Real-world examples and actionable tips.',
      date: '2025-01-10',
      readTime: '12 min read',
      category: 'AWS',
      slug: 'aws-cost-optimization-strategies'
    },
    {
      id: '3',
      title: 'Integrating AI Tools into DevOps Workflows',
      excerpt: 'How AI-powered tools like GitHub Copilot and ChatGPT can accelerate infrastructure development and improve code quality.',
      date: '2025-01-05',
      readTime: '10 min read',
      category: 'AI & DevOps',
      slug: 'ai-tools-devops-workflows'
    },
    {
      id: '4',
      title: 'From Commercial Background to Cloud Engineer: My Journey',
      excerpt: 'The challenges, strategies, and lessons learned during my career transition into cloud engineering and DevOps.',
      date: '2025-01-01',
      readTime: '15 min read',
      category: 'Career',
      slug: 'commercial-to-cloud-engineer-journey'
    },
    {
      id: '5',
      title: 'Infrastructure as Code Best Practices with Terraform',
      excerpt: 'Essential patterns and practices for writing maintainable, scalable Terraform configurations for production environments.',
      date: '2024-12-28',
      readTime: '14 min read',
      category: 'Terraform',
      slug: 'terraform-infrastructure-as-code-best-practices'
    },
    {
      id: '6',
      title: 'Monitoring and Observability in Modern Cloud Applications',
      excerpt: 'Comprehensive guide to implementing effective monitoring, logging, and alerting strategies for cloud-native applications.',
      date: '2024-12-22',
      readTime: '11 min read',
      category: 'Monitoring',
      slug: 'monitoring-observability-cloud-applications'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DevOps': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'AWS': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'AI & DevOps': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'Career': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Terraform': return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
      case 'Monitoring': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Insights on DevOps practices, cloud architecture, AI integration, and career development 
            in the ever-evolving world of technology
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(blogPosts[0].category)}`}>
                {blogPosts[0].category}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Featured Post</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {blogPosts[0].title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              {blogPosts[0].excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(blogPosts[0].date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blogPosts[0].readTime}
                </div>
              </div>
              
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Read Article
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200">
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest insights on DevOps, cloud architecture, and AI integration 
            delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 dark:text-white"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;