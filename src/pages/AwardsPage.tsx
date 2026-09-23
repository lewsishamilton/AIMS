import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Award,
  Layers,
  Briefcase,
  Sparkles,
  Quote,
  CheckCircle2,
  Flag,
  Medal,
  Microscope,
  Trophy,
  Flame,
  Activity,
} from "lucide-react";
import "./AwardsPage.css";
import {
  institutionInfo,
  departments,
  facultyAchievements,
  nariShaktiPuraskar,
  nationalAwards,
  studentAchievements,
  academicToppers,
  sportsAccolades,
  wings,
  type Department,
  type DeptAchievement,
} from "../data/awardsData";

/** "in all the headings make every first letter of every word to capital and rest to small" */
function toTitleCase(str: string) {
  if (!str) return str;
  return str.toLowerCase().replace(/(?:^|\s|-|\/)\S/g, (char) => char.toUpperCase());
}

function ImagePlaceholder({
  title = "AIMS Achievement",
  subtitle = "Institutional Recognition",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="institutional-image-placeholder" aria-label="Achievement Visual Placeholder">
      <div className="placeholder-inner-frame">
        <div className="placeholder-icon-wrap">
          <Award size={36} className="placeholder-crest" />
        </div>
        <span className="placeholder-inst-title">ARUNDATHI INSTITUTE OF MEDICAL SCIENCES</span>
        <div className="placeholder-accent-line"></div>
        <p className="placeholder-category-text">{title}</p>
        <span className="placeholder-sub-note">{subtitle}</span>
      </div>
    </div>
  );
}

/** The site's kicker: a small uppercase label flanked by rules, used above every major heading. */
function Kicker({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center gap-3 ${className}`}>
      <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
      <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
        {text}
      </span>
      <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
    </div>
  );
}

function PageHero() {
  return (
    <header className="page-hero-container" id="hero-archive">
      <div className="hero-inner-wrapper">
        <Kicker text="The AIMS Story" className="hero-kicker" />
        <h1 className="hero-main-title">Awards & Achievements</h1>
        <p className="hero-intro-lead">{institutionInfo.introStatement}</p>
      </div>
    </header>
  );
}

const MAIN_DOMAINS = [
  { id: "domain-departments", label: "Departments" },
  { id: "domain-faculty", label: "Faculty Achievements" },
  { id: "domain-students", label: "Student Achievements" },
  { id: "domain-sports", label: "Sports" },
  { id: "domain-wings", label: "Wings" },
];

function StickyNavIndex() {
  const [activeDomain, setActiveDomain] = useState("domain-departments");

  const scrollToDomain = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = MAIN_DOMAINS.length - 1; i >= 0; i--) {
        const el = document.getElementById(MAIN_DOMAINS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveDomain(MAIN_DOMAINS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="quick-nav-bar" aria-label="Awards and Achievements Major Navigation">
      <div className="quick-nav-inner">
        <div className="quick-nav-domains-track">
          {MAIN_DOMAINS.map((dom) => (
            <button
              key={dom.id}
              type="button"
              className={`main-domain-btn ${activeDomain === dom.id ? "domain-btn-active" : ""}`}
              onClick={() => scrollToDomain(dom.id)}
            >
              {dom.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function DepartmentSection({ department, index }: { department: Department; index: number }) {
  const { id, name, achievements = [] } = department;
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = achievements.length;
  const activeAchievement: DeptAchievement = achievements[currentSlide] || achievements[0];

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const isEven = index % 2 === 0;

  return (
    <section
      id={`dept-${id}`}
      className={`fixed-department-section ${isEven ? "dept-bg-white" : "dept-bg-tint"}`}
      aria-label={name}
    >
      <div className="section-container">
        <div className="dept-header-wrap">
          <h2 className="dept-main-title">{toTitleCase(name)}</h2>
        </div>

        <div className="dept-fixed-card-container">
          <div className="dept-slide-layout">
            <div className="dept-image-pane">
              {activeAchievement.image ? (
                <img
                  src={activeAchievement.image}
                  alt={activeAchievement.title}
                  loading="lazy"
                  className="dept-fixed-img"
                />
              ) : (
                <ImagePlaceholder title={name} subtitle={activeAchievement.category || "Departmental Achievement"} />
              )}

              {activeAchievement.badge && <span className="dept-floating-badge">{activeAchievement.badge}</span>}

              {totalSlides > 1 && (
                <>
                  <button
                    type="button"
                    className="dept-arrow-btn dept-arrow-left"
                    onClick={handlePrev}
                    aria-label="Previous achievement slide"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="dept-arrow-btn dept-arrow-right"
                    onClick={handleNext}
                    aria-label="Next achievement slide"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="dept-content-pane">
              <div className="dept-content-top-row">
                {activeAchievement.category && <span className="dept-category-tag">{activeAchievement.category}</span>}
                {totalSlides > 1 && (
                  <span className="dept-slide-counter">
                    {currentSlide + 1} / {totalSlides}
                  </span>
                )}
              </div>

              <h3 className="dept-achievement-heading">{activeAchievement.title}</h3>

              {activeAchievement.people && (
                <div className="dept-meta-item">
                  <Users size={14} className="dept-meta-icon" />
                  <span>{activeAchievement.people}</span>
                </div>
              )}

              {activeAchievement.collaborators && (
                <div className="dept-meta-item dept-collab-item">
                  <Layers size={14} className="dept-meta-icon" />
                  <span>
                    <strong>Collaboration:</strong> {activeAchievement.collaborators}
                  </span>
                </div>
              )}

              <div className="dept-description-box">
                <p className="dept-desc-text">{activeAchievement.description}</p>
              </div>

              {activeAchievement.recognition && (
                <div className="dept-recognition-bar">
                  <Award size={16} className="dept-rec-icon" />
                  <div className="dept-rec-text-wrap">
                    <span className="dept-rec-lead">Recognition:</span>
                    <p className="dept-rec-text">{activeAchievement.recognition}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NariShaktiSection() {
  const { title, subtitle, quote, description, presidedBy, images = [], categories } = nariShaktiPuraskar;

  return (
    <div className="nari-shakti-subdomain-block" id="subdomain-nari-shakti">
      <div className="ns-hero-banner">
        <div className="ns-tagline-wrap">
          <Sparkles size={16} className="ns-sparkle-icon" />
          <span className="ns-tagline-text">{toTitleCase(subtitle)}</span>
        </div>

        <h3 className="ns-main-heading">{toTitleCase(title)}</h3>
        <div className="ns-accent-gold-line"></div>

        <blockquote className="ns-institutional-quote">
          <Quote size={18} className="ns-quote-icon" />
          <span>"{quote}"</span>
        </blockquote>

        <p className="ns-event-summary">{description}</p>
        <p className="ns-presided-note">
          <strong>Auspices:</strong> {presidedBy}
        </p>
      </div>

      <div className="ns-content-split">
        <div className="ns-images-vertical-stack">
          {images && images.length > 0 ? (
            images.map((imgSrc, idx) => (
              <div key={idx} className={`ns-stacked-photo-wrap ${idx === 1 ? "ns-second-image-full-wrap" : "ns-first-image-wrap"}`}>
                <img
                  src={imgSrc}
                  alt={`Nari Shakti Puraskar Ceremony - Photo ${idx + 1}`}
                  loading="lazy"
                  className={idx === 1 ? "ns-second-full-img" : "ns-featured-image"}
                />
              </div>
            ))
          ) : (
            <ImagePlaceholder title="Nari Shakti Puraskar" subtitle="Honouring Women of AIMS" />
          )}
        </div>

        <div className="ns-categories-grid">
          {categories.map((cat, idx) => {
            const isOjaswi = cat.award.toLowerCase().includes("ojaswi");
            const isArundathi = cat.award.toLowerCase().includes("arundathi");
            return (
              <div
                key={idx}
                className={`ns-award-category-card ${isArundathi ? "ns-arundathi-card" : ""} ${isOjaswi ? "ns-ojaswi-card" : ""}`}
              >
                <div className="ns-award-header">
                  <span className="ns-award-sparkle">✦</span>
                  <h4 className="ns-award-category-title">{cat.award}</h4>
                </div>
                <p className="ns-award-category-desc">{cat.description}</p>

                {"recognition" in cat && cat.recognition && (
                  <div className="ns-award-distinction-badge">
                    <strong>Distinction:</strong> {cat.recognition}
                  </div>
                )}

                <div className="ns-awardees-list">
                  <div className="ns-awardee-badges">
                    {cat.awardees.map((awardee, aIdx) => (
                      <div key={aIdx} className="ns-awardee-chip">
                        <CheckCircle2 size={13} className="ns-check-icon" />
                        <span className="ns-awardee-name">{awardee.name}</span>
                        {awardee.program && <span className="ns-awardee-dept">({awardee.program})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NationalAwardsSection() {
  return (
    <div className="national-awards-subdomain-block" id="subdomain-national-awards">
      <div className="national-sub-header">
        <div className="national-badge-top">
          <Flag size={14} />
          <span>National Laureates</span>
        </div>
        <h3 className="national-block-title">National awards</h3>
        <p className="national-block-desc">
          Honoring AIMS scholars and athletes whose achievements have brought distinction at the national level.
        </p>
      </div>

      <div className="national-awards-grid">
        {nationalAwards.map((item) => (
          <div key={item.id} className="national-award-card">
            <div className="national-card-media">
              {item.image ? (
                <img src={item.image} alt={`${item.recipient} - ${item.award}`} loading="lazy" className="national-card-img" />
              ) : (
                <ImagePlaceholder title={item.recipient} subtitle={item.award} />
              )}
            </div>

            <div className="national-card-body">
              <span className="national-award-domain-tag">{item.domain}</span>
              <h4 className="national-awardee-name">{item.recipient}</h4>
              <span className="national-awardee-prog">{item.program}</span>

              <div className="national-award-box">
                <Medal size={15} className="medal-icon" />
                <span className="national-award-title-text">{item.award}</span>
              </div>

              <p className="national-award-desc">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacultyAchievements() {
  return (
    <section id="domain-faculty" className="major-domain-section faculty-domain" aria-label="Faculty Achievements Domain">
      <div className="section-container">
        <div className="domain-section-header">
          <Kicker text="Faculty Recognition" className="mb-3" />
          <h2 className="domain-heading-title">Faculty Achievements</h2>
          <p className="domain-heading-subtitle">
            Celebrating pedagogical excellence, clinical milestones, research discoveries, and institutional leadership of AIMS faculty.
          </p>
        </div>

        <div className="faculty-cards-grid">
          {facultyAchievements.map((faculty) => (
            <div key={faculty.id} className={`faculty-award-card ${faculty.id === "fac-10" ? "faculty-card-center" : ""}`}>
              <div className="faculty-card-photo-wrapper">
                {faculty.image ? (
                  <img
                    src={faculty.image}
                    alt={`${faculty.name} - ${faculty.department}`}
                    loading="lazy"
                    className="faculty-photo"
                    style={{ objectPosition: faculty.objectPosition || "center 20%" }}
                  />
                ) : (
                  <ImagePlaceholder title={faculty.name} subtitle={faculty.department} />
                )}
                <span className="faculty-badge-pill">{faculty.award}</span>
              </div>

              <div className="faculty-card-details">
                <h3 className="faculty-person-name">{faculty.name}</h3>

                <div className="faculty-dept-line">
                  <Briefcase size={14} className="meta-icon" />
                  <span>{faculty.department}</span>
                </div>

                <p className="faculty-desc-text">{faculty.description}</p>

                <div className="faculty-significance-bar">
                  <strong>Honour:</strong> {faculty.significance}
                </div>
              </div>
            </div>
          ))}
        </div>

        <NariShaktiSection />
        <NationalAwardsSection />
      </div>
    </section>
  );
}

function StudentAchievements() {
  return (
    <section id="domain-students" className="major-domain-section student-domain" aria-label="Student Achievements Domain">
      <div className="section-container">
        <div className="domain-section-header">
          <Kicker text="Scholar Distinctions" className="mb-3" />
          <h2 className="domain-heading-title">Student Achievements</h2>
          <p className="domain-heading-subtitle">
            Showcasing scholastic rigor, research presentations, hackathons, and state-level competitive distinctions.
          </p>
        </div>

        <div className="student-research-grid">
          {studentAchievements.map((item) => {
            const isCentered = item.id === "stu-7" || item.title.includes("Webinar");
            return (
              <div key={item.id} className={`student-rigor-card ${isCentered ? "student-rigor-card-centered" : ""}`}>
                <div className="rigor-card-header">
                  <div className="rigor-tag-wrap">
                    <Microscope size={15} />
                    <span>{item.event}</span>
                  </div>
                </div>

                <div className="rigor-card-media">
                  {item.image ? (
                    <img src={item.image} alt={item.title} loading="lazy" className="rigor-img" />
                  ) : (
                    <ImagePlaceholder title={item.title} subtitle={item.event} />
                  )}
                </div>

                <div className="rigor-card-body">
                  <h3 className="rigor-card-title">{item.title}</h3>

                  <div className="rigor-scholars-box">
                    <span className="scholars-lead">Student Scholars:</span>
                    <p className="scholars-names">
                      {item.students} ({item.year})
                    </p>
                  </div>

                  <p className="rigor-desc-text">{item.details}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="annual-day-block" id="subdomain-toppers">
          <div className="annual-day-header">
            <div className="annual-badge">
              <Trophy size={16} />
              <span>{academicToppers.event}</span>
            </div>
            <h3 className="annual-title">Academic Toppers Felicitation</h3>
            <p className="annual-subline">"{academicToppers.quote}"</p>
          </div>

          {academicToppers.gallery && academicToppers.gallery.length > 0 && (
            <div className="toppers-eight-images-grid">
              {academicToppers.gallery.map((imgSrc, idx) => (
                <div key={idx} className="topper-grid-cell">
                  <img src={imgSrc} alt={`Academic Topper Felicitation ${idx + 1}`} loading="lazy" className="topper-grid-img" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SportsSection() {
  const { event, venue, highlights, images = [], internalEvents, externalEvents } = sportsAccolades;

  return (
    <section id="domain-sports" className="major-domain-section sports-domain" aria-label="Sports Domain">
      <div className="section-container">
        <div className="domain-section-header">
          <Kicker text="Athletics" className="mb-3" />
          <h2 className="domain-heading-title">Sports</h2>
          <p className="domain-heading-subtitle">
            Celebrating athletic triumphs, collegiate tournaments, and indomitable sportsmanship of AIMS athletes.
          </p>
        </div>

        <div className="sports-single-hero-card">
          <div className="sports-dual-images-row sports-three-images-row">
            {images.map((imgSrc, idx) => (
              <div key={idx} className={`sports-dual-pane sports-pane-${idx + 1}`}>
                <img src={imgSrc} alt={`NIRBHAYA 2026 Annual Sports Meet - Photo ${idx + 1}`} loading="lazy" className="sports-dual-img" />
              </div>
            ))}
            <span className="sports-badge-pill">{toTitleCase(event)}</span>
          </div>

          <div className="sports-single-content-pane">
            <span className="sports-venue-lead">Venue: {venue}</span>
            <h3 className="sports-meet-heading">{toTitleCase(event)}</h3>
            <p className="sports-summary-desc">{highlights}</p>

            <div className="sports-columns-grid">
              <div className="sports-subcolumn">
                <div className="sports-subcol-title">
                  <Flame size={16} className="col-icon" />
                  <h4>Intra-Institutional Tournament Winners</h4>
                </div>
                <div className="sports-events-compact-list">
                  {internalEvents.map((evt, idx) => (
                    <div key={idx} className="sports-compact-row">
                      <div className="sports-row-meta">
                        <Activity size={12} className="sports-activity-icon" />
                        <span className="sports-event-name">{evt.event}</span>
                      </div>
                      <div className="sports-row-winner">
                        <span className="sports-winner-text">{evt.winner}</span>
                        <span
                          className={`sports-chip ${
                            evt.position.includes("1st") ? "chip-gold" : evt.position.includes("2nd") ? "chip-silver" : "chip-bronze"
                          }`}
                        >
                          {evt.position.includes("1st") ? (
                            <span className="sports-chip-medal" aria-label="1st Prize">
                              🥇
                            </span>
                          ) : evt.position.includes("2nd") ? (
                            <span className="sports-chip-medal" aria-label="2nd Prize">
                              🥈
                            </span>
                          ) : evt.position.includes("3rd") ? (
                            <span className="sports-chip-medal" aria-label="3rd Prize">
                              🥉
                            </span>
                          ) : null}
                          <span className="sports-chip-label">{evt.position}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sports-subcolumn">
                <div className="sports-subcol-title">
                  <Trophy size={16} className="col-icon" />
                  <h4>External Inter-Collegiate Tournaments</h4>
                </div>
                <div className="external-medals-stack">
                  {externalEvents.map((ext, eIdx) => (
                    <div key={eIdx} className="external-medal-tile">
                      <div className="ext-medal-badge">
                        <Medal size={14} />
                        <span>{ext.result}</span>
                      </div>
                      <h5 className="ext-tourn-heading">{ext.tournament}</h5>
                      <p className="ext-meta-line">
                        <strong>Discipline:</strong> {ext.category}
                      </p>
                      <p className="ext-meta-line">
                        <strong>Athlete:</strong> {ext.athlete}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CulturalWingsSection() {
  return (
    <section id="domain-wings" className="major-domain-section wings-domain" aria-label="Wings Domain">
      <div className="section-container">
        <div className="domain-section-header">
          <Kicker text="Student Council" className="mb-3" />
          <h2 className="domain-heading-title">Wings</h2>
          <p className="domain-heading-subtitle">
            Specialized collectives of the Student Council orchestrating co-curricular, artistic, and literary life.
          </p>
        </div>

        <div className="wings-clean-grid">
          {wings.map((wing) => (
            <div key={wing.id} className="wing-card-clean" data-wing={wing.id}>
              <div className="wing-single-media">
                {wing.image ? (
                  <img src={wing.image} alt={wing.name} loading="lazy" className="wing-single-img" />
                ) : (
                  <ImagePlaceholder title={wing.name} subtitle={wing.motto} />
                )}
              </div>

              <div className="wing-content-clean">
                <h3 className="wing-typography-title">{toTitleCase(wing.name)}</h3>
                <span className="wing-motto-text">“{wing.motto}”</span>
                <p className="wing-short-desc">{wing.description}</p>

                {wing.highlight && (
                  <div className="wing-key-activity">
                    <span className="activity-label">Key Activity:</span>
                    <p className="activity-text">{wing.highlight}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AwardsPage() {
  return (
    <div className="awards-page aims-awards-app">
      <PageHero />
      <StickyNavIndex />

      <main className="archive-main-flow">
        <section id="domain-departments" className="major-domain-container">
          <div className="section-container">
            <div className="domain-section-header">
              <Kicker text="Academics & Clinical Units" className="mb-3" />
              <h2 className="domain-heading-title">Departments</h2>
              <p className="domain-heading-subtitle">
                Every academic and clinical department operating at the forefront of medical training, bedside diagnostics, and foundational
                science.
              </p>
            </div>
          </div>

          <div className="departments-flow-list">
            {departments.map((dept, index) => (
              <DepartmentSection key={dept.id} department={dept} index={index} />
            ))}
          </div>
        </section>

        <FacultyAchievements />
        <StudentAchievements />
        <SportsSection />
        <CulturalWingsSection />
      </main>
    </div>
  );
}
