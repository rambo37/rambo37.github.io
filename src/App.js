import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ins from "./assets/projects/INS-CW.png";
import sdv from "./assets/projects/SDV-CW.png";
import pda from "./assets/projects/PDA-Simulator.png";
import bat from "./assets/projects/CodingBat.png";
import { ReactComponent as Java } from "./assets/icons/skills/java.svg";
import { ReactComponent as Scala } from "./assets/icons/skills/scala.svg";
import { ReactComponent as Node } from "./assets/icons/skills/node.svg";
import { ReactComponent as MongoDB } from "./assets/icons/skills/mongoDB.svg";
import { ReactComponent as MySQL } from "./assets/icons/skills/mySQL.svg";
import { ReactComponent as HTML5 } from "./assets/icons/skills/html5.svg";
import { ReactComponent as CSS3 } from "./assets/icons/skills/css3.svg";
import { ReactComponent as JavaScript } from "./assets/icons/skills/javaScript.svg";
import { ReactComponent as TypeScript } from "./assets/icons/skills/typeScript.svg";
import { ReactComponent as React } from "./assets/icons/skills/react.svg";
import { ReactComponent as JQuery } from "./assets/icons/skills/jQuery.svg";
import { ReactComponent as AWS } from "./assets/icons/skills/aws.svg";
import { ReactComponent as Git } from "./assets/icons/skills/git.svg";
import { ReactComponent as GitHub } from "./assets/icons/contact-links/gitHub.svg";
import { ReactComponent as LinkedIn } from "./assets/icons/contact-links/linkedIn.svg";
import { ReactComponent as Email } from "./assets/icons/contact-links/email.svg";
import { ReactComponent as Phone } from "./assets/icons/contact-links/phone.svg";

const projects = [
  {
    title: "PDA-Simulator",
    url: "https://rambo37.github.io/PDA-Simulator-Web/",
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

  // These heights refer to the window height for mobile devices with the
  // address bar hidden in portrait and landscape modes, respectively. They are
  // needed to ensure the IntersectionObservers work properly on Firefox mobile
  let portraitHeight;
  let landscapeHeight;

  // The options for the intersection observer objects. The rootMargin property
  // is set later, once the navHeight is known (after the initial render)
  const options = {
    threshold: [0],
  };

  useEffect(() => {
    // Compute the address bar height on initial render
    const addressBarHeight = window.outerHeight - window.innerHeight;
    // Call handleWindowResize after the initial render to initialise the
    // observers and the contact section's height
    handleWindowResize();

    // Firefox on mobile requires special treatment to ensure the nav bar
    // updates correctly on scroll - the resize listener attached to the
    // window object does not work properly on Firefox mobile
    if (isFirefoxMobile()) {
      window.screen.orientation.addEventListener("change", () => {
        // A small delay is needed so the window innerHeight updates before
        // this code executes
        setTimeout(() => {
          // If either height is not yet set, attempt to set them before
          // updating the IntersectionObservers with handleWindowResize
          if (!landscapeHeight || !portraitHeight) setHeights(addressBarHeight);
          handleWindowResize();
        }, 50);
      });
    } else {
      window.addEventListener("resize", () => {
        handleWindowResize();
      });
    }
  }, []);

  function setHeights(addressBarHeight) {
    // If the address bar is hidden, make sure to deduct its size from
    // the window.innerHeight
    const addressBarHidden = window.outerHeight === window.innerHeight;
    if (isInLandscapeMode()) {
      landscapeHeight = addressBarHidden
        ? window.innerHeight - addressBarHeight
        : window.innerHeight;
    } else {
      portraitHeight = addressBarHidden
        ? window.innerHeight - addressBarHeight
        : window.innerHeight;
    }
  }

  function isInLandscapeMode() {
    return window.innerWidth > window.innerHeight;
  }

  function setContactSectionHeight(navHeight) {
    const height = "calc(100vh - " + navHeight + "px)";
    document.getElementById("contact").style.height = height;
  }

  function setOptionsRootMargin(navHeight) {
    let height = window.innerHeight;
    // We need to use the height when the address bar is visible if on Firefox
    // mobile for the observers to work (even when the address bar is hidden)
    if (isFirefoxMobile()) {
      if (isInLandscapeMode() && landscapeHeight) height = landscapeHeight;
      if (!isInLandscapeMode() && portraitHeight) height = portraitHeight;
    }
    // the margin ensures we only consider intersections that occur just
    // underneath the nav bar
    options.rootMargin =
      -navHeight + "px 0px " + -(height - navHeight - 1) + "px 0px";
  }

  function getNavHeight() {
    return document.getElementById("nav").getBoundingClientRect().height;
  }

  function isFirefoxMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      userAgent.indexOf("mobile") !== -1 && userAgent.indexOf("firefox") !== -1
    );
  }

  function handleWindowResize() {
    // Need to get the navHeight again as the nav may have resized as a
    // result of the window resizing
    const navHeight = getNavHeight();

    // Recalculate the correct size for the contact section as the nav may
    // have been resized
    setContactSectionHeight(navHeight);

    // Need to reset the observers to work with the new window height on
    // window resize
    disableObservers();
    setOptionsRootMargin(navHeight);
    initialiseObservers(options);
  }

  // Stop the previous observers from firing
  function disableObservers() {
    if (aboutObserver) aboutObserver.disconnect();
    if (projectsObserver) projectsObserver.disconnect();
    if (contactObserver) contactObserver.disconnect();
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
    if (entries[0].isIntersecting) {
      resetNav();
      setAboutClass("active");
    }
  };

  const projectsCallback = (entries) => {
    if (entries[0].isIntersecting) {
      resetNav();
      setProjectsClass("active");
      setContactLinksTransition("move-down");
    }
  };

  const contactCallback = (entries) => {
    if (entries[0].isIntersecting) {
      resetNav();
      setContactClass("active");
      setContactLinksTransition("move-up");
    }
  };

  function scrollToSection(e) {
    e.preventDefault();
    const sectionName = e.target.hash.substring(1);
    const currentURL = window.location.href;
    const currentHashPortion = currentURL.substring(
      currentURL.indexOf("#") + 1
    );
    if (currentHashPortion !== sectionName) {
      window.history.pushState({}, null, e.target.hash);
    }

    const section = document.getElementById(sectionName);
    const navHeight = getNavHeight();

    // This small delay is needed to prevent an issue with the scroll on Chrome
    // for mobile devices in landscape mode with the address bar visible
    setTimeout(() => {
      window.scrollTo({
        top: Math.ceil(
          section.getBoundingClientRect().top + window.pageYOffset - navHeight
        ),
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
              <GitHub />
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
              <LinkedIn />
              LinkedIn
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
              <Email />
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
              <Phone />
              Phone
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default App;
