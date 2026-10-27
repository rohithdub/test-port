import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity, ArrowRight, ArrowUpRight, Braces, Check, Command, Compass, Cpu,
  Github, GraduationCap, Layers3, MapPin, Orbit, PanelsTopLeft, Send, Sparkles, X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { DestinationCoreBadge, PrismCore, type CoreDestination } from './components/PrismCore';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { ProjectLibrary } from './components/ProjectLibrary';
import { projects, type ProjectCategoryFilter } from './data/projects';
import { site, skills } from './data/site';

const navItems: Array<{ id: CoreDestination; label: string; number: string; icon: LucideIcon }> = [
  { id: 'overview', label: 'Overview', number: '01', icon: Compass },
  { id: 'projects', label: 'Projects', number: '02', icon: Layers3 },
  { id: 'skills', label: 'Toolkit', number: '03', icon: Cpu },
  { id: 'trajectory', label: 'Trajectory', number: '04', icon: Activity },
  { id: 'contact', label: 'Contact', number: '05', icon: Send }
];

function routeFromHash(): { view: CoreDestination; projectId: string | null } {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [first, second] = raw.split('/');
  const valid = navItems.some((item) => item.id === first);
  return {
    view: (valid ? first : 'overview') as CoreDestination,
    projectId: first === 'projects' && second ? second : null
  };
}

function SectionKicker({ children }: { children: ReactNode }) {
  return <span className="micro-label"><span className="kicker-mark" />{children}</span>;
}

function TopBar({ onNavigate }: { onNavigate: (view: CoreDestination) => void }) {
  return (
    <header className="topbar">
      <a className="brand-lockup" href="#/overview" onClick={(event) => { event.preventDefault(); onNavigate('overview'); }} aria-label="VYRON by RK home">
        <span className="brand-symbol" aria-hidden="true"><svg viewBox="0 0 42 42"><path d="M21 4 27 14 24 29 21 35 18 29 15 14Z"/><path d="M21 4V35" className="brand-seam"/><path d="M9 14 16 8 30 11 35 21 30 31 21 37 11 30 6 21 8 17" className="brand-orbit"/></svg></span>
        <span className="brand-name">VYRON<span> / by RK</span></span>
      </a>
      <div className="topbar-center"><span className="system-pulse" />PERSONAL SYSTEM <span className="topbar-divider">/</span> BUILD 0.1</div>
      <div className="topbar-actions">
        <span className="system-status"><span />SYSTEM ONLINE</span>
        <a className="source-link" href={site.githubRepo} target="_blank" rel="noreferrer">SOURCE <ArrowUpRight size={13} /></a>
      </div>
    </header>
  );
}

function NavRail({ current, onNavigate }: { current: CoreDestination; onNavigate: (view: CoreDestination) => void }) {
  return (
    <aside className="nav-rail" aria-label="Primary navigation">
      <div className="rail-top-label">NAV<br />/ 05</div>
      <nav className="rail-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return <button type="button" key={item.id} className={`rail-item${current === item.id ? ' is-active' : ''}`} onClick={() => onNavigate(item.id)} aria-label={`${item.number} ${item.label}`} aria-current={current === item.id ? 'page' : undefined}>
            <Icon size={18} strokeWidth={1.65} /><span className="rail-item-label">{item.label}</span><span className="rail-item-number">{item.number}</span>
          </button>;
        })}
      </nav>
      <div className="rail-bottom"><span className="rail-ring" /><span>RK<br />2026</span></div>
    </aside>
  );
}

function CoreStage({ view, onNavigate }: { view: CoreDestination; onNavigate: (view: CoreDestination) => void }) {
  return (
    <section className="core-stage" aria-label="VYRON spatial core">
      <div className="stage-topline"><SectionKicker>SPATIAL INTERFACE / {navItems.find((item) => item.id === view)?.number}</SectionKicker><span className="stage-coordinate">X: 00.63 <i /> Y: 01.08</span></div>
      <div className="core-scene">
        <div className="scene-sweep" aria-hidden="true" /><div className="scene-grid" aria-hidden="true" />
        <div className="scene-label scene-label-top"><span className="scene-label-line" />PRISM WEAVE <span className="label-index">/ 01</span></div>
        <div className="scene-label scene-label-right">SIGNATURE FORM <span className="scene-label-dot" /></div>
        <div className="scene-orbit-caption"><span className="caption-line" />THREE PATHWAYS · ONE SYSTEM</div>
        <div className="core-glow" aria-hidden="true" />
        <div className="core-canvas-wrap"><PrismCore destination={view} /></div>
        <div className="core-axis axis-x" aria-hidden="true" /><div className="core-axis axis-y" aria-hidden="true" />
        <div className="scene-footer-left"><span className="mini-square" />LIVE CORE <span className="muted-dot">/</span> {view.toUpperCase()}</div>
        <div className="scene-footer-right">ROTATION <span className="scene-status">ON</span></div>
        <div className="node-callouts" aria-label="Choose a destination">
          <button type="button" className={view === 'projects' ? 'node-callout active' : 'node-callout'} onClick={() => onNavigate('projects')}><span className="callout-node" /><span>PROJECTS</span><small>02</small></button>
          <button type="button" className={view === 'skills' ? 'node-callout active' : 'node-callout'} onClick={() => onNavigate('skills')}><span className="callout-node" /><span>TOOLKIT</span><small>03</small></button>
          <button type="button" className={view === 'trajectory' ? 'node-callout active' : 'node-callout'} onClick={() => onNavigate('trajectory')}><span className="callout-node" /><span>TRAJECTORY</span><small>04</small></button>
        </div>
      </div>
      <div className="stage-bottomline"><span>FORM / 001</span><span className="bottomline-center"><span /> INTERACTIVE STRUCTURE</span><span>WEBGL + SVG FALLBACK</span></div>
    </section>
  );
}

function OverviewView({ onNavigate, onOpenProject }: { onNavigate: (view: CoreDestination) => void; onOpenProject: (id: string) => void }) {
  const featured = projects.slice(0, 3);
  return (
    <div className="view-stack">
      <section className="hero-copy">
        <div><SectionKicker>ENGINEERING / EXPERIMENT / EVOLVE</SectionKicker><h1>Systems with<br /><span>a point of view.</span></h1></div>
        <div className="hero-aside"><p>{site.statement}</p><button className="text-action" type="button" onClick={() => onNavigate('projects')}>Explore the work <ArrowRight size={15} /></button></div>
      </section>
      <CoreStage view="overview" onNavigate={onNavigate} />
      <section className="featured-projects">
        <div className="subsection-heading"><div><SectionKicker>SELECTED TRANSMISSIONS</SectionKicker><h2>Work in <span>progress.</span></h2></div><button className="text-action" type="button" onClick={() => onNavigate('projects')}>All projects <ArrowRight size={15} /></button></div>
        <div className="featured-grid">{featured.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpenProject} compact />)}</div>
      </section>
    </div>
  );
}

function SkillsView() {
  return (
    <section className="inner-view skills-view">
      <div className="section-heading"><div><SectionKicker>CAPABILITIES / CURRENT TOOLKIT</SectionKicker><h1>What I work <span>with.</span></h1></div><DestinationCoreBadge destination="skills" status="LEARNING IN PUBLIC" /></div>
      <p className="section-intro">A working toolkit, not a claim of mastery. The list evolves as I build, test and learn.</p>
      <div className="skills-list">{skills.map((group, index) => <motion.section className="skill-group" key={group.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.35 }}>
        <div className="skill-group-index">0{index + 1}</div><div className="skill-group-info"><h2>{group.name}</h2><p>{group.items.length} areas in rotation</p></div><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
      </motion.section>)}</div>
      <div className="note-strip"><Sparkles size={17} /><p><strong>Current direction</strong><br />Interactive interfaces, local AI agents, and engineering projects that solve a specific human problem.</p></div>
    </section>
  );
}

function TrajectoryView() {
  const items = [
    { time: 'CURRENT', title: 'Second-year ECE', kind: 'FOUNDATION', body: 'Building engineering fundamentals while expanding practical experience through coding, interface work and technical experiments.' },
    { time: '2026', title: 'Skill Bridge · Smart Education', kind: 'HACKATHON PROJECT', body: 'Explored voice-first access, regional-language navigation and personalized learning pathways for a more inclusive education experience.' },
    { time: 'ONGOING', title: 'Local AI agent systems', kind: 'EXPERIMENT', body: 'Exploring a local-first agent team with a lead agent, focused specialists, shared notes and a dashboard for task progress.' },
    { time: 'NEXT', title: 'VYRON from the ground up', kind: 'PERSONAL BUILD', body: 'Turning this portfolio into a distinct digital environment, built in phases with a reliable design system and testable interactions.' }
  ];
  return (
    <section className="inner-view trajectory-view">
      <div className="section-heading"><div><SectionKicker>LOGBOOK / VERSION HISTORY</SectionKicker><h1>The work is the <span>trajectory.</span></h1></div><DestinationCoreBadge destination="trajectory" status="ACTIVE DEVELOPMENT" /></div>
      <p className="section-intro">A timeline of learning, experiments and direction. Milestones are intentionally descriptive rather than inflated.</p>
      <div className="timeline">{items.map((item, index) => <motion.article className="timeline-item" key={item.title} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 }}>
        <div className="timeline-marker"><span /></div><div className="timeline-time">{item.time}</div><div className="timeline-copy"><span className="micro-label">{item.kind}</span><h2>{item.title}</h2><p>{item.body}</p></div><span className="timeline-index">0{index + 1}</span>
      </motion.article>)}</div>
    </section>
  );
}

function ContactView() {
  const hasEmail = Boolean(site.email.trim());
  const hasLinkedin = Boolean(site.linkedin.trim());
  return (
    <section className="inner-view contact-view">
      <div className="section-heading"><div><SectionKicker>OPEN CHANNEL / 05</SectionKicker><h1>Make something <span>matter.</span></h1></div><DestinationCoreBadge destination="contact" status="CONNECTION REQUEST" /></div>
      <p className="contact-lede">I’m interested in thoughtful engineering, creative interfaces, practical AI and collaborating with people who like making things real.</p>
      <div className="contact-panel">
        <div className="contact-panel-head"><div className="contact-symbol"><Send size={25} strokeWidth={1.4} /></div><div><span className="micro-label">TRANSMISSION READY</span><h2>Let’s connect.</h2></div></div>
        <div className="contact-channel-list">
          <a href={site.githubRepo} target="_blank" rel="noreferrer" className="contact-channel"><span className="contact-channel-icon"><Github size={18} /></span><span><strong>GitHub / portfolio repository</strong><small>Source and project development</small></span><ArrowUpRight size={16} /></a>
          {hasLinkedin ? <a href={site.linkedin} target="_blank" rel="noreferrer" className="contact-channel"><span className="contact-channel-icon"><PanelsTopLeft size={18} /></span><span><strong>LinkedIn</strong><small>Professional profile</small></span><ArrowUpRight size={16} /></a> : <div className="contact-channel unavailable"><span className="contact-channel-icon"><PanelsTopLeft size={18} /></span><span><strong>LinkedIn</strong><small>Add the verified profile URL to site.ts</small></span><span className="channel-state">NOT SET</span></div>}
          {hasEmail ? <a href={`mailto:${site.email}`} className="contact-channel"><span className="contact-channel-icon"><Send size={18} /></span><span><strong>Email</strong><small>{site.email}</small></span><ArrowUpRight size={16} /></a> : <div className="contact-channel unavailable"><span className="contact-channel-icon"><Send size={18} /></span><span><strong>Email</strong><small>Add a verified email address to site.ts</small></span><span className="channel-state">NOT SET</span></div>}
        </div>
      </div>
      <p className="contact-footnote"><Check size={14} /> No placeholder contact links. Public channels will only be enabled after they are verified.</p>
    </section>
  );
}

