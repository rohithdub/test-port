import { Search, SlidersHorizontal } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { categories, type Project, type ProjectCategoryFilter } from '../data/projects';

type Props = {
  projects: Project[];
  query: string;
  setQuery: (value: string) => void;
  category: ProjectCategoryFilter;
  setCategory: (value: ProjectCategoryFilter) => void;
  onOpen: (id: string) => void;
};

export function ProjectLibrary({ projects, query, setQuery, category, setCategory, onOpen }: Props) {
  return (
    <section className="library-view">
      <div className="section-heading">
        <div><span className="micro-label">FIELD NOTES / 01—05</span><h1>Project <span>archive.</span></h1></div>
        <div className="count-chip">{projects.length.toString().padStart(2, '0')} PROJECTS INDEXED</div>
      </div>
      <p className="section-intro">Ideas, prototypes and ongoing experiments. Each entry is labelled by its current stage—not by how impressive it sounds.</p>
      <div className="library-tools">
        <label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, tools, ideas…" aria-label="Search projects" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label>
        <span className="filter-label"><SlidersHorizontal size={14} /> FILTER</span>
        <div className="filter-pills" role="group" aria-label="Filter projects by category">
          {categories.map((item) => <button key={item} type="button" className={category === item ? 'filter-pill active' : 'filter-pill'} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      {projects.length ? <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpen} />)}</div> : <div className="empty-state"><Search size={22} /><strong>No matching projects.</strong><span>Try another term or clear the category filter.</span><button type="button" onClick={() => { setQuery(''); setCategory('All'); }}>Reset search</button></div>}
    </section>
  );
}
