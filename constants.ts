// Fix: Populating file with mock data.
// Fix: Added Resource to the import to be used in MOCK_RESOURCES.
import { Event, EventStatus, Publication, GalleryAlbum, TeamMember, Achievement, Resource } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Annual Research Symposium 2024',
    date: 'October 26, 2024',
    location: 'CMC Auditorium',
    description: 'Present your research, learn from experts, and network with peers. Keynote by Dr. Jane Doe.',
    imageUrl: 'https://picsum.photos/400/250?random=1',
    status: EventStatus.Upcoming,
  },
  {
    id: 2,
    title: 'Workshop on Statistical Analysis using SPSS',
    date: 'November 15, 2024',
    location: 'Computer Lab, CMC',
    description: 'A hands-on workshop for beginners to learn statistical analysis for medical research.',
    imageUrl: 'https://picsum.photos/400/250?random=2',
    status: EventStatus.Upcoming,
  },
  {
    id: 3,
    title: 'Seminar on "The Future of AI in Medicine"',
    date: 'September 5, 2024',
    location: 'Online via Zoom',
    description: 'Explore the cutting-edge applications of artificial intelligence in diagnostics and treatment.',
    imageUrl: 'https://picsum.photos/400/250?random=3',
    status: EventStatus.Past,
  },
  {
    id: 4,
    title: 'Journal Club Meeting - Cardiology',
    date: 'August 20, 2024',
    location: 'Library, CMC',
    description: 'Discussion on the latest groundbreaking research papers in the field of cardiology.',
    imageUrl: 'https://picsum.photos/400/250?random=4',
    status: EventStatus.Past,
  },
];

export const MOCK_PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: 'Prevalence of Diabetes in Urban Bangladesh: A Cross-Sectional Study',
    authors: ['Dr. A. Khan', 'Dr. B. Chowdhury', 'Dr. C. Islam'],
    journal: 'Bangladesh Journal of Medical Science',
    year: 2023,
    link: '#',
    imageUrl: 'https://picsum.photos/300/400?random=5',
  },
  {
    id: 2,
    title: 'Impact of Air Pollution on Respiratory Health in Chittagong',
    authors: ['Dr. D. Rahman', 'Dr. E. Haque'],
    journal: 'International Journal of Environmental Health Research',
    year: 2023,
    link: '#',
    imageUrl: 'https://picsum.photos/300/400?random=6',
  },
  {
    id: 3,
    title: 'A Randomized Controlled Trial of a New Antihypertensive Drug',
    authors: ['Dr. F. Ahmed', 'Dr. G. Uddin', 'Dr. H. Ali'],
    journal: 'The Lancet',
    year: 2022,
    link: '#',
    imageUrl: 'https://picsum.photos/300/400?random=7',
  },
    {
    id: 4,
    title: 'Genetic Markers for Thalassemia in the Bangladeshi Population',
    authors: ['Dr. I. Begum', 'Dr. J. Karim'],
    journal: 'Journal of Human Genetics',
    year: 2022,
    link: '#',
    imageUrl: 'https://picsum.photos/300/400?random=8',
  },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: '1st Prize in National Research Symposium',
    description: 'Our team presented groundbreaking work on diabetic retinopathy, securing the top prize against 50 other institutions.',
    imageUrl: 'https://picsum.photos/500/300?random=25',
    date: 'March 2024',
  },
  {
    id: 2,
    title: 'International Publication Grant Awarded',
    description: 'Received a prestigious grant to support the publication of our research on cardiovascular health in a high-impact international journal.',
    imageUrl: 'https://picsum.photos/500/300?random=26',
    date: 'January 2024',
  },
  {
    id: 3,
    title: 'Best Poster at Biomed Conference',
    description: 'Awarded for an innovative poster presentation on the applications of AI in early disease detection.',
    imageUrl: 'https://picsum.photos/500/300?random=27',
    date: 'November 2023',
  },
    {
    id: 4,
    title: 'Community Health Initiative Recognition',
    description: 'Our club was recognized by the Ministry of Health for our extensive work in raising health awareness in rural communities.',
    imageUrl: 'https://picsum.photos/500/300?random=28',
    date: 'October 2023',
  },
];


export const MOCK_GALLERY_ALBUMS: GalleryAlbum[] = [
    {
        id: 1,
        title: 'Annual Symposium 2023',
        coverImageUrl: 'https://picsum.photos/500/500?random=9',
        images: [
            { id: 1, imageUrl: 'https://picsum.photos/800/600?random=30', caption: 'Opening ceremony with the chief guest.' },
            { id: 2, imageUrl: 'https://picsum.photos/800/600?random=31', caption: 'Keynote speech on modern research techniques.' },
            { id: 3, imageUrl: 'https://picsum.photos/800/600?random=32' },
            { id: 4, imageUrl: 'https://picsum.photos/800/600?random=33', caption: 'Networking session with faculty and students.' },
        ]
    }
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Fatima Ahmed',
    role: 'Faculty Advisor',
    imageUrl: 'https://picsum.photos/200/200?random=15',
    category: 'Core Team',
  },
  {
    id: 2,
    name: 'Rahim Khan',
    role: 'President',
    imageUrl: 'https://picsum.photos/200/200?random=16',
    category: 'Core Team',
  },
  {
    id: 3,
    name: 'Ayesha Siddika',
    role: 'Vice President',
    imageUrl: 'https://picsum.photos/200/200?random=17',
    category: 'Core Team',
  },
  {
    id: 4,
    name: 'Jamal Uddin',
    role: 'General Secretary',
    imageUrl: 'https://picsum.photos/200/200?random=18',
    category: 'Core Team',
  },
  {
    id: 5,
    name: 'Sadia Islam',
    role: 'Head of Communications',
    imageUrl: 'https://picsum.photos/200/200?random=19',
    category: 'Visibility Team',
  },
  {
    id: 6,
    name: 'Fahim Hasan',
    role: 'Event Coordinator',
    imageUrl: 'https://picsum.photos/200/200?random=20',
    category: 'Visibility Team',
  },
  {
    id: 7,
    name: 'Nadia Chowdhury',
    role: 'Outreach Officer',
    imageUrl: 'https://picsum.photos/200/200?random=21',
    category: 'Visibility Team',
  },
  {
    id: 8,
    name: 'Imran Ali',
    role: 'Social Media Manager',
    imageUrl: 'https://picsum.photos/200/200?random=22',
    category: 'Social Media Team',
  },
  {
    id: 9,
    name: 'Zoya Rahman',
    role: 'Content Creator',
    imageUrl: 'https://picsum.photos/200/200?random=23',
    category: 'Social Media Team',
  },
  {
    id: 10,
    name: 'Minhaz Ahmed',
    role: 'Graphic Designer',
    imageUrl: 'https://picsum.photos/200/200?random=24',
    category: 'Social Media Team',
  },
];

// Fix: Added MOCK_RESOURCES to fix import error in ResourcesPage.tsx.
export const MOCK_RESOURCES: Resource[] = [
  {
    id: 1,
    title: 'Research Proposal Template',
    description: 'A comprehensive template to help structure your research proposals effectively.',
    link: '#',
    type: 'Download',
  },
  {
    id: 2,
    title: 'PubMed Central',
    description: 'A free full-text archive of biomedical and life sciences journal literature.',
    link: '#',
    type: 'External Link',
  },
  {
    id: 3,
    title: 'Guide to Statistical Analysis',
    description: 'An introductory guide to common statistical methods used in medical research.',
    link: '#',
    type: 'Download',
  },
  {
    id: 4,
    title: 'ClinicalTrials.gov',
    description: 'A database of privately and publicly funded clinical studies conducted around the world.',
    link: '#',
    type: 'External Link',
  },
];