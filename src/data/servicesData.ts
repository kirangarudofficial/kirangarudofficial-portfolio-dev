export interface Service {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: 'IaaS' | 'PaaS' | 'SaaS' | 'Other';
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Infrastructure Automation',
    description: 'Complete infrastructure provisioning and automation using Infrastructure as Code principles',
    tools: ['Terraform', 'AWS CloudFormation', 'AWS CDK', 'Pulumi', 'Ansible'],
    category: 'IaaS'
  },
  {
    id: '2',
    title: 'Cloud Architecture Design',
    description: 'Scalable and resilient cloud architectures tailored to your business needs',
    tools: ['AWS Well-Architected', 'Multi-Region Design', 'Disaster Recovery', 'Cost Optimization'],
    category: 'IaaS'
  },
  {
    id: '3',
    title: 'Container Orchestration',
    description: 'Setup and management of containerized applications with Kubernetes and AWS ECS',
    tools: ['Kubernetes', 'AWS ECS', 'Docker', 'Helm', 'AWS Fargate'],
    category: 'PaaS'
  },
  {
    id: '4',
    title: 'CI/CD Pipeline Implementation',
    description: 'Automated build, test, and deployment pipelines for rapid and reliable software delivery',
    tools: ['GitHub Actions', 'AWS CodePipeline', 'GitLab CI', 'Jenkins', 'AWS CodeBuild'],
    category: 'PaaS'
  },
  {
    id: '5',
    title: 'Serverless Solutions',
    description: 'Event-driven serverless architectures for scalable and cost-effective applications',
    tools: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'EventBridge', 'Step Functions'],
    category: 'PaaS'
  },
  {
    id: '6',
    title: 'Monitoring & Observability',
    description: 'Comprehensive monitoring solutions with alerting and performance optimization',
    tools: ['CloudWatch', 'Prometheus', 'Grafana', 'Datadog', 'New Relic'],
    category: 'SaaS'
  },
  {
    id: '7',
    title: 'Security & Compliance',
    description: 'Implementation of security best practices and compliance frameworks',
    tools: ['AWS Security Hub', 'GuardDuty', 'Config', 'IAM', 'Secrets Manager'],
    category: 'SaaS'
  },
  {
    id: '8',
    title: 'DevOps Consultation',
    description: 'Strategic guidance on DevOps transformation and best practices implementation',
    tools: ['Process Optimization', 'Tool Selection', 'Team Training', 'Migration Planning'],
    category: 'Other'
  }
];