import { Job } from '../../components/jobs/JobCard';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Ghana',
    location: 'Accra',
    type: 'Full-time',
    description:
      'We are looking for a talented Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications.',
    postedAt: new Date('2023-05-15'),
  },
  {
    id: '2',
    title: 'Community Health Volunteer',
    company: 'Ghana Health Service',
    location: 'Kumasi',
    type: 'Internship',
    description:
      'Join our team of community health volunteers to help educate local communities about preventive healthcare measures.',
    postedAt: new Date('2023-05-10'),
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Ashesi Innovation Lab',
    location: 'Accra',
    type: 'Internship',
    description:
      'Join our data science team for a 3-month internship. You will work on real-world projects analyzing data to solve local challenges.',
    postedAt: new Date('2023-05-20'),
  },
  {
    id: '4',
    title: 'Agricultural Research Assistant',
    company: 'Ghana Agricultural Research Institute',
    location: 'Tamale',
    type: 'Part-time',
    description:
      'Support our research team in conducting field studies on sustainable farming practices in Northern Ghana.',
    postedAt: new Date('2023-05-18'),
  },
  {
    id: '5',
    title: 'Social Media Manager',
    company: 'Digital Ghana',
    location: 'Remote',
    type: 'Contract',
    description:
      'Manage social media accounts for various clients, creating engaging content and growing their online presence.',
    postedAt: new Date('2023-05-22'),
  },
];
