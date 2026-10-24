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
    id: 'soundmesh',
    name: 'SoundMesh',
    tagline: 'Turns nearby phones into one synchronized speaker',
    category: 'Local-First Synchronized Audio',
    year: '2026',
    status: 'Shipped',
    description:
      'SoundMesh is a Flutter-first, local-first mobile app that turns nearby phones into one synchronized speaker. Built for the Shipathon 2026 hackathon in collaboration with [Faraz](https://farazkh.dev/). Flutter handles the UI, navigation, high-level state, and orchestration, while Native Android drives timing-critical audio, networking, and scheduling via a typed Pigeon bridge. Subsystems are governed by strict Core, Room, Device, Audio, Playback, and Sync API contracts.',
    architecture: [
      'Flutter shell orchestrating UI, navigation, and high-level room state',
      'Native Android engine managing timing-critical audio playback, networking, and scheduling',
      'Typed Pigeon bridge with formal Core, Room, Device, Audio, Playback, and Sync contracts'
    ],
    features: [
      'Turns multiple nearby phones into a unified synchronized speaker cluster',
      '100% local-first WiFi transmission with no external internet or cloud server needed',
      'Sub-millisecond sync time clock and low-latency audio packet processing',
      'Typed subsystem contracts enforcing modular room and playback architecture'
    ],
    stack: [
      'Flutter',
      'Dart',
      'Native Android',
      'Core Engine',
      'Audio Packet Processing',
      'WiFi Transmission',
      'Sync Time Clock'
    ],
    githubUrl: 'https://github.com/farazkayan/SoundMesh'
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
    liveUrl: 'https://tawt.pages.dev'
  },
  {
    id: 'shelf',
    name: 'Shelf',
    tagline: 'Room-based note sharing for classmates',
    category: 'Collaborative Study Platform',
    year: '2026',
    status: 'Shipped',
    description:
      'A room-based note upload and access place for classmates or study mates. Built with a Backblaze B2 server-based storage infrastructure rather than P2P, providing fast and reliable note sharing, organized study rooms, and frictionless student access.',
    architecture: [
      'Flutter & Dart client application with reactive room-based navigation',
      'Backblaze B2 server-based cloud storage for dependable document and note hosting',
      'Supabase backend with PostgreSQL database and Google Authentication'
    ],
    features: [
      'Room-based note upload and access for classmates and study mates',
      'B2 server-based cloud storage infrastructure',
      'Google Authentication integration for student accounts',
      'Dedicated room workspaces organized by syllabus and subject'
    ],
    stack: ['Dart', 'Flutter', 'Supabase', 'Google Auth', 'PostgreSQL', 'Backblaze B2'],
    githubUrl: 'https://github.com/Mahinite/shelf'
  }
];

export const LORE_CHAPTERS: LoreItem[] = [];

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
  'Flutter',
  'Dart',
  'Native Android',
  'AI agents',
  'React',
  'Audio Packet Processing',
  'DaVinci Resolve',
  'Product Design',
  'TypeScript',
  'Tailwind CSS',
  'Sync Time Clock',
  'WiFi Transmission',
  'Autonomous Agents',
  'System Architecture',
  'Motion Design'
];
