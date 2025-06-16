export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  category?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Enhanced Multi-Tier Infrastructure',
    description: 'Next-generation scalable web application infrastructure with AI-powered auto-scaling, intelligent load balancing, and predictive resource optimization using advanced Terraform configurations.',
    techStack: ['AWS', 'Terraform', 'EC2', 'RDS', 'CloudWatch', 'ALB', 'AI/ML', 'Lambda'],
    githubUrl: 'https://github.com/username/ai-infrastructure',
    category: 'infrastructure',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'Intelligent CI/CD Pipeline Orchestration',
    description: 'Revolutionary CI/CD pipeline with AI-driven testing optimization, automated security scanning, and intelligent deployment strategies using machine learning for performance prediction.',
    techStack: ['GitHub Actions', 'Docker', 'AWS ECS', 'Terraform', 'SonarQube', 'AI Analytics'],
    githubUrl: 'https://github.com/username/intelligent-cicd',
    liveUrl: 'https://demo-pipeline.cloudnex.com',
    category: 'automation',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    title: 'Serverless AI Command Center',
    description: 'Enterprise-grade serverless application with advanced AI integration, real-time analytics, and intelligent automation using AWS Lambda, API Gateway, and cutting-edge machine learning models.',
    techStack: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'OpenAI API', 'React', 'WebSockets'],
    githubUrl: 'https://github.com/username/ai-command-center',
    liveUrl: 'https://ai-center.cloudnex.com',
    category: 'ai-integration',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    title: 'Quantum-Ready Monitoring Ecosystem',
    description: 'Advanced monitoring solution with AI-powered anomaly detection, predictive alerting, and self-healing infrastructure capabilities for next-generation Kubernetes environments.',
    techStack: ['Kubernetes', 'Prometheus', 'Grafana', 'AlertManager', 'Helm', 'AI/ML', 'Istio'],
    githubUrl: 'https://github.com/username/quantum-monitoring',
    category: 'monitoring',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '5',
    title: 'Autonomous Cost Optimization Engine',
    description: 'AI-driven cost optimization platform with machine learning algorithms for resource rightsizing, intelligent scheduling, and automated cost reduction strategies across multi-cloud environments.',
    techStack: ['AWS Cost Explorer', 'Lambda', 'CloudWatch', 'Python', 'Boto3', 'TensorFlow'],
    githubUrl: 'https://github.com/username/autonomous-optimization',
    category: 'automation',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '6',
    title: 'Neural Network Security Framework',
    description: 'Revolutionary security architecture using AI-powered threat detection, automated incident response, and intelligent compliance monitoring for enterprise cloud environments.',
    techStack: ['AWS Security Hub', 'GuardDuty', 'Config', 'IAM', 'Machine Learning', 'Python'],
    githubUrl: 'https://github.com/username/neural-security',
    category: 'infrastructure',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];