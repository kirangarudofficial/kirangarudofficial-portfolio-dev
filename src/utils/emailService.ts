import { ContactFormData } from '../types/terminal';

export const parseContactForm = (filename: string, content: string): ContactFormData => {
  const data: ContactFormData = {};
  
  try {
    if (filename.endsWith('.json')) {
      const parsed = JSON.parse(content);
      return {
        name: parsed.name || parsed.full_name || parsed.fullName,
        email: parsed.email || parsed.email_address || parsed.emailAddress,
        phone: parsed.phone || parsed.phone_number || parsed.phoneNumber,
        message: parsed.message || parsed.description,
        projectType: parsed.project_type || parsed.projectType || parsed.type,
        budget: parsed.budget,
        timeline: parsed.timeline,
        requirements: parsed.requirements || []
      };
    } else if (filename.endsWith('.yaml') || filename.endsWith('.yml')) {
      // Simple YAML parsing for demo purposes
      const lines = content.split('\n');
      for (const line of lines) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim().replace(/['"]/g, '');
        
        if (key && value) {
          const cleanKey = key.trim().toLowerCase();
          switch (cleanKey) {
            case 'name':
            case 'full_name':
              data.name = value;
              break;
            case 'email':
            case 'email_address':
              data.email = value;
              break;
            case 'phone':
            case 'phone_number':
              data.phone = value;
              break;
            case 'message':
            case 'description':
              data.message = value;
              break;
            case 'project_type':
            case 'type':
              data.projectType = value;
              break;
            case 'budget':
              data.budget = value;
              break;
            case 'timeline':
              data.timeline = value;
              break;
          }
        }
      }
    } else {
      // Plain text parsing
      const lines = content.split('\n');
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim().toLowerCase();
          const value = line.substring(colonIndex + 1).trim();
          
          if (value) {
            switch (key) {
              case 'full name':
              case 'name':
                data.name = value;
                break;
              case 'email address':
              case 'email':
                data.email = value;
                break;
              case 'phone number':
              case 'phone':
                data.phone = value;
                break;
              case 'message':
              case 'description':
              case 'message/description':
                data.message = value;
                break;
              case 'project type':
              case 'type':
                data.projectType = value;
                break;
              case 'budget':
                data.budget = value;
                break;
              case 'timeline':
                data.timeline = value;
                break;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error parsing contact form:', error);
  }
  
  return data;
};

export const sendContactForm = async (filename: string, content: string): Promise<void> => {
  const contactData = parseContactForm(filename, content);
  
  // In a real implementation, you would send this to your backend
  // For demo purposes, we'll simulate the API call
  
  const payload = {
    filename,
    content,
    parsedData: contactData,
    timestamp: new Date().toISOString(),
    source: 'terminal'
  };
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log the data (in production, this would be sent to your email service)
  console.log('Contact form submitted:', payload);
  
  // You could integrate with services like:
  // - EmailJS for client-side email sending
  // - Your own backend API
  // - Netlify Forms
  // - Formspree
  // - SendGrid API
  
  // Example EmailJS integration:
  /*
  try {
    await emailjs.send(
      'your_service_id',
      'your_template_id',
      {
        from_name: contactData.name,
        from_email: contactData.email,
        phone: contactData.phone,
        message: contactData.message,
        project_type: contactData.projectType,
        budget: contactData.budget,
        timeline: contactData.timeline,
        raw_content: content
      },
      'your_public_key'
    );
  } catch (error) {
    throw new Error('Failed to send email');
  }
  */
  
  // For now, we'll just resolve successfully
  return Promise.resolve();
};

export const validateContactData = (data: ContactFormData): string[] => {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }
  
  return errors;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};