import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JobCard, { Job } from './JobCard';

const mockJob: Job = {
  id: '1',
  title: 'Frontend Developer',
  company: 'Tech Ghana',
  location: 'Accra',
  type: 'Full-time',
  description: 'A great job opportunity',
  postedAt: new Date(),
};

describe('JobCard', () => {
  it('renders the job title', () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} />
      </MemoryRouter>
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });
});
