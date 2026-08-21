export default function ProjectCard({ project, isSelected, onSelect }) {
  return (
    <div className={`rl-card${isSelected ? " rl-card--active" : ""}`}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="rl-badges">
        {project.technologies.map((tech) => (
          <span key={tech} className="rl-badge">
            {tech}
          </span>
        ))}
      </div>

      <button type="button" className="rl-view-btn" onClick={onSelect} aria-pressed={isSelected}>
        {isSelected ? "Selected" : "View Details"}
      </button>
    </div>
  );
}
