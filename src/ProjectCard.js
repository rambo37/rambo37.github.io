import "./projectCard.css";

function ProjectCard(props) {
  return (
    <a href={props.url} className="project-card">
      <div className="title-div">
        <h2>{props.title}</h2>
      </div>
      <div style={{ padding: "20px" }}>
        <img src={props.img} alt={props.altText} />
      </div>
    </a>
  );
}

export default ProjectCard;