function ContextPanel({ view, onNavigate }: { view: CoreDestination; onNavigate: (view: CoreDestination) => void }) {
  const title: Record<CoreDestination, string> = {
    overview: 'System identity', projects: 'Project intelligence', skills: 'Capability map', trajectory: 'Build log', contact: 'Open channels'
  };
  const index = navItems.find((item) => item.id === view)?.number ?? '01';
  return (
    <aside className="context-panel">
      <div className="context-header"><SectionKicker>CONTEXT / {index}</SectionKicker><span className="context-mini-icon"><Command size={15} /></span></div>
      <h2>{title[view]}<span>.</span></h2>
      {view === 'overview' && <>
        <div className="identity-card"><div className="identity-avatar">RK<span /></div><div><strong>{site.owner}</strong><span>{site.role}</span></div><span className="identity-status">ACTIVE</span></div>
        <div className="context-facts"><div><GraduationCap size={16} /><span><small>EDUCATION</small><strong>{site.institution}</strong></span></div><div><MapPin size={16} /><span><small>BASE</small><strong>{site.location}</strong></span></div><div><Braces size={16} /><span><small>FOCUS</small><strong>Web · AI · Interactive systems</strong></span></div></div>
        <div className="context-divider" /><span className="micro-label">CURRENTLY BUILDING</span><div className="current-build"><span className="current-build-icon"><Orbit size={17} /></span><div><strong>VYRON rebuild</strong><small>Modular source · Phase 01</small></div><span className="build-live-dot" /></div>
        <div className="context-bottom-note"><span>FIELD NOTE / 001</span><p>A portfolio should make the work clearer—not make the work sound bigger than it is.</p></div>
      </>}
      {view === 'projects' && <>
        <div className="context-stat"><strong>05</strong><span>PROJECTS IN THE INDEX</span></div><div className="context-stat-row"><div><strong>01</strong><small>Prototype</small></div><div><strong>01</strong><small>In development</small></div><div><strong>03</strong><small>Concepts</small></div></div>
        <div className="context-divider" /><span className="micro-label">INDEX RULE</span><p className="context-paragraph">Each project has an explicit stage. A concept isn't labelled as deployed software, and metrics are only added when they can be verified.</p><button className="context-action" type="button" onClick={() => onNavigate('trajectory')}>Read the build log <ArrowRight size={14} /></button>
      </>}
      {view === 'skills' && <>
        <div className="context-stat"><strong>04</strong><span>TOOLKIT GROUPS</span></div><div className="context-divider" /><span className="micro-label">WORKING PRINCIPLE</span><p className="context-paragraph">Learn by building. Use a new framework because it solves a real problem, not because it is trending.</p><div className="context-quote">“Understand the system. Then shape the experience.”</div>
      </>}
      {view === 'trajectory' && <>
        <div className="context-stat"><strong>∞</strong><span>ROOM TO ITERATE</span></div><div className="context-divider" /><span className="micro-label">LOGBOOK RULE</span><p className="context-paragraph">Progress is recorded as a sequence of experiments, decisions and improvements—not a list of inflated titles.</p><div className="mini-system-list"><span><i />Learn</span><span><i />Build</span><span><i />Test</span><span><i />Refine</span></div>
      </>}
      {view === 'contact' && <>
        <div className="context-stat"><strong>01</strong><span>VERIFIED PUBLIC REPOSITORY</span></div><a href={site.githubRepo} target="_blank" rel="noreferrer" className="context-repo-link"><Github size={16} /><span><strong>Portfolio source</strong><small>github.com / rohithdub</small></span><ArrowUpRight size={14} /></a><div className="context-divider" /><p className="context-paragraph">Contact details are intentionally left unset until verified URLs and an email address are supplied.</p>
      </>}
      <div className="context-bottom"><span>VYRON / RK</span><span>BUILD 0.1.0</span></div>
    </aside>
  );
}

