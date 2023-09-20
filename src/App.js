import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ins from "./assets/projects/INS-CW.png";
import sdv from "./assets/projects/SDV-CW.png";
import pda from "./assets/projects/PDA-Simulator.png";
import bat from "./assets/projects/CodingBat.png";
import { ReactComponent as Java } from "./assets/icons/java.svg";
import { ReactComponent as Scala } from "./assets/icons/scala.svg";
import { ReactComponent as Node } from "./assets/icons/node.svg";
import { ReactComponent as MongoDB } from "./assets/icons/mongoDB.svg";
import { ReactComponent as MySQL } from "./assets/icons/mySQL.svg";
import { ReactComponent as HTML5 } from "./assets/icons/html5.svg";
import { ReactComponent as CSS3 } from "./assets/icons/css3.svg";
import { ReactComponent as JavaScript } from "./assets/icons/javaScript.svg";
import { ReactComponent as TypeScript } from "./assets/icons/typeScript.svg";
import { ReactComponent as React } from "./assets/icons/react.svg";
import { ReactComponent as JQuery } from "./assets/icons/jQuery.svg";
import { ReactComponent as AWS } from "./assets/icons/aws.svg";
import { ReactComponent as Git } from "./assets/icons/git.svg";

const projects = [
  {
    title: "PDA-Simulator",
    url: "https://github.com/rambo37/PDA-Simulator",
    image: pda,
    altText: "Screenshot of the PDA-Simulator project.",
  },
  {
    title: "INS-CW",
    url: "https://rambo37.github.io/INS-CW/",
    image: ins,
    altText: "Screenshot of the INS-CW project.",
  },
  {
    title: "SDV-CW",
    url: "https://rambo37.github.io/SDV-CW/",
    image: sdv,
    altText: "Screenshot of the SDV-CW project.",
  },
  {
    title: "CodingBat-Solutions",
    url: "https://github.com/rambo37/CodingBat-Solutions",
    image: bat,
    altText: "Screenshot of the CodingBat website.",
  },
];

const skills = [
  {
    name: "Java",
    icon: <Java />,
  },
  {
    name: "Scala",
    icon: <Scala />,
  },
  {
    name: "Node",
    icon: <Node />,
  },
  {
    name: "MongoDB",
    icon: <MongoDB />,
  },
  {
    name: "MySQL",
    icon: <MySQL />,
  },
  {
    name: "HTML5",
    icon: <HTML5 />,
  },
  {
    name: "CSS3",
    icon: <CSS3 />,
  },
  {
    name: "JavaScript",
    icon: <JavaScript />,
  },
  {
    name: "TypeScript",
    icon: <TypeScript />,
  },
  {
    name: "React",
    icon: <React />,
  },
  {
    name: "jQuery",
    icon: <JQuery />,
  },
  {
    name: "AWS",
    icon: <AWS />,
  },
  {
    name: "Git",
    icon: <Git />,
  },
];

function App() {
  const [aboutClass, setAboutClass] = useState("");
  const [projectsClass, setProjectsClass] = useState("");
  const [contactClass, setContactClass] = useState("");
  const [contactLinksTransition, setContactLinksTransition] = useState("");

  // IntersectionObservers, one for each section
  let aboutObserver;
  let projectsObserver;
  let contactObserver;

  useEffect(() => {
    const navHeight = document
      .getElementById("nav")
      .getBoundingClientRect().height;

    // lvh so that the largest possible viewport height on mobile is used
    // in the calculation. This is necessary since the address bar on mobile
    // browsers appears/disappears sometimes upon scrolling
    const height = "calc(100lvh - " + navHeight + "px)";
    document.getElementById("contact").style.height = height;

    // the margin ensures we only consider intersections that occur just
    // underneath the nav bar
    const options = {
      threshold: [0],
      rootMargin:
        -navHeight +
        "px 0px " +
        -(window.innerHeight - navHeight - 1) +
        "px 0px",
    };
    initialiseObservers(options);

    window.addEventListener("resize", () => {
      // Need to get the navHeight again as the nav may have resized as a
      // result of the window resizing
      const navHeight = document
        .getElementById("nav")
        .getBoundingClientRect().height;

      // Recalculate the correct size for the contact section as the nav may
      // have been resized
      const height = "calc(100lvh - " + navHeight + "px)";
      document.getElementById("contact").style.height = height;

      // Need to reset the observers to work with the new window height on
      // window resize
      options.rootMargin =
        -navHeight +
        "px 0px " +
        -(window.innerHeight - navHeight - 1) +
        "px 0px";
      disableObservers();
      initialiseObservers(options);
    });
  }, []);

  // Stop the previous observers from firing
  function disableObservers() {
    aboutObserver.unobserve(document.getElementById("about"));
    projectsObserver.unobserve(document.getElementById("projects"));
    contactObserver.unobserve(document.getElementById("contact"));
  }

  function initialiseObservers(options) {
    aboutObserver = new IntersectionObserver(aboutCallback, options);
    projectsObserver = new IntersectionObserver(projectsCallback, options);
    contactObserver = new IntersectionObserver(contactCallback, options);
    aboutObserver.observe(document.getElementById("about"));
    projectsObserver.observe(document.getElementById("projects"));
    contactObserver.observe(document.getElementById("contact"));
  }

  function resetNav() {
    setAboutClass("");
    setProjectsClass("");
    setContactClass("");
  }

  const aboutCallback = (entries) => {
    console.log("about intersecting: ", entries[0].isIntersecting);
    if (entries[0].isIntersecting) {
      resetNav();
      setAboutClass("active");
    }
  };

  const projectsCallback = (entries) => {
    console.log("project intersecting: ", entries[0].isIntersecting);
    if (entries[0].isIntersecting) {
      resetNav();
      setProjectsClass("active");
      setContactLinksTransition("move-down");
    }
  };

  const contactCallback = (entries) => {
    console.log("contact intersecting: ", entries[0].isIntersecting);
    if (entries[0].isIntersecting) {
      resetNav();
      setContactClass("active");
      setContactLinksTransition("move-up");
    }
  };

  function scrollToSection(e) {
    e.preventDefault();
    const sectionName = e.target.hash.substring(1);
    window.history.pushState({}, null, e.target.hash);

    const section = document.getElementById(sectionName);
    const navHeight = document
      .getElementById("nav")
      .getBoundingClientRect().height;

    // This small delay is needed to prevent an issue with the scroll on Chrome
    // for mobile devices in landscape mode with the address bar visible
    setTimeout(() => {
      window.scrollTo({
        top: Math.ceil(section.getBoundingClientRect().top + window.pageYOffset - navHeight),
        behavior: "smooth",
      });
    }, 100);
  }

  return (
    <>
      <nav id="nav">
        <ul>
          <li>
            <a
              href="#about"
              className={aboutClass}
              onClick={(e) => scrollToSection(e)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={projectsClass}
              onClick={(e) => scrollToSection(e)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={contactClass}
              onClick={(e) => scrollToSection(e)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <section id="about" className="about-section">
        <div className="about-section-left-side">
          <h1 id="about-section-heading">
            Hey,
            <br /> I'm Savraj
          </h1>
          <p>Welcome to my portfolio.</p>
          <p>
            I am a <span>full-stack engineer</span> based in Uxbridge, West
            London.
          </p>
          <br />
          <p>
            Other than coding, I also enjoy gaming, lifting weights, and
            football (playing but not watching!).
          </p>
        </div>
        <div className="about-section-right-side">
          <h3>Skills and experience</h3>
          <p>
            Here are the programming languages, libraries and other technologies
            I am currently comfortable working with. As a recent graduate, I
            know that I have much to learn, and as such, this list will continue
            to evolve.
          </p>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div className="skill-icon" key={`skill-icon${index}`}>
                {skill.icon}
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div
        style={{ height: "1px", width: "100%", backgroundColor: "#183166" }}
      ></div>
      <section id="projects" className="projects-section">
        <h1>Here are some of my projects</h1>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={`project${index}`}
              title={project.title}
              url={project.url}
              img={project.image}
              altText={project.altText}
            />
          ))}
        </div>
        <a
          href="https://github.com/rambo37?tab=repositories"
          id="see-more-button"
        >
          See more
        </a>
      </section>
      <div
        style={{ height: "1px", width: "100%", backgroundColor: "#535353" }}
      ></div>
      <section id="contact" className="contact-section">
        <h3 id="contact-section-heading">Get in touch</h3>
        <ul>
          <li>
            <a
              href="https://github.com/rambo37"
              className={contactLinksTransition}
              style={{
                transitionDelay:
                  contactLinksTransition === "move-up" ? "0ms" : "750ms",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/savraj-bassi/"
              className={contactLinksTransition}
              style={{
                transitionDelay:
                  contactLinksTransition === "move-up" ? "250ms" : "500ms",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
              Linkedin
            </a>
          </li>
          <li>
            <a
              href="mailto:savrajbassi@gmail.com"
              className={contactLinksTransition}
              style={{
                transitionDelay:
                  contactLinksTransition === "move-up" ? "500ms" : "250ms",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
              Email
            </a>
          </li>
          <li>
            <a
              href="tel:+447436841015"
              className={contactLinksTransition}
              style={{
                transitionDelay:
                  contactLinksTransition === "move-up" ? "700ms" : "0ms",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-telephone"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              Phone
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default App;
