"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import {
  certificateAssets,
  contactLinks,
  education,
  languages,
  profilePhotos,
  portfolioProfile,
  portfolioSections,
  portfolioSkills,
  workExperiences
} from "@/lib/portfolio-data";
import { usePortfolioStore } from "@/lib/usePortfolioStore";
import { ProjectPanel } from "@/components/ui/ProjectPanel";

function SkillsContent() {
  return (
    <div className="skill-cloud">
      {portfolioSkills.map((skill) => (
        <span key={skill}>{skill}</span>
      ))}
    </div>
  );
}

function AboutContent() {
  return (
    <div className="panel-stack">
      <div className="profile-photo-grid" aria-label="Profile photos">
        {profilePhotos.map((photo) => (
          <figure className="profile-photo-card" key={photo.label}>
            <Image
              alt={photo.label}
              className="profile-photo-image"
              fill
              priority={photo.label === "Formal profile photo"}
              sizes="(max-width: 760px) 42vw, 130px"
              src={photo.src}
            />
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
      <p>{portfolioProfile.intro}</p>
      <div className="profile-strip">
        <span>{portfolioProfile.role}</span>
        <span>
          <MapPin size={14} />
          {portfolioProfile.location}
        </span>
      </div>
      <div className="education-list">
        {education.map((item) => (
          <article key={`${item.title}-${item.period}`}>
            <small>{item.period}</small>
            <strong>{item.title}</strong>
            <span>{item.school}</span>
          </article>
        ))}
      </div>
      <div className="language-row">
        {languages.map((language) => (
          <span key={language}>{language}</span>
        ))}
      </div>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="panel-stack">
      <div className="experience-grid">
        {workExperiences.map((item, index) => (
          <article className="experience-row" key={`${item.company}-${item.role}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{item.role}</strong>
              <small>
                {item.company} / {item.period}
              </small>
              <p>{item.summary}</p>
              <div className="tech-stack">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="certificate-gallery" aria-label="Certificate gallery">
        {certificateAssets.map((certificate, index) => (
          <article className="certificate-card-small" key={`${certificate.title}-${certificate.label}-${index}`}>
            <div className="certificate-thumb">
              <Image
                alt={`${certificate.title} ${certificate.label}`}
                className="certificate-image"
                fill
                sizes="(max-width: 760px) 45vw, 176px"
                src={certificate.src}
              />
            </div>
            <div>
              <small>{certificate.issuer}</small>
              <strong>{certificate.title}</strong>
              <span>{certificate.label}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="contact-panel-links">
      {contactLinks.map((link) => (
        <a href={link.href} key={link.label}>
          <span>
            <small>{link.label}</small>
            {link.value}
          </span>
          {link.label === "Email" ? <Mail size={18} /> : <ArrowUpRight size={18} />}
        </a>
      ))}
    </div>
  );
}

function PanelBody() {
  const activeSection = usePortfolioStore((state) => state.activeSection);

  if (activeSection === "about") {
    return <AboutContent />;
  }

  if (activeSection === "skills") {
    return <SkillsContent />;
  }

  if (activeSection === "projects") {
    return <ProjectPanel />;
  }

  if (activeSection === "experience") {
    return <ExperienceContent />;
  }

  if (activeSection === "contact") {
    return <ContactContent />;
  }

  return null;
}

export function ContentPanel() {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const isPanelOpen = usePortfolioStore((state) => state.isPanelOpen);
  const isTransitioning = usePortfolioStore((state) => state.isTransitioning);
  const section = portfolioSections[activeSection];

  return (
    <AnimatePresence>
      {isPanelOpen ? (
        <motion.aside
          aria-label={`${section.eyebrow} panel`}
          className="content-panel"
          key={activeSection}
          initial={{ opacity: 0, x: 36, filter: "blur(8px)" }}
          animate={{
            opacity: isTransitioning ? 0.72 : 1,
            x: 0,
            filter: "blur(0px)"
          }}
          exit={{ opacity: 0, x: 28, filter: "blur(8px)" }}
          transition={{ duration: 0.34, ease: "easeOut" }}
        >
          <span className="panel-eyebrow">{section.eyebrow}</span>
          <h2>{section.title}</h2>
          <p className="panel-description">{section.description}</p>
          <PanelBody />
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
