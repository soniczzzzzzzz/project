import React from 'react';
import { Github, Linkedin, Mail, Code, Heart, Users, Award, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
  const developers = [
    {
      name: 'Arjun Sharma',
      role: 'Full Stack Developer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Passionate about environmental tech and AI-driven solutions for air quality monitoring.',
      skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
      github: 'https://github.com/arjunsharma',
      linkedin: 'https://linkedin.com/in/arjunsharma',
      email: 'arjun@aqimonitor.com'
    },
    {
      name: 'Priya Patel',
      role: 'AI/ML Engineer',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Specializes in predictive modeling and data analysis for environmental applications.',
      skills: ['TensorFlow', 'Python', 'Data Science', 'Deep Learning'],
      github: 'https://github.com/priyapatel',
      linkedin: 'https://linkedin.com/in/priyapatel',
      email: 'priya@aqimonitor.com'
    },
    {
      name: 'Rohit Kumar',
      role: 'Frontend Developer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Creates beautiful and intuitive user interfaces with focus on accessibility and performance.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX Design'],
      github: 'https://github.com/rohitkumar',
      linkedin: 'https://linkedin.com/in/rohitkumar',
      email: 'rohit@aqimonitor.com'
    },
    {
      name: 'Sneha Gupta',
      role: 'Data Scientist',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Expert in environmental data analysis and statistical modeling for air quality predictions.',
      skills: ['Python', 'R', 'Statistics', 'Data Visualization'],
      github: 'https://github.com/snehagupta',
      linkedin: 'https://linkedin.com/in/snehagupta',
      email: 'sneha@aqimonitor.com'
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Real-time Monitoring',
      description: 'Live air quality data from major Indian cities with instant updates and alerts.'
    },
    {
      icon: Code,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models for accurate 7-day air quality forecasting.'
    },
    {
      icon: Heart,
      title: 'Health Recommendations',
      description: 'Personalized health advice, mask recommendations, and air purifier suggestions.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Built for Indian cities with localized data and culturally relevant recommendations.'
    }
  ];

  const stats = [
    { label: 'Cities Monitored', value: '15+' },
    { label: 'Data Points Daily', value: '50K+' },
    { label: 'Prediction Accuracy', value: '96%' },
    { label: 'Active Users', value: '10K+' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About AQI Monitor</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Empowering Indians with real-time air quality data and AI-driven health recommendations 
            to make informed decisions about their daily activities and health protection.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To provide accessible, accurate, and actionable air quality information to every Indian citizen, 
            helping them protect their health and make informed decisions about outdoor activities, 
            travel, and lifestyle choices in an increasingly polluted environment.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To become India's most trusted platform for air quality monitoring and health protection, 
            leveraging cutting-edge AI technology to predict pollution patterns and provide 
            personalized recommendations that improve the quality of life for millions.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Development Team */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {developers.map((dev, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-1">{dev.name}</h3>
              <p className="text-purple-600 font-medium mb-3">{dev.role}</p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{dev.bio}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {dev.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-center gap-3">
                <a
                  href={dev.github}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={dev.linkedin}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${dev.email}`}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'React', 'TypeScript', 'Tailwind CSS', 'Node.js',
            'Python', 'TensorFlow', 'MongoDB', 'AWS'
          ].map((tech, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="font-semibold text-gray-800">{tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="text-purple-100 mb-6">
          Have questions, suggestions, or want to contribute? We'd love to hear from you!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:team@aqimonitor.com"
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </a>
          <a
            href="https://github.com/aqimonitor"
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;