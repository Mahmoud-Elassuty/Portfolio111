export default function FilterBar({ technologies, activeFilter, onSelect }) {
  return (
    <div className="rl-filters" role="group" aria-label="Filter projects by technology">
      {technologies.map((tech) => (
        <button
          key={tech}
          type="button"
          className={`rl-filter-btn${tech === activeFilter ? " active" : ""}`}
          aria-pressed={tech === activeFilter}
          onClick={() => onSelect(tech)}
        >
          {tech}
        </button>
      ))}
    </div>
  );
}
