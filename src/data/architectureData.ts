export interface Architecture {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
}

export const architectures: Architecture[] = [
  {
    id: '1',
    title: 'Multi-Tier Web Application',
    description: 'Scalable three-tier architecture with load balancers, auto-scaling groups, and RDS database',
    category: 'Web Applications',
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Serverless Event-Driven Architecture',
    description: 'Event-driven microservices using Lambda, SQS, and EventBridge for decoupled processing',
    category: 'Serverless',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'CI/CD Pipeline Architecture',
    description: 'Complete DevOps pipeline with automated testing, security scanning, and deployment',
    category: 'DevOps',
    thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Microservices on Kubernetes',
    description: 'Container orchestration with service mesh, monitoring, and automated scaling',
    category: 'Containerization',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    title: 'Data Lake Analytics Platform',
    description: 'Big data processing architecture using S3, Glue, Athena, and QuickSight',
    category: 'Data & Analytics',
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    title: 'Multi-Region Disaster Recovery',
    description: 'High availability setup with cross-region replication and automated failover',
    category: 'High Availability',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    title: 'IoT Data Pipeline',
    description: 'Real-time IoT data ingestion and processing using AWS IoT Core and Kinesis',
    category: 'IoT',
    thumbnail: 'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    title: 'Machine Learning Pipeline',
    description: 'End-to-end ML workflow with automated training, validation, and deployment',
    category: 'Machine Learning',
    thumbnail: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '9',
    title: 'Content Delivery Network',
    description: 'Global content distribution with CloudFront, S3, and edge locations',
    category: 'Content Delivery',
    thumbnail: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '10',
    title: 'Zero-Trust Security Architecture',
    description: 'Comprehensive security model with identity verification and encrypted communications',
    category: 'Security',
    thumbnail: 'https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];