export type ProjectStage = 'Prototype' | 'In development' | 'Concept';

export type Project = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  category: 'AI & Agents' | 'Civic Tech' | 'Education' | 'Sustainability' | 'Wellbeing';
  stage: ProjectStage;
  accent: 'teal' | 'blue' | 'amber' | 'violet';
  stack: string[];
  focus: string[];
  demoUrl?: string;
  repoUrl?: string;
  note: string;
};

/**
 * Keep this file as the single source of truth for project copy.
 * Before publishing, verify each stage, stack and link against the actual project.
 */
export const projects: Project[] = [
  {
    id: 'skill-bridge', number: '01', name: 'Skill Bridge',
    tagline: 'A more accessible path from learning to opportunity.',
    description: 'An AI-assisted education concept focused on voice-first access, regional-language navigation, personalized skill pathways and links to relevant public benefits. The prototype explores how digital services can feel more approachable to first-time users.',
    category: 'Education', stage: 'Prototype', accent: 'teal',
    stack: ['React Native', 'Next.js', 'Node.js', 'Python', 'Firebase', 'MongoDB'],
    focus: ['Voice-first interaction', 'Regional language access', 'Personalized pathways'],
    demoUrl: 'https://rohithdub.github.io/skill-bridge-demo/',
    note: 'A prototype / hackathon project. Confirm which listed technologies are actually implemented in the current demo before presenting them as shipped features.'
  },
  {
    id: 'disasterhelp', number: '02', name: 'DisasterHelp',
    tagline: 'Community response coordination when minutes matter.',
    description: 'A community emergency-response concept exploring SOS reporting, location sharing, requests for assistance and clearer coordination between people who need help and nearby responders.',
    category: 'Civic Tech', stage: 'Concept', accent: 'blue',
    stack: ['React', 'Maps / location APIs', 'Firebase'],
    focus: ['SOS flow', 'Location-aware coordination', 'Clear incident status'],
    note: 'Keep as a concept until the implementation, safety model and live integrations are verified. Do not represent it as an operational emergency service.'
  },
  {
    id: 'ecotrack', number: '03', name: 'EcoTrack',
    tagline: 'Make everyday environmental impact easier to understand.',
    description: 'A carbon-footprint experience designed to help people explore the estimated impact of everyday choices and understand where small changes may matter most.',
    category: 'Sustainability', stage: 'Concept', accent: 'amber',
    stack: ['Web UI', 'Calculation model', 'Data visualization'],
    focus: ['Footprint estimation', 'Actionable feedback', 'Progress over time'],
    note: 'Any emissions values should show their source, assumptions and calculation limits before public release.'
  },
  {
    id: 'mindease', number: '04', name: 'MindEase',
    tagline: 'A calmer space for reflection and everyday wellbeing.',
    description: 'A wellbeing companion concept exploring reflective journaling, supportive prompts and simple self-guided routines, with clear boundaries around what an AI tool can and cannot provide.',
    category: 'Wellbeing', stage: 'Concept', accent: 'violet',
    stack: ['React', 'AI integration point', 'Private data design'],
    focus: ['Reflection prompts', 'Privacy-first thinking', 'Responsible AI boundaries'],
    note: 'This is not a clinical or crisis-response service. Any future release needs privacy, safety and escalation design.'
  },
  {
    id: 'rk-agent-team', number: '05', name: 'RK Agent Team',
    tagline: 'A local-first team of focused AI agents.',
    description: 'An experiment in coordinating a lead agent and specialist agents for planning, building, reviewing and tracking tasks, with local model execution as a priority and a lightweight dashboard for visibility.',
    category: 'AI & Agents', stage: 'In development', accent: 'teal',
    stack: ['LM Studio', 'Local LLMs', 'TypeScript / JavaScript', 'Web dashboard'],
    focus: ['Sequential agent hand-offs', 'Shared notes and tasks', 'Local execution'],
    note: 'The current direction prioritizes free local execution. Agent reliability, timeouts and persistent storage remain implementation concerns to test.'
  }
];

export const categories = ['All', 'AI & Agents', 'Civic Tech', 'Education', 'Sustainability', 'Wellbeing'] as const;
export type ProjectCategoryFilter = typeof categories[number];
