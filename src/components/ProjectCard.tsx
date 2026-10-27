import { ArrowUpRight, ChevronRight, Layers3 } from 'lucide-react';
import { motion } from 'motion/react';
import type { Project } from '../data/projects';

export function ProjectCard({ project, onOpen, compact = false }: { project: Project; onOpen: (id: string) => void; compact?: boolean }) {
  return (
    <motion.button type="button" className={`project-card accent-${project.accent}${compact ? ' project-card-compact' : ''}`}
      onClick={() => onOpen(project.id)} whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }}>
      <span className="project-card-topline">
        <span className="project-number">{project.number} / 05</span>
        <span className="project-stage"><span className="stage-dot" />{project.stage}</span>
      </span>
      <span className="project-card-symbol" aria-hidden="true"><Layers3 size={24} strokeWidth={1.4} /></span>
      <span className="project-card-copy">
        <span className="project-card-title">{project.name}<ArrowUpRight size={16} /></span>
        <span className="project-card-tagline">{project.tagline}</span>
      </span>
      <span className="project-card-bottom">
        <span>{project.category}</span><span className="card-open">Explore <ChevronRight size={14} /></span>
      </span>
    </motion.button>
  );
}
