"use client";

import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import donatDankauImage from "@/assets/donatdankau.jpeg";
import { portfolioProjects } from "@/lib/portfolio-data";

const bankBjbProjectIds = new Set([
  "referral-branch-code",
  "esamsat-payment-code",
  "bi-rtgs",
  "tandamata-rencana",
  "other-savings-webview",
  "t-samsat",
  "qris-indomaret"
]);

export function ProjectPanel() {
  return (
    <div className="project-panel-grid">
      {portfolioProjects.map((project, index) => {
        const isBankBjbProject = bankBjbProjectIds.has(project.id);
        const isDonatDankauProject = project.id === "donat-dankau-pos";
        const hasLiveUrl = project.liveUrl !== "#";
        const hasGithubUrl = project.githubUrl !== "#";

        return (
          <article className="project-card" key={project.id}>
            <div className="project-card-copy">
              {isDonatDankauProject ? (
                <figure className="project-evidence">
                  <a
                    aria-label="Open the full Donat Dankau POS dashboard screenshot"
                    className="project-evidence-link"
                    href={donatDankauImage.src}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt="Donat Dankau POS dashboard showing the daily summary and outlet performance"
                      className="project-evidence-image"
                      fill
                      priority
                      sizes="(max-width: 760px) calc(100vw - 62px), 346px"
                      src={donatDankauImage}
                    />
                  </a>
                  <figcaption>Donat Dankau POS dashboard</figcaption>
                </figure>
              ) : null}
              <div className="project-card-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>/ {project.period}</small>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {isBankBjbProject ? (
                <p className="project-confidentiality-note">
                  Project visuals cannot be displayed because they contain company credentials and confidential
                  information.
                </p>
              ) : null}
              <ul className="project-responsibilities" aria-label={`${project.title} responsibilities`}>
                {project.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
              <div className="tech-stack">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              {hasLiveUrl || hasGithubUrl ? (
                <div className="project-actions">
                  {hasLiveUrl ? (
                    <a href={project.liveUrl} aria-label={`${project.title} live demo`}>
                      <ExternalLink size={16} />
                      Live demo
                    </a>
                  ) : null}
                  {hasGithubUrl ? (
                    <a href={project.githubUrl} aria-label={`${project.title} GitHub repository`}>
                      <Code2 size={16} />
                      GitHub
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
