
import React from 'react';
import { ExternalLink, Phone, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'hotline' | 'chat' | 'article';
  link?: string;
  phone?: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'National Suicide Prevention Lifeline',
    description: '24/7, free and confidential support for people in distress',
    type: 'hotline',
    phone: '1-800-273-8255',
  },
  {
    id: '2',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 to connect with a Crisis Counselor',
    type: 'chat',
    link: 'https://www.crisistextline.org/',
  },
  {
    id: '3',
    title: 'SAMHSA's National Helpline',
    description: 'Treatment referral and information service for individuals and families',
    type: 'hotline',
    phone: '1-800-662-4357',
  },
  {
    id: '4',
    title: 'Understanding Anxiety',
    description: 'Learn about different types of anxiety and coping strategies',
    type: 'article',
    link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
  },
  {
    id: '5',
    title: '7 Cups',
    description: 'Connect with trained listeners for emotional support',
    type: 'chat',
    link: 'https://www.7cups.com/',
  },
  {
    id: '6',
    title: 'Mental Health First Aid',
    description: 'Learn how to identify, understand and respond to mental health issues',
    type: 'article',
    link: 'https://www.mentalhealthfirstaid.org/',
  },
];

const ResourcesSection = () => {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'hotline':
        return <Phone className="w-5 h-5" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5" />;
      case 'article':
        return <FileText className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const getActionButton = (resource: Resource) => {
    switch (resource.type) {
      case 'hotline':
        return (
          <Button
            as="a"
            href={`tel:${resource.phone}`}
            className="text-sm bg-green-500 hover:bg-green-600 text-white"
          >
            Call Now
          </Button>
        );
      case 'chat':
        return (
          <Button
            as="a"
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-mindful-500 hover:bg-mindful-600 text-white"
          >
            Chat Now
          </Button>
        );
      case 'article':
        return (
          <Button
            as="a"
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="text-sm"
          >
            Read More
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Mental Health Resources</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Connect with professional mental health services, support groups, and educational resources
          for your wellbeing journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="glass-panel p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4 flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
                ${resource.type === 'hotline' ? 'bg-green-100 text-green-500' : 
                  resource.type === 'chat' ? 'bg-mindful-100 text-mindful-500' : 
                  'bg-neutral-100 text-neutral-500'}`}
              >
                {getIcon(resource.type)}
              </div>
              <h3 className="font-semibold text-lg">{resource.title}</h3>
            </div>
            <p className="text-neutral-600 mb-6 flex-grow">{resource.description}</p>
            <div className="mt-auto">
              {getActionButton(resource)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 glass-panel text-center">
        <h3 className="text-xl font-semibold mb-4">Need Immediate Help?</h3>
        <p className="text-neutral-600 mb-6">
          If you or someone you know is in immediate danger, please call emergency services
          or go to your nearest emergency room.
        </p>
        <Button
          as="a"
          href="tel:911"
          className="bg-red-500 hover:bg-red-600 text-white px-6"
        >
          Call Emergency Services
        </Button>
      </div>
    </div>
  );
};

export default ResourcesSection;