export default function App() {
  const initialRoute = useMemo(() => typeof window !== 'undefined' ? routeFromHash() : { view: 'overview' as CoreDestination, projectId: null }, []);
  const [view, setView] = useState<CoreDestination>(initialRoute.view);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialRoute.projectId);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategoryFilter>('All');
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;
  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatches = category === 'All' || project.category === category;
      const textMatches = !normalized || [project.name, project.tagline, project.description, project.category, project.stage, ...project.stack].join(' ').toLowerCase().includes(normalized);
      return categoryMatches && textMatches;
    });
  }, [query, category]);

  const navigate = useCallback((next: CoreDestination) => {
    setView(next);
    setSelectedProjectId(null);
    window.history.pushState({ view: next }, '', `#/${next}`);
  }, []);

  const openProject = useCallback((id: string) => {
    setView('projects');
    setSelectedProjectId(id);
    window.history.pushState({ view: 'projects', projectId: id }, '', `#/projects/${id}`);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProjectId(null);
    window.history.replaceState({ view: 'projects' }, '', '#/projects');
  }, []);

  useEffect(() => {
    const syncRoute = () => {
      const route = routeFromHash();
      setView(route.view);
      setSelectedProjectId(route.projectId);
    };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    if (!window.location.hash) window.history.replaceState({ view: 'overview' }, '', '#/overview');
    return () => { window.removeEventListener('popstate', syncRoute); window.removeEventListener('hashchange', syncRoute); };
  }, []);

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches('input, textarea, select, [contenteditable="true"]');
      if (event.key === 'Escape') {
        if (selectedProjectId) closeProject();
        else setShowKeyboardHelp(false);
      }
      if (!typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const numeric = Number(event.key);
        if (numeric >= 1 && numeric <= 5) navigate(navItems[numeric - 1].id);
        if (event.key === '?' ) setShowKeyboardHelp((value) => !value);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [navigate, closeProject, selectedProjectId]);

  return (
    <div className="app-shell">
      <TopBar onNavigate={navigate} />
      <div className="app-grid">
        <NavRail current={view} onNavigate={navigate} />
        <main className="main-workspace" id="main-content">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={view} className="view-transition" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.26, ease: [0.19, 1, 0.22, 1] }}>
              {view === 'overview' && <OverviewView onNavigate={navigate} onOpenProject={openProject} />}
              {view === 'projects' && <ProjectLibrary projects={filteredProjects} query={query} setQuery={setQuery} category={category} setCategory={setCategory} onOpen={openProject} />}
              {view === 'skills' && <SkillsView />}
              {view === 'trajectory' && <TrajectoryView />}
              {view === 'contact' && <ContactView />}
            </motion.div>
          </AnimatePresence>
          <footer className="page-footer"><span>© 2026 {site.owner.toUpperCase()}</span><span className="footer-center"><span /> MADE OF CURIOSITY, ENGINEERED WITH INTENT</span><button type="button" onClick={() => setShowKeyboardHelp(true)}><Command size={13} /> SHORTCUTS <kbd>?</kbd></button></footer>
        </main>
        <ContextPanel view={view} onNavigate={navigate} />
      </div>
      <ProjectDetail project={selectedProject} onClose={closeProject} />
      <AnimatePresence>
        {showKeyboardHelp && <motion.div className="keyboard-help-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setShowKeyboardHelp(false); }}>
          <motion.section className="keyboard-help" role="dialog" aria-modal="true" aria-labelledby="shortcut-title" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
            <div className="keyboard-help-head"><span className="micro-label">CONTROL SCHEME</span><button className="icon-button" onClick={() => setShowKeyboardHelp(false)} aria-label="Close shortcuts" type="button"><X size={16} /></button></div>
            <h2 id="shortcut-title">Keyboard <span>shortcuts.</span></h2>
            {navItems.map((item, index) => <div className="shortcut-row" key={item.id}><span>{item.label}</span><kbd>{index + 1}</kbd></div>)}
            <div className="shortcut-row"><span>Close project / dialog</span><kbd>ESC</kbd></div><div className="shortcut-row"><span>Toggle shortcuts</span><kbd>?</kbd></div>
          </motion.section>
        </motion.div>}
      </AnimatePresence>
      <div className="ambient-grain" aria-hidden="true" />
    </div>
  );
}
