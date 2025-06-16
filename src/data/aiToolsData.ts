export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  useCase: string;
}

export const aiTools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced code generation and logic refinement',
    category: 'Development',
    useCase: 'Infrastructure as Code generation, debugging complex scripts, and architectural design consultation'
  },
  {
    id: '2',
    name: 'Claude',
    description: 'Technical documentation and analysis assistant',
    category: 'Documentation',
    useCase: 'Creating comprehensive documentation, code reviews, and technical specifications'
  },
  {
    id: '3',
    name: 'Google Gemini',
    description: 'AI research and cloud architecture analysis',
    category: 'Research',
    useCase: 'Multi-modal analysis of architecture diagrams and technical research'
  },
  {
    id: '4',
    name: 'GitHub Copilot',
    description: 'Intelligent code completion and acceleration',
    category: 'Development',
    useCase: 'Terraform configuration writing, YAML pipeline creation, and automation scripts'
  },
  {
    id: '5',
    name: 'LangChain',
    description: 'AI workflow orchestration and automation',
    category: 'Automation',
    useCase: 'Building intelligent DevOps workflows and automated decision-making systems'
  },
  {
    id: '6',
    name: 'Pinecone',
    description: 'Vector database for semantic search capabilities',
    category: 'Database',
    useCase: 'Intelligent log analysis and infrastructure knowledge management'
  },
  {
    id: '7',
    name: 'Rollout.site',
    description: 'AI-powered deployment and hosting platform',
    category: 'Deployment',
    useCase: 'Rapid prototyping and deployment of AI-enhanced applications'
  },
  {
    id: '8',
    name: 'Bolt.new',
    description: 'AI-driven design and development generator',
    category: 'Design',
    useCase: 'Creating infrastructure dashboards and DevOps tooling interfaces'
  },
  {
    id: '9',
    name: 'AWS Bedrock',
    description: 'Managed generative AI services on AWS',
    category: 'Cloud AI',
    useCase: 'Integrating AI capabilities into cloud infrastructure and automation workflows'
  },
  {
    id: '10',
    name: 'Replicate',
    description: 'Hosted AI model inference platform',
    category: 'ML Ops',
    useCase: 'Deploying and scaling AI models for infrastructure monitoring and analysis'
  }
];