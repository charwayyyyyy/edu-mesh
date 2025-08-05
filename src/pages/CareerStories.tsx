import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from '../store';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface CareerStory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    university: string;
    department: string;
    graduationYear: string;
    currentPosition: string;
    company: string;
    location: string;
  };
  publishedDate: string;
  readTime: number;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  featured: boolean;
  type: 'success' | 'challenge' | 'journey' | 'advice';
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    caption?: string;
  }[];
}

interface StoryFilter {
  university?: string;
  department?: string;
  type?: 'success' | 'challenge' | 'journey' | 'advice' | 'all';
  tag?: string;
}

const CareerStories = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState<CareerStory[]>([]);
  const [filteredStories, setFilteredStories] = useState<CareerStory[]>([]);
  const [filters, setFilters] = useState<StoryFilter>({ type: 'all' });
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredStory, setFeaturedStory] = useState<CareerStory | null>(null);
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number }[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockStories: CareerStory[] = [
          {
            id: '1',
            title: 'From Campus to Corporate: My Journey in Tech',
            excerpt:
              'How I navigated the transition from a computer science student at University of Ghana to a software engineer at a leading tech company.',
            content:
              "# From Campus to Corporate: My Journey in Tech\n\nWhen I started my Computer Science degree at the University of Ghana, I had no idea where my path would lead. Like many students, I was overwhelmed by the breadth of the field and unsure of my place in it.\n\n## The Early Days\n\nMy first two years were challenging. I struggled with some of the theoretical concepts and often questioned if I had made the right choice. The turning point came during my second year when I joined the university's coding club. There, I found a community of like-minded individuals who were passionate about building things.\n\n## Finding My Path\n\nDuring my third year, I secured an internship at a local startup through a university connection. This experience was invaluable - I got to apply my knowledge in a real-world setting and learn about software development beyond what was taught in the classroom.\n\n## The Challenges\n\nThe journey wasn't without obstacles. I faced rejection from several companies before landing my internship. After graduation, the job search was equally challenging. I applied to over 50 positions before receiving my first offer.\n\n## Lessons Learned\n\n1. **Build a portfolio**: Class projects aren't enough. Work on personal projects that showcase your skills and passion.\n\n2. **Network actively**: Many opportunities come through connections. Attend industry events, join online communities, and reach out to alumni.\n\n3. **Embrace continuous learning**: Technology evolves rapidly. Dedicate time to learning new tools and frameworks.\n\n4. **Seek mentorship**: Find experienced professionals who can guide you and provide insights into the industry.\n\n## Where I Am Now\n\nToday, I work as a Software Engineer at TechCorp Ghana, where I contribute to building products that serve millions of users across Africa. The challenges I faced during my academic journey prepared me for the demands of the corporate world.\n\n## Advice for Current Students\n\nIf you're currently studying Computer Science or a related field, remember that your degree is just the beginning. The skills you develop outside the classroom - through projects, internships, and self-learning - will significantly impact your career trajectory.\n\nDon't be discouraged by setbacks. Each rejection and challenge is an opportunity to learn and grow. Stay persistent, keep building, and trust that your efforts will eventually pay off.\n\nI'm always open to connecting with students and recent graduates. Feel free to reach out if you have questions or need guidance on your own journey.",
            author: {
              id: 'user1',
              name: 'Kwame Mensah',
              avatar: 'https://ui-avatars.com/api/?name=Kwame+Mensah&background=0D8ABC&color=fff',
              university: 'University of Ghana',
              department: 'Computer Science',
              graduationYear: '2019',
              currentPosition: 'Software Engineer',
              company: 'TechCorp Ghana',
              location: 'Accra, Ghana',
            },
            publishedDate: '2023-04-15',
            readTime: 8,
            tags: ['tech', 'software engineering', 'career transition', 'mentorship'],
            likes: 156,
            comments: 32,
            views: 1245,
            featured: true,
            type: 'journey',
            media: [
              {
                type: 'image',
                url: 'https://via.placeholder.com/800x400?text=Campus+to+Corporate',
                caption: 'My graduation day at University of Ghana',
              },
              {
                type: 'image',
                url: 'https://via.placeholder.com/800x400?text=First+Day+at+Work',
                caption: 'First day at TechCorp Ghana',
              },
            ],
          },
          {
            id: '2',
            title: 'Overcoming Imposter Syndrome in the Finance Industry',
            excerpt:
              'My experience dealing with self-doubt as a young financial analyst from KNUST entering the competitive banking sector.',
            content: 'Full content of the story would go here...',
            author: {
              id: 'user2',
              name: 'Ama Serwaa',
              avatar: 'https://ui-avatars.com/api/?name=Ama+Serwaa&background=5F2EEA&color=fff',
              university: 'Kwame Nkrumah University of Science and Technology',
              department: 'Banking and Finance',
              graduationYear: '2020',
              currentPosition: 'Financial Analyst',
              company: 'Ghana Commercial Bank',
              location: 'Kumasi, Ghana',
            },
            publishedDate: '2023-05-02',
            readTime: 6,
            tags: ['finance', 'banking', 'imposter syndrome', 'personal growth'],
            likes: 98,
            comments: 24,
            views: 876,
            featured: false,
            type: 'challenge',
            media: [
              {
                type: 'image',
                url: 'https://via.placeholder.com/800x400?text=Finance+Professional',
                caption: 'Working at my desk at Ghana Commercial Bank',
              },
            ],
          },
          {
            id: '3',
            title: 'Building a Sustainable Agriculture Startup After Graduation',
            excerpt:
              'How my agricultural engineering degree from University of Cape Coast led to founding an agritech company addressing food security.',
            content: 'Full content of the story would go here...',
            author: {
              id: 'user3',
              name: 'Kofi Adu',
              avatar: 'https://ui-avatars.com/api/?name=Kofi+Adu&background=16A34A&color=fff',
              university: 'University of Cape Coast',
              department: 'Agricultural Engineering',
              graduationYear: '2018',
              currentPosition: 'Founder & CEO',
              company: 'GreenHarvest Technologies',
              location: 'Cape Coast, Ghana',
            },
            publishedDate: '2023-03-20',
            readTime: 10,
            tags: ['agriculture', 'entrepreneurship', 'sustainability', 'innovation'],
            likes: 210,
            comments: 45,
            views: 1890,
            featured: true,
            type: 'success',
            media: [
              {
                type: 'image',
                url: 'https://via.placeholder.com/800x400?text=Agricultural+Innovation',
                caption: 'Our smart irrigation system in action',
              },
              {
                type: 'image',
                url: 'https://via.placeholder.com/800x400?text=Team+Photo',
                caption: 'The GreenHarvest team at our farm site',
              },
            ],
          },
          {
            id: '4',
            title: 'Navigating the Path to Medical Residency',
            excerpt:
              'Advice for medical students on preparing for and succeeding in residency applications based on my experience at Korle-Bu Teaching Hospital.',
            content: 'Full content of the story would go here...',
            author: {
              id: 'user4',
              name: 'Dr. Abena Osei',
              avatar: 'https://ui-avatars.com/api/?name=Abena+Osei&background=DC2626&color=fff',
              university: 'University of Ghana Medical School',
              department: 'Medicine',
              graduationYear: '2017',
              currentPosition: 'Resident Physician',
              company: 'Korle-Bu Teaching Hospital',
              location: 'Accra, Ghana',
            },
            publishedDate: '2023-05-10',
            readTime: 12,
            tags: ['medicine', 'residency', 'healthcare', 'medical education'],
            likes: 175,
            comments: 38,
            views: 1560,
            featured: false,
            type: 'advice',
            media: [
              {
                type: 'image',
                url: 'https://via.placeholder.com/800x400?text=Medical+Residency',
                caption: 'Working with patients at Korle-Bu Teaching Hospital',
              },
            ],
          },
          {
            id: '5',
            title: 'From English Major to Content Marketing Leader',
            excerpt:
              'How I leveraged my humanities background from University of Ghana to build a successful career in digital marketing.',
            content: 'Full content of the story would go here...',
            author: {
              id: 'user5',
              name: 'Efua Mensah',
              avatar: 'https://ui-avatars.com/api/?name=Efua+Mensah&background=F59E0B&color=fff',
              university: 'University of Ghana',
              department: 'English',
              graduationYear: '2019',
              currentPosition: 'Content Marketing Manager',
              company: 'Digital Ghana Media',
              location: 'Accra, Ghana',
            },
            publishedDate: '2023-04-28',
            readTime: 7,
            tags: ['marketing', 'content creation', 'humanities', 'career change'],
            likes: 132,
            comments: 29,
            views: 1120,
            featured: false,
            type: 'journey',
            media: [
              {
                type: 'image',
                url: 'https://via.placeholder.com/800x400?text=Content+Marketing',
                caption: 'Leading a content strategy session at Digital Ghana Media',
              },
            ],
          },
        ];

        setStories(mockStories);
        setFilteredStories(mockStories);

        // Set featured story
        const featured = mockStories.find((story) => story.featured);
        if (featured) {
          setFeaturedStory(featured);
        }

        // Extract and count tags
        const tagCounts: Record<string, number> = {};
        mockStories.forEach((story) => {
          story.tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        });

        // Convert to array and sort by count
        const sortedTags = Object.entries(tagCounts)
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10); // Take top 10 tags

        setPopularTags(sortedTags);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    // Filter stories based on filters and search query
    let filtered = [...stories];

    if (filters.university) {
      filtered = filtered.filter((story) => story.author.university === filters.university);
    }

    if (filters.department) {
      filtered = filtered.filter((story) => story.author.department === filters.department);
    }

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((story) => story.type === filters.type);
    }

    if (filters.tag) {
      filtered = filtered.filter((story) => story.tags.includes(filters.tag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (story) =>
          story.title.toLowerCase().includes(query) ||
          story.excerpt.toLowerCase().includes(query) ||
          story.author.name.toLowerCase().includes(query) ||
          story.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredStories(filtered);
  }, [stories, filters, searchQuery]);

  const handleFilterChange = (filterType: keyof StoryFilter, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleTagClick = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tag: prev.tag === tag ? undefined : tag,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStoryTypeColor = (type: CareerStory['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'challenge':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'journey':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advice':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading career stories..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Career Stories
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Real journeys, challenges, and successes from alumni who've walked the path before you
          </p>
        </div>

        {/* Featured Story */}
        {featuredStory && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Story</h2>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="md:flex">
                {featuredStory.media && featuredStory.media.length > 0 && (
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <img
                      className="h-48 w-full object-cover md:h-full"
                      src={featuredStory.media[0].url}
                      alt={featuredStory.media[0].caption || featuredStory.title}
                    />
                  </div>
                )}
                <div className="p-6 md:p-8 md:flex-1">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStoryTypeColor(featuredStory.type)}`}
                    >
                      {featuredStory.type.charAt(0).toUpperCase() + featuredStory.type.slice(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(featuredStory.publishedDate)} • {featuredStory.readTime} min read
                    </span>
                  </div>
                  <Link to={`/stories/${featuredStory.id}`} className="block mt-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                      {featuredStory.title}
                    </h3>
                  </Link>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                    {featuredStory.excerpt}
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={featuredStory.author.avatar || `https://ui-avatars.com/api/?name=${featuredStory.author.name}`}
                        alt={featuredStory.author.name}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {featuredStory.author.name}
                      </p>
                      <div className="flex text-sm text-gray-500 dark:text-gray-400">
                        <span>{featuredStory.author.currentPosition}</span>
                        <span className="mx-1">•</span>
                        <span>{featuredStory.author.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center">
                        <HeartIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        {featuredStory.likes}
                      </span>
                      <span className="inline-flex items-center">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        {featuredStory.comments}
                      </span>
                      <span className="inline-flex items-center">
                        <BookOpenIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                        {featuredStory.views}
                      </span>
                    </div>
                    <Link
                      to={`/stories/${featuredStory.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 dark:text-primary-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Read full story
                      <ChevronRightIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterChange('type', 'all')}
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${filters.type === 'all' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                    >
                      All Stories
                    </button>
                    <button
                      onClick={() => handleFilterChange('type', 'success')}
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${filters.type === 'success' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-opacity-80 dark:hover:bg-opacity-80'}`}
                    >
                      Success Stories
                    </button>
                    <button
                      onClick={() => handleFilterChange('type', 'challenge')}
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${filters.type === 'challenge' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-opacity-80 dark:hover:bg-opacity-80'}`}
                    >
                      Challenges
                    </button>
                    <button
                      onClick={() => handleFilterChange('type', 'journey')}
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${filters.type === 'journey' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-opacity-80 dark:hover:bg-opacity-80'}`}
                    >
                      Journeys
                    </button>
                    <button
                      onClick={() => handleFilterChange('type', 'advice')}
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${filters.type === 'advice' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-opacity-80 dark:hover:bg-opacity-80'}`}
                    >
                      Advice
                    </button>
                  </div>

                  <div className="relative rounded-md shadow-sm max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                      placeholder="Search stories"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stories List */}
            {filteredStories.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No stories found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredStories.map((story) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStoryTypeColor(story.type)}`}
                        >
                          {story.type.charAt(0).toUpperCase() + story.type.slice(1)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(story.publishedDate)} • {story.readTime} min read
                        </span>
                      </div>
                      <Link to={`/stories/${story.id}`} className="block mt-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                          {story.title}
                        </h3>
                      </Link>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{story.excerpt}</p>

                      {story.media && story.media.length > 0 && (
                        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                          {story.media.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-40 h-24 rounded-md overflow-hidden">
                              <img
                                src={item.url}
                                alt={item.caption || `Media ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap gap-2">
                        {story.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${filters.tag === tag ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                          >
                            <TagIcon className="-ml-0.5 mr-1.5 h-3 w-3" aria-hidden="true" />
                            {tag}
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={story.author.avatar || `https://ui-avatars.com/api/?name=${story.author.name}`}
                              alt={story.author.name}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {story.author.name}
                            </p>
                            <div className="flex text-sm text-gray-500 dark:text-gray-400">
                              <span>{story.author.currentPosition}</span>
                              <span className="mx-1">•</span>
                              <span>{story.author.company}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="inline-flex items-center">
                            <HeartIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                            {story.likes}
                          </span>
                          <span className="inline-flex items-center">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                            {story.comments}
                          </span>
                          <span className="inline-flex items-center">
                            <BookOpenIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                            {story.views}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {story.author.university} • {story.author.department} • Class of{' '}
                          {story.author.graduationYear}
                        </div>
                        <Link
                          to={`/stories/${story.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 dark:text-primary-400 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          Read more
                          <ChevronRightIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 lg:col-span-4">
            <div className="sticky top-4 space-y-6">
              {/* About Career Stories */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">About Career Stories</h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Career Stories is a platform for alumni to share their professional journeys, challenges,
                    successes, and advice with current students and recent graduates. Learn from those who
                    have walked the path before you.
                  </p>
                  {user && (
                    <div className="mt-6">
                      <Link
                        to="/stories/share"
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Share Your Story
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Popular Tags</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {popularTags.map(({ tag, count }) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${filters.tag === tag ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                      >
                        <TagIcon className="-ml-0.5 mr-1.5 h-3 w-3" aria-hidden="true" />
                        {tag}
                        <span className="ml-1 text-gray-500 dark:text-gray-400">({count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter by University */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filter by University</h2>
                  <div className="mt-4 space-y-2">
                    {[
                      'All Universities',
                      'University of Ghana',
                      'Kwame Nkrumah University of Science and Technology',
                      'University of Cape Coast',
                      'Ashesi University',
                    ].map((university) => (
                      <button
                        key={university}
                        onClick={() =>
                          handleFilterChange(
                            'university',
                            university === 'All Universities' ? '' : university
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${university === 'All Universities' && !filters.university || filters.university === university ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        <div className="flex items-center">
                          <AcademicCapIcon className="mr-2 h-5 w-5" />
                          {university}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter by Department */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filter by Department</h2>
                  <div className="mt-4 space-y-2">
                    {[
                      'All Departments',
                      'Computer Science',
                      'Banking and Finance',
                      'Agricultural Engineering',
                      'Medicine',
                      'English',
                    ].map((department) => (
                      <button
                        key={department}
                        onClick={() =>
                          handleFilterChange(
                            'department',
                            department === 'All Departments' ? '' : department
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${department === 'All Departments' && !filters.department || filters.department === department ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        <div className="flex items-center">
                          <BookOpenIcon className="mr-2 h-5 w-5" />
                          {department}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Share Your Story CTA */}
              {user && (
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 shadow rounded-lg overflow-hidden">
                  <div className="p-6 text-center">
                    <h2 className="text-lg font-medium text-white">Share Your Career Journey</h2>
                    <p className="mt-2 text-sm text-primary-100">
                      Your experience could inspire and guide fellow students and alumni. Share your story
                      today!
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/stories/share"
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                      >
                        <ShareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Share Your Story
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* How Career Stories Work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
      >
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            How Career Stories Work
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Learn from alumni experiences and share your own journey
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Read Stories
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                Explore career journeys from alumni across different universities, departments, and
                industries. Filter by tags, story types, or search for specific topics to find relevant
                experiences.
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Engage & Connect
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                Like stories that resonate with you, leave comments to ask questions or share your thoughts,
                and connect with alumni who have career paths that interest you for mentorship
                opportunities.
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <ShareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Share Your Story
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                As an alumnus, you can share your own career journey, challenges you've overcome, successes
                you've achieved, or advice for current students. Your story could be the guidance someone
                else needs.
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Build Community
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                Career Stories helps build a supportive community where knowledge and experiences are shared
                across universities, departments, and graduation years, creating a valuable resource for all
                Ghanaian students and alumni.
              </dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerStories;