import { ProjectItem, LoreItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Arifeen Siddiquei Mahin',
  shortName: 'Mahin',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  utcOffset: 'UTC+6',
  email: 'arifeenmahin2008@gmail.com',
  github: 'https://github.com/Mahinite',
  githubHandle: 'Mahinite',
  bioPrefix: 'I am a student living in Dhaka, Bangladesh. I build ',
  bioHighlight1: 'software products',
  bioMiddle: ' with ',
  bioHighlight2: 'AI agents',
  bioSuffix: ' to fill gaps I actually run into.',
  tags: ['Student', 'AI Enthusiast'],
  skills: ['AI agents', 'Python', 'React', 'Dart', 'Flutter', 'DaVinci Resolve', 'Product Design'],
  currentFocus: 'Building this portfolio site.',
  currentFocusDetails: 'Crafting pixel-level design fidelity, reactive Dhaka time widget, and interactive 3D holographic shaders.',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'fikro',
    name: 'Fikro',
    tagline: 'Idea capture and retrieval',
    category: 'AI Knowledge Architecture',
    year: '2025 - Present',
    status: 'Active Development',
    description:
      'A low-friction thought and voice capture system that uses autonomous AI agents to categorize, link, and semantically query spontaneous ideas before they evaporate.',
    architecture: [
      'Local-first SQLite storage with vector embeddings via pgvector / sqlite-vec',
      'Multi-agent background pipeline for automatic tag extraction and knowledge graphs',
      'Cross-platform Flutter companion for instant home screen lockup capture'
    ],
    features: [
      'Instant voice memo transcription and context categorization',
      'Bidirectional memory synthesis across weeks of unorganized notes',
      'Semantic natural-language query engine ("What was my idea about study group scheduling?")',
      'Zero-latency offline-first synchronization'
    ],
    stack: ['Python', 'FastAPI', 'Flutter', 'Dart', 'AI Agents', 'ChromaDB'],
    githubUrl: 'https://github.com/Mahinite/fikro',
    liveUrl: 'https://fikro.app'
  },
  {
    id: 'tawt',
    name: 'TAWT',
    tagline: 'Task-Aware Work Timer',
    category: 'Productivity & Focus Tool',
    year: '2025',
    status: 'Shipped',
    description:
      'A minimalist, intelligent desktop timer designed specifically for student builders. TAWT dynamically adapts focus intervals based on cognitive task weight rather than rigid 25-minute Pomodoro intervals.',
    architecture: [
      'Lightweight React + Vite shell bundled into desktop executable',
      'Heuristic cognitive load estimator matching task complexity',
      'Local persistence with automatic weekly focus telemetry'
    ],
    features: [
      'Context-aware time budgeting tailored to deep programming vs light reading',
      'Distraction-free floating status indicator with ambient audio cues',
      'Zero account requirement; completely local privacy-first execution',
      'Exportable JSON summaries for weekly study retrospectives'
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    githubUrl: 'https://github.com/Mahinite/tawt',
    liveUrl: 'https://tawt-timer.web.app'
  },
  {
    id: 'shelf',
    name: 'Shelf',
    tagline: 'Note sharing for classmates',
    category: 'Peer Collaboration Platform',
    year: '2024 - 2025',
    status: 'Shipped',
    description:
      'A high-speed collaborative notes and resources repository built for peers and classmates in Dhaka. Allows instant sharing of handwritten annotations, lecture slides, and AI-summarized past paper solutions.',
    architecture: [
      'React frontend with instant full-text client indexing',
      'Document processing pipeline converting camera snaps into legible clean PDFs',
      'Anonymous voting and peer verification system for textbook solutions'
    ],
    features: [
      'Course-by-course syllabi organization matching national curricula',
      'Instant PDF search with optical character recognition highlights',
      'Classmate bookmarking and batch offline download support',
      'Clean markdown note rendering with KaTeX formula support'
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'Firebase'],
    githubUrl: 'https://github.com/Mahinite/shelf',
    liveUrl: 'https://shelf-notes.vercel.app'
  }
];

export const LORE_CHAPTERS: LoreItem[] = [
  {
    id: 'minecraft',
    badge: 'play',
    title: 'Minecraft with the cousins',
    subtitle: 'A favorite memory goes here.',
    date: 'Summer Nights · 2021 - Present',
    story:
      'Every summer holiday and late Friday night, all the cousins would gather on Discord and launch a fresh survival server. We would build massive underwater domes, Nether highway networks, and automated iron farms while trading banter till 4 AM. Those chaotic multiplayer sessions were where I first fell in love with complex logic systems, redstone circuitry, and collaborative community building.',
    highlights: [
      'Endless survival worlds where we built entire virtual mountain villages',
      'Redstone contraptions that sparked my early curiosity in Boolean logic',
      'Midnight voice calls filled with monsoon thunderstorm sounds in the background'
    ]
  },
  {
    id: 'codm',
    badge: 'play',
    title: 'Competitive Call of Duty Mobile',
    subtitle: 'Team, tournaments, best moment.',
    date: 'Championship Era · 2022 - 2024',
    story:
      'Grinding rank with a close-knit squad taught me how to communicate under extreme split-second pressure. Playing the entry-fragger and sniper role in regional community scrims required laser discipline, map knowledge, and predictive game sense. The high point was clutching a 1v4 Search & Destroy match with seconds remaining on the bomb defuse.',
    highlights: [
      'Legendary tier consecutive seasons as squad shot-caller',
      'Practicing tactical coordination, smoke execution, and retake strategies',
      'Taught me high-pressure decision making and rapid adaptation under fire'
    ]
  },
  {
    id: 'yuki',
    badge: 'life',
    title: 'Yuki, my cat',
    subtitle: 'Yuki means snow in Japanese.',
    date: 'Family Member · Dhaka',
    story:
      'Yuki is our pure white, endlessly curious cat named after "snow" in Japanese. She loves sitting directly on my mechanical keyboard right as a critical build finishes, or curling up beside the monitor while I debug code into the evening. She is officially my most demanding rubber-duck debugging companion.',
    highlights: [
      'Loves naps on warm laptop chargers and sunny window sills',
      'Has attended countless late-night coding sessions as silent moral support',
      'Unmatched curiosity about moving code cursors and laser pointers'
    ]
  },
  {
    id: 'ai-agents',
    badge: 'build',
    title: 'Building with AI agents',
    subtitle: 'Shelf, TAWT, Fikro.',
    date: 'The Modern Chapter · 2024 - Present',
    story:
      'What began as simple prompt tinkering evolved into architecting full-blown agentic workflows. When building Shelf, TAWT, and Fikro, I realized that modern AI tooling allows a single determined high-school/college builder in Dhaka to construct systems that previously required entire software engineering departments. The future belongs to those who combine genuine empathy for user problems with autonomous execution.',
    highlights: [
      'Moving from simple chat interfaces to autonomous tool-calling pipelines',
      'Building custom tools to solve friction points in my own daily student routine',
      'Continuously exploring prompt engineering, vector search, and multimodal agent UX'
    ]
  }
];

export const ASCII_PORTRAIT = `              .::::::.              
          .:-==++++==--:.          
        .-+*#%%@@%%#*+-.        
       :=+*#%@@@@@@@@%#*+=:       
      :-+*#%@@@@@@@@@@%#*+-:      
      :=+#%@@@@@@@@@@@@%#+=:      
      :-+*#%@@@@@@@@@@%#*+-:      
       :=+*##%@@@@@@%##*+=:       
        .:-=+*%%%%*+=-:.        
          ..:-+*##*+=-:..          
             .::--::.             
           ::--+****+--::          
        .:-=+*#%@@@@%#*+=-:.       
      .:-=+*#%@@@@@@@@%#*+=-:.     `;

export const TECH_MARQUEE_ITEMS = [
  'AI agents',
  'Python',
  'React',
  'Dart',
  'Flutter',
  'DaVinci Resolve',
  'Product Design',
  'TypeScript',
  'Tailwind CSS',
  'FastAPI',
  'Autonomous Agents',
  'Vector Search',
  'System Architecture',
  'Motion Design'
];
