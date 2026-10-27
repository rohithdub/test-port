import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import type { Project } from '../data/projects';

export function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className={`project-detail accent-${project.accent}`} role="dialog" aria-modal="true" aria-labelledby="project-detail-title"
            initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.985 }} transition={{ duration: 0.32 }}>
            <header className="detail-header">
              <button className="icon-button" type="button" onClick={onClose} aria-label="Close project details"><ArrowLeft size={17} /></button>
              <span className="micro-label">PROJECT FILE / {project.number}</span>
              <button className="icon-button detail-close" type="button" onClick={onClose} aria-label="Close"><X size={17} /></button>
            </header>
            <div className="detail-hero">
              <span className="detail-category"><span className="stage-dot" />{project.category} · {project.stage}</span>
              <h2 id="project-detail-title">{project.name}<span>.</span></h2>
              <p className="detail-tagline">{project.tagline}</p>
            </div>
            <div className="detail-body">
              <div>
                <span className="micro-label">THE IDEA</span>
                <p className="detail-description">{project.description}</p>
                <div className="detail-note"><span className="micro-label">BUILD NOTE</span><p>{project.note}</p></div>
              </div>
              <div className="detail-side">
                <span className="micro-label">TECH / EXPLORATION</span>
                <div className="detail-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <span className="micro-label detail-focus-label">FOCUS AREAS</span>
                <ul>{project.focus.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="detail-actions">
                  {project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noreferrer" className="primary-link">Open prototype <ExternalLink size={14} /></a> : <span className="link-placeholder">Prototype link not configured</span>}
                  {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noreferrer" className="secondary-link"><Github size={14} /> Source <ArrowUpRight size={13} /></a> : null}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
