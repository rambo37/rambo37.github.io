import './projectCard.css';

function ProjectCard(props) {
  return (
    <a
      href={props.url}
      className={`project-card ${props.show ? 'show' : 'hidden'}`}
      style={{ transitionDelay: `0ms, ${props.index * 200}ms` }}
    >
      <div className='title-div'>
        <h2>{props.title}</h2>
      </div>
      <div style={{ padding: '20px' }}>
        <img src={props.img} alt={props.altText} />
      </div>
    </a>
  );
}

export default ProjectCard;
