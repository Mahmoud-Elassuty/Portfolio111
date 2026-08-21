import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import FilterBar from "./FilterBar.jsx";
import ProjectCard from "./ProjectCard.jsx";

export default function ProjectExplorer() {
  const technologies = useMemo(() => {
    const unique = new Set();
    projects.forEach((project) => project.technologies.forEach((tech) => unique.add(tech)));
    return ["All", ...Array.from(unique)];
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.technologies.includes(activeFilter));
  }, [activeFilter]);

  const selectedProject = projects.find((project) => project.id === selectedId) ?? null;

  return (
    <div className="rl-explorer">
      <div className="rl-explorer-header">
        <span className="rl-count">
          Projects: <strong>{filteredProjects.length}</strong>
        </span>
        <FilterBar technologies={technologies} activeFilter={activeFilter} onSelect={setActiveFilter} />
      </div>

      <div className="rl-grid">
        {filteredProjects.length === 0 ? (
          <p className="rl-empty">No projects match this filter yet.</p>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isSelected={project.id === selectedId}
              onSelect={() => setSelectedId(project.id)}
            />
          ))
        )}
      </div>

      {selectedProject && (
        <div className="rl-detail" aria-live="polite">
          <p className="rl-detail-label">Selected Project</p>
          <h4>{selectedProject.title}</h4>
          <p>{selectedProject.description}</p>
          <div className="rl-detail-links">
            {selectedProject.live && (
              <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            )}
            {selectedProject.github && (
              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
