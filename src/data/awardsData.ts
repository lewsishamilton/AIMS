export interface DeptAchievement {
  id: string;
  title: string;
  badge: string;
  collaborators: string;
  people: string;
  category: string;
  image: string | null;
  description: string;
  recognition: string;
}

export interface Department {
  id: string;
  name: string;
  achievements: DeptAchievement[];
}

const img = (n: number, ext: "jpg" | "png" = "jpg") => `/awards-images/image${n}.${ext}`;

export const institutionInfo = {
  name: "ARUNDATHI INSTITUTE OF MEDICAL SCIENCES (AIMS)",
  tagline: "Nurturing Healers with Compassion",
  introStatement:
    "Celebrating academic excellence, clinical mastery, innovative research, and student distinction across our medical and healthcare departments.",
};

export const departments: Department[] = [
  {
    id: "anatomy",
    name: "Department of Anatomy",
    achievements: [
      {
        id: "anat-1",
        title: "Neurofest 2026: Experiential Learning in Foundational Neuroscience",
        badge: "Joint Achievement",
        collaborators: "Department of Physiology, with support from Department of Pharmacology",
        people: "Dr. K. Vijay Kumar (HOD, Anatomy), Dr. P. Sambasivarao (HOD, Physiology), Mr. Mudasir Bashir, Mrs. S. Harika, Mr. V. Venkateswarlu, Dr. D. Santhoshi Rupa, Dr. DTV Naresh",
        category: "Academic & Scientific Symposium",
        image: img(1),
        description:
          "Jointly conducted Neurofest 2026 for first-year MBBS scholars to promote an experiential approach to neuroscience. The event featured a clinically oriented Neuroscience Quiz, structural neuro-rangoli, and poster presentations emphasizing clinical correlation.",
        recognition: "Winners: Rangoli — Charishma Varadh | Quiz — Ayesha, Rushikesh | Poster — Savez, Surya",
      },
      {
        id: "anat-2",
        title: "Neuro-Rangoli & Neural Spatial Morphology Competition",
        badge: "Scientific Creative Learning",
        collaborators: "Pre-clinical Medical Cohort",
        people: "Charishma Varadh & MBBS Scholars",
        category: "Morphological Representation",
        image: img(2),
        description:
          "Medical students depicted complex neural structures and brain anatomy through creative rangoli art, reinforcing spatial orientation and anatomical architecture.",
        recognition: "First Prize: Charishma Varadh (Rangoli Competition)",
      },
    ],
  },
  {
    id: "physiology",
    name: "Department of Physiology",
    achievements: [
      {
        id: "phys-1",
        title: "Neurofest 2026: Collaborative Academic Initiative in Clinical Neuroscience",
        badge: "Joint Achievement",
        collaborators: "Department of Anatomy & Pharmacology",
        people: "Dr. P. Sambasivarao (HOD, Physiology), Dr. K. Vijay Kumar (HOD, Anatomy), Mrs. S. Harika (Physiology)",
        category: "Inter-Departmental Collaboration",
        image: img(5),
        description:
          "Partnered with the Department of Anatomy for Neurofest 2026, challenging students across neurophysiology problem-solving, neural reflex pathways, and clinical diagnostic scenarios.",
        recognition: "Exemplary competency-based preclinical neurophysiology training",
      },
      {
        id: "phys-2",
        title: "Neuroscience Clinical Case Presentation & Quiz",
        badge: "Clinical Quiz & Posters",
        collaborators: "First-Year MBBS Cohort",
        people: "Ayesha, Rushikesh, Savez, Surya",
        category: "Neurophysiology Forum",
        image: img(6),
        description:
          "A clinically oriented quiz focusing on neurological lesion localization, reflex pathways, and interactive poster presentations bridging physiology with bedside diagnostics.",
        recognition: "Quiz Winners: Ayesha & Rushikesh | Poster Winners: Savez & Surya",
      },
    ],
  },
  {
    id: "biochemistry",
    name: "Department of Biochemistry",
    achievements: [
      {
        id: "biochem-1",
        title: "Interdisciplinary Clinical Integrated Teaching Sessions",
        badge: "Inter-Departmental Activity",
        collaborators: "Departments of Pathology, Paediatrics & General Medicine",
        people: "Dr. Radha (Pathology), Dr. Phalguna (Paediatrics), Dr. Prashanth (Gen Med), Dr. Shilpa Maduri Kadiyam",
        category: "Clinical Integration",
        image: img(3),
        description:
          "Organized integrated teaching classes connecting metabolic pathways to clinical diagnostics: Cardiac & Kidney Function Tests (CFT/KFT) with Pathology, Abnormal Haemoglobins with Paediatrics, and Atherosclerosis Pathophysiology with General Medicine.",
        recognition: "Cross-departmental preclinical-clinical curriculum",
      },
      {
        id: "biochem-2",
        title: "Undergraduate Research Mini-Projects for ICMR STS Funding",
        badge: "Funded Research",
        collaborators: "Indian Council of Medical Research (ICMR)",
        people: "Nishitha (3rd yr MBBS), Pourva (2nd yr MBBS), Dr. Suma Preethi (HOD), Dr. Lalitha Devi",
        category: "Student Research",
        image: null,
        description:
          "Fostered early student research with two ICMR STS projects: 'Oxidative DNA damage and early renal change in T2DM on Metformin Monotherapy' (Nishitha) and 'Serum Magnesium and Zinc as Early Biomarkers in First-Degree Relatives of T2DM' (Pourva).",
        recognition: "Submitted for ICMR STS grant funding & institutional support",
      },
      {
        id: "biochem-3",
        title: "Peer-Reviewed Research Publications in Oncology & Neuroscience",
        badge: "Research Publications",
        collaborators: "Reputed International Journals",
        people: "Mrs. Beena Thazhackavayal Baby, Dr. Lalitha Devi Seerla",
        category: "Biochemical Research",
        image: null,
        description:
          "Published significant research in BBA on epithelial-mesenchymal transition in cancer targeting itraconazole, as well as landmark studies on serum TNFR 1 and oxidative stress cascades in epilepsy.",
        recognition: "Published in Biochimica et Biophysica Acta (BBA) & neurochemistry journals",
      },
    ],
  },
  {
    id: "pathology",
    name: "Department of Pathology",
    achievements: [
      {
        id: "path-1",
        title: "Diagnostic Reporting of Rare Pathological Entities",
        badge: "Clinical Diagnostic Excellence",
        collaborators: "AIMS Tertiary Care Units",
        people: "Department of Pathology Faculty",
        category: "Clinical Case Repertoire",
        image: img(7),
        description:
          "Diagnosed and documented four rare and challenging pathological entities: Angio Lymphoid Hyperplasia with Eosinophilia, Angiomyxoma Vulva, Amoebic Colitis, and Umbilical Vein Varix, reinforcing diagnostic acumen.",
        recognition: "Institutional Clinical Case Repertoire Enrichment",
      },
      {
        id: "path-2",
        title: "Artificial Intelligence in Modern Diagnostic Pathology",
        badge: "Digital Health Research",
        collaborators: "Academic Pathology Informatics Group",
        people: "Dr. Sarvani, Dr. Radha, Dr. Shilpa",
        category: "AI & Pathology",
        image: null,
        description:
          "Co-authored research on 'Awareness, Acceptance and Perceived Challenges of Utilisation of Artificial Intelligence in Pathology', examining modern computer-assisted diagnostic workflows.",
        recognition: "Pioneering technological pathology study",
      },
      {
        id: "path-3",
        title: "HAP 6th Conference & Undergraduate Scholarly Presentations",
        badge: "Scholarly Forums & Outreach",
        collaborators: "HAP 6th Conference",
        people: "Dr. Radha, Faculty & Undergraduate Scholars",
        category: "Conferences & Community",
        image: img(10),
        description:
          "Presented a slide seminar on Fibromatosis Breast and a poster on Pseudo Xanthoma Elasticum at HAP 6th Conference. Conducted school urine protein screening on World Kidney Day and guided student presentations on Calcaneal TB and PVNS.",
        recognition: "HAP Conference Presentations & World Kidney Day screening",
      },
    ],
  },
  {
    id: "pharmacology",
    name: "Department of Pharmacology",
    achievements: [
      {
        id: "pharm-1",
        title: "Inter-Departmental Integrated Session on Tuberculosis",
        badge: "Joint Achievement",
        collaborators: "Departments of SPM, Microbiology, and Pathology",
        people: "Dr. Naresh (Assistant Professor), Dr. Harshitha (SPM), Dr. Sandhya (Microbiology), Dr. Nuzhath (Pathology)",
        category: "Inter-Departmental Activity",
        image: img(11),
        description:
          "Organized a multi-departmental integrated symposium on Tuberculosis for Second Year MBBS students. Dr. Naresh delivered in-depth lectures on pharmacotherapeutic management, drug regimens, mechanism of action, resistance patterns, and protocols.",
        recognition: "4-Department integrated clinical pharmacology module",
      },
      {
        id: "pharm-2",
        title: "Toxicology Discourse & In Silico Molecular Docking Research",
        badge: "Research & Pedagogy",
        collaborators: "Department of FMT",
        people: "Dr. Santhoshi Roopa D, Reddy Prasad C, Mahesh B Modhol",
        category: "Pharmacology & Molecular Modeling",
        image: null,
        description:
          "Conducted collaborative teaching with FMT on poisoning and toxic exposures. Published peer-reviewed research on antibacterial actions of pomegranate extracts and molecular docking with Nrf2, SOD, and Angiotensin II.",
        recognition: "Publications in Pharmacognosy Research & Computational Pharmacology",
      },
    ],
  },
  {
    id: "microbiology",
    name: "Department of Microbiology",
    achievements: [
      {
        id: "micro-1",
        title: "Clinical Microbiology Integrated Teaching Series",
        badge: "Joint Achievement",
        collaborators: "Departments of General Medicine, Dermatology, SPM, and Pathology",
        people: "Dr. Sandhya (HOD), Dr. Hasna, Dr. Amitha, Dr. Chaitanya, Dr. Naga Babu, Dr. Harshitha",
        category: "Inter-Departmental Activity",
        image: img(12),
        description:
          "Conducted five clinical correlation sessions: Fever of Unknown Origin (with Dr. Hasna), HIV-AIDS (with Dr. Amitha), Gut Microbiology (with Dr. Chaitanya), Tuberculosis multi-departmental session, and Skin Infections (with Dr. Naga Babu).",
        recognition: "5-part multi-departmental clinical microbiology series",
      },
    ],
  },
  {
    id: "fmt",
    name: "Department of Forensic Medicine and Toxicology",
    achievements: [
      {
        id: "fmt-1",
        title: "Indian Patent: AI & ML in Forensic Facial Reconstruction",
        badge: "Indian Patent & Research",
        collaborators: "Indian Patent Office / ScienceDirect",
        people: "Ms. Amoli (Assistant Professor)",
        category: "Forensic Technology",
        image: null,
        description:
          "Ms. Amoli filed an Indian Patent for automated 3D facial reconstruction of unidentified skeletal remains using AI algorithms. Also published a review on illicit drug metabolism in the prestigious Journal of Forensic and Legal Medicine (Elsevier).",
        recognition: "Indian Patent Filed & Elsevier ScienceDirect Publication",
      },
      {
        id: "fmt-2",
        title: "Collaborative Toxicology Training",
        badge: "Inter-Departmental Activity",
        collaborators: "Department of Pharmacology",
        people: "Ms. Amoli & FMT Faculty",
        category: "Medicolegal Pedagogy",
        image: null,
        description:
          "Conducted joint integrated session with Pharmacology on clinical and medicolegal aspects of poisoning, sample preservation, toxic exposures, and courtroom testimony.",
        recognition: "Clinical and medicolegal toxicological curriculum",
      },
    ],
  },
  {
    id: "spm",
    name: "Department of Social and Preventive Medicine",
    achievements: [
      {
        id: "spm-1",
        title: "Community Outreach, School Screenings & Health Promotion",
        badge: "Community Health",
        collaborators: "PHC Suraram, Zilla Parishad High School Dundigal",
        people: "SPM Faculty, Medical Officers & Student Contingent",
        category: "Preventive Medicine",
        image: img(13),
        description:
          "Conducted urine protein screening on World Kidney Day, TB awareness at PHC Suraram, cervical cancer and menstrual hygiene drives at Dundigal Government High School, and health promotion on nutrition, hygiene, and mental wellness.",
        recognition: "Broad community screening and public health awareness reach",
      },
      {
        id: "spm-2",
        title: "Occupational Health Research on Women Beedi Workers",
        badge: "Public Health Research",
        collaborators: "Community Health Research Group",
        people: "Dr. Swetha",
        category: "Occupational Health",
        image: null,
        description:
          "Published a cross-sectional study titled 'Perceptions and Morbidity Profile among Women Beedi Workers', analyzing chronic tobacco dust exposure, respiratory illness, and musculoskeletal disorders to advocate for health policy reform.",
        recognition: "Key evidence-based study on vulnerable rural women workers",
      },
    ],
  },
  {
    id: "general-medicine",
    name: "Department of General Medicine",
    achievements: [
      {
        id: "genmed-1",
        title: "Clinical Bedside-to-Bench Integrated Teaching Modules",
        badge: "Inter-Departmental Activity",
        collaborators: "Departments of Microbiology, Pathology, and Biochemistry",
        people: "Dr. Hasna, Dr. Amitha, Dr. Chaitanya, Dr. Prashanth",
        category: "Internal Medicine Pedagogy",
        image: img(8),
        description:
          "Led core clinical integration modules connecting internal medicine with laboratory disciplines: diagnostic approach to Fever of Unknown Origin, comprehensive HIV-AIDS management, and Atherosclerosis pathophysiology.",
        recognition: "Comprehensive preclinical-clinical correlation in tertiary internal medicine",
      },
    ],
  },
  {
    id: "dermatology",
    name: "Department of Dermatology",
    achievements: [
      {
        id: "derm-1",
        title: "Clinical Correlation on Cutaneous Infections & Microbial Pathogenesis",
        badge: "Inter-Departmental Activity",
        collaborators: "Department of Microbiology",
        people: "Dr. Naga Babu (Department of Dermatology)",
        category: "Dermatological Medicine",
        image: null,
        description:
          "Conducted an interactive clinical correlation linking morphological cutaneous lesions with underlying bacterial, fungal, and viral pathogens, training scholars in visual dermatological diagnosis.",
        recognition: "Preclinical microbiology to clinical dermatology integration",
      },
    ],
  },
  {
    id: "gastroenterology",
    name: "Department of Gastroenterology",
    achievements: [
      {
        id: "gastro-1",
        title: "Double Badminton Championship at Nirbhaya 2026 Sports Meet",
        badge: "Sports Championship",
        collaborators: "MLRIT Sports Arena",
        people: "Dr. RK Chaitanya Reddy & Dr. Dasarithi",
        category: "Institutional Athletics",
        image: null,
        description:
          "Dr. RK Chaitanya Reddy delivered a stellar performance at the Nirbhaya 2026 Annual Sports Meet, clinching gold in Men's Singles Badminton and Men's Doubles Badminton (alongside Dr. Dasarithi).",
        recognition: "Champion — Men's Singles & Men's Doubles Badminton",
      },
      {
        id: "gastro-2",
        title: "Gut Microbiology & Clinical Gastrointestinal Integration",
        badge: "Inter-Departmental Activity",
        collaborators: "Department of Microbiology",
        people: "Dr. Chaitanya",
        category: "Digestive Health",
        image: null,
        description:
          "Bridged gut microbiology with clinical gastrointestinal practice, focusing on enteric microbiome dynamics, gastrointestinal infections, and contemporary clinical protocols.",
        recognition: "Interdisciplinary clinical GI correlation",
      },
    ],
  },
  {
    id: "psychiatry",
    name: "Department of Psychiatry",
    achievements: [
      {
        id: "psych-1",
        title: "National Integration Camp Speaker & Pharm.D Research Guidance",
        badge: "National Outreach & Mentorship",
        collaborators: "National Cadet Corps (NCC) / JNTUH",
        people: "Dr. S. Mounika Reddy, MBBS, DNB (Psychiatry), Assistant Professor",
        category: "Community Psychiatry",
        image: img(17),
        description:
          "Invited speaker at the National Integration Camp for NCC Cadets on youth mental health and resilience. Hospital Guide for three JNTUH Pharm.D dissertations covering inpatient depression, medication adherence, and sleep quality counselling.",
        recognition: "Invited National Speaker & JNTUH Hospital Guide for 3 Dissertations",
      },
      {
        id: "psych-2",
        title: "Integrated Session on Child Psychiatric Disorders",
        badge: "Joint Achievement",
        collaborators: "Department of Paediatrics",
        people: "Faculty of Psychiatry and Paediatrics",
        category: "Neurodevelopmental Health",
        image: null,
        description:
          "Conducted collaborative academic session on pediatric psychiatric and neurodevelopmental conditions, emphasizing early diagnosis and multidisciplinary child guidance.",
        recognition: "Inter-departmental pediatric neuropsychiatry curriculum",
      },
    ],
  },
  {
    id: "dentistry",
    name: "Department of Dentistry",
    achievements: [
      {
        id: "dent-1",
        title: "Landmark Publications in Journal of Periodontology & Elsevier",
        badge: "Research Publications",
        collaborators: "Journal of Periodontology / Elsevier",
        people: "Dr. Pranavi Jadhav",
        category: "Oral & Maxillofacial Research",
        image: null,
        description:
          "Co-authored landmark study establishing clinical correlation between periodontitis severity and COVID-19 in Journal of Periodontology, and a randomized trial on mandibular fracture fixation techniques in Journal of Stomatology, Oral and Maxillofacial Surgery.",
        recognition: "High-impact international oral and maxillofacial publications",
      },
    ],
  },
  {
    id: "general-surgery",
    name: "Department of General Surgery",
    achievements: [
      {
        id: "surg-1",
        title: "Defying Rarity: Successful Operative Management of Lumbar Hernia",
        badge: "Landmark Surgical Feat",
        collaborators: "AIMS Operating Surgical Team",
        people: "Surgical Team, Department of General Surgery",
        category: "Advanced Abdominal Surgery",
        image: img(18),
        description:
          "Successfully diagnosed and operated upon a Lumbar Hernia — one of the rarest abdominal hernias worldwide (<1% of abdominal hernias). Rare cases don't just exist in textbooks — at AIMS, we treat them.",
        recognition: "Exemplary operative surgical success (<1% worldwide incidence)",
      },
      {
        id: "surg-2",
        title: "Median Arcuate Ligament Syndrome (MALS) Surgical Research",
        badge: "Vascular Case Publication",
        collaborators: "Indian Journal of Applied Research (IJAR)",
        people: "Dr. Mekala Pravallika",
        category: "Surgical Case Literature",
        image: null,
        description:
          "Published research on dynamic celiac artery compression causing postprandial ischemia due to Median Arcuate Ligament Syndrome in IJAR (Vol 16, Issue 01, Jan 2026), offering valuable clinical insights.",
        recognition: "Published in Indian Journal of Applied Research",
      },
    ],
  },
  {
    id: "paediatrics",
    name: "Department of Paediatrics",
    achievements: [
      {
        id: "paed-1",
        title: "Inter-Departmental Integrated Session on Child Psychiatric Disorders",
        badge: "Joint Achievement",
        collaborators: "Department of Psychiatry",
        people: "Faculty of Paediatrics and Psychiatry",
        category: "Child Health & Neuropsychiatry",
        image: null,
        description:
          "Conducted collaborative integrated session on psychiatric and developmental disorders in children, addressing the pediatric neuropsychiatric continuum and multidisciplinary intervention.",
        recognition: "Collaborative pediatric mental health model",
      },
      {
        id: "paed-2",
        title: "Clinical Pedagogy on Abnormal Haemoglobins",
        badge: "Inter-Departmental Activity",
        collaborators: "Department of Biochemistry",
        people: "Dr. Phalguna",
        category: "Pediatric Haematology",
        image: null,
        description:
          "Led an integrated session with Biochemistry on abnormal haemoglobins and genetic haemoglobinopathies, reinforcing biochemical diagnosis with bedside pediatric management.",
        recognition: "Preclinical-clinical paediatric integration",
      },
    ],
  },
  {
    id: "ophthalmology",
    name: "Department of Ophthalmology",
    achievements: [
      {
        id: "opht-1",
        title: "Comparative Clinical Trial on Premium EDOF Intraocular Lenses",
        badge: "Springer Nature Publication",
        collaborators: "Cureus (Springer Nature)",
        people: "Dr. R. Prakhya",
        category: "Ophthalmic Surgery Research",
        image: null,
        description:
          "Co-authored prospective comparative clinical trial across 120 eyes of 60 cataract patients in Cureus (Springer Nature), demonstrating superior intermediate visual acuity and contrast sensitivity with Eyecryl SERT IOL.",
        recognition: "Published in Cureus (Springer Nature) — 120 eyes prospective study",
      },
    ],
  },
  {
    id: "obg",
    name: "Department of Obstetrics and Gynaecology",
    achievements: [
      {
        id: "obg-1",
        title: "Paper Presentation at FOGSI South Zonal Conference with YUVA",
        badge: "National Conference Presentation",
        collaborators: "FOGSI South Zonal Conference",
        people: "Dr. Abhilasha",
        category: "Gynaecological Surgery",
        image: null,
        description:
          "Presented research in Ooty on a giant pedunculated cystic leiomyoma of the uterus mimicking ovarian malignancy, demonstrating astute diagnostic skill that avoided unnecessary radical surgery.",
        recognition: "FOGSI South Zonal Conference with YUVA Selection",
      },
    ],
  },
  {
    id: "physiotherapy",
    name: "Department of Physiotherapy",
    achievements: [
      {
        id: "physio-1",
        title: "Women's Day Leadership & First Prize Stroke Awareness Skit",
        badge: "Leadership & Cultural Laurels",
        collaborators: "AIMS Annual Day & Physiotherapy College",
        people: "Ms. Sudha",
        category: "Clinical Advocacy & Leadership",
        image: null,
        description:
          "Organized Women's Day Celebration highlighting women in physiotherapy history. Directed the Stroke Awareness Skit that won First Prize at Annual Day Competitions 2026, and led AHS Fresher Orientation.",
        recognition: "1st Prize — Stroke Awareness Skit & Annual Day Leadership",
      },
      {
        id: "physio-2",
        title: "Student National Sports Honors & Academic Felicitations",
        badge: "Student Accolades",
        collaborators: "AIMS Academic Council & National Sports Meets",
        people: "D. Rakshitha, Keerthana, Vidathri, C. Rohith",
        category: "Student Distinction",
        image: null,
        description:
          "Physiotherapy scholars earned national sports honors (D. Rakshitha), TRISHNA 2K26 Academic Toppers (Keerthana, C. Rohith), and Nari Shakti Puraskar awards (Ojaswi, Medhavi Chhatra, Kala Shresthi).",
        recognition: "National Sports Award & TRISHNA 2K26 Toppers",
      },
    ],
  },
  {
    id: "paramedical",
    name: "Paramedical & Allied Health Sciences",
    achievements: [
      {
        id: "paramed-1",
        title: "Orientation Day 2026 for MLT, Nursing & BPT Batches",
        badge: "Institutional Milestone",
        collaborators: "Colleges of MLT, Nursing, and Physiotherapy",
        people: "Incoming Cohorts of MLT, Nursing, and BPT",
        category: "Allied Health Sciences",
        image: img(50),
        description:
          "Welcomed new batches of Medical Laboratory Technology, Nursing, and Physiotherapy on April 18, 2026, celebrating the commitment to diagnostic science, bedside care, and physical rehabilitation.",
        recognition: "Formal Inauguration of 2026 Allied Health Sciences Cohorts",
      },
      {
        id: "paramed-2",
        title: "Allied Health Sciences Student Honors & Toppers",
        badge: "Student Distinction",
        collaborators: "AIMS Academic Council",
        people: "Megavath Nandini (Ms. Fresher), Aza Hussain, Bala Mahesh, Sana Firdos, Nandhani, Ganesh, Ruchitha",
        category: "Academic & Cultural Honors",
        image: null,
        description:
          "Megavath Nandini (MLT) crowned Ms. Fresher 2026 at Traditional Day. Academic toppers honored across MLT (Aza Hussain, Bala Mahesh, Sana Firdos) and Nursing (Nandhani, Ganesh, Ruchitha).",
        recognition: "Ms. Fresher 2026 & TRISHNA 2K26 Academic Toppers",
      },
    ],
  },
];

export interface FacultyAward {
  id: string;
  name: string;
  department: string;
  award: string;
  occasion: string;
  image: string | null;
  objectPosition?: string;
  description: string;
  significance: string;
}

export const facultyAchievements: FacultyAward[] = [
  {
    id: "fac-1",
    name: "Dr. Radha",
    department: "Department of Pathology",
    award: "Maa Saraswathi Award",
    occasion: "Nari Shakti Puraskar Ceremony",
    image: img(21),
    objectPosition: "center 20%",
    description:
      "Awarded for achieving the highest student pass percentage in Pathology for the II MBBS batch, reflecting exceptional teaching and faculty leadership.",
    significance: "Highest Pass Percentage in II MBBS Pathology",
  },
  {
    id: "fac-2",
    name: "Dr. Suma Preethi",
    department: "Department of Biochemistry",
    award: "Maa Saraswathi Award",
    occasion: "Nari Shakti Puraskar Ceremony",
    image: img(22),
    objectPosition: "center 20%",
    description: "Honored with the Maa Saraswathi Award for achieving the highest pass percentage in Biochemistry for First Year MBBS students.",
    significance: "Highest Pass Percentage in I MBBS Biochemistry",
  },
  {
    id: "fac-3",
    name: "Dr. Katherine & Mrs. Beena",
    department: "Microbiology & Biochemistry",
    award: "Kiran Award",
    occasion: "Nari Shakti Puraskar Ceremony",
    image: img(23),
    objectPosition: "center 25%",
    description: "Conferred the Kiran Award in recognition of their research projects being accepted under the Department of Science and Technology (DST).",
    significance: "Funded Research Projects Accepted under DST",
  },
  {
    id: "fac-4",
    name: "Dr. Abilasha & Dr. Pranavi",
    department: "Obstetrics & Gynaecology / Dentistry",
    award: "The Perfect Attendance Award",
    occasion: "Nari Shakti Puraskar Ceremony",
    image: null,
    objectPosition: "center 20%",
    description: "Honored for exemplary professional dedication, consistent presence, and disciplined work ethic in academic teaching and patient care.",
    significance: "Exemplary Professional Dedication",
  },
  {
    id: "fac-5",
    name: "Ms. Amoli",
    department: "Department of Forensic Medicine and Toxicology",
    award: "Indian Patent & Elsevier Review Publication",
    occasion: "Intellectual Property & Forensic Research",
    image: null,
    description:
      "Filed Indian Patent for AI/ML-driven 3D craniofacial reconstruction of unidentified remains, and authored review on illicit drug metabolism in Elsevier's Journal of Forensic and Legal Medicine.",
    significance: "Indian Patent Filed & Elsevier Publication",
  },
  {
    id: "fac-6",
    name: "Dr. Swetha",
    department: "Department of Social and Preventive Medicine",
    award: "Occupational Health Research",
    occasion: "Scientific Publication",
    image: null,
    description: "Published research on morbidity profiles and respiratory risks among female beedi workers, advocating for targeted public health policy reform.",
    significance: "Public Health Advocacy for Female Workforce",
  },
  {
    id: "fac-7",
    name: "Dr. RK Chaitanya Reddy",
    department: "Department of Gastroenterology",
    award: "Badminton Champion (Singles & Doubles)",
    occasion: "Nirbhaya 2026 Annual Sports Meet at MLRIT",
    image: img(24),
    objectPosition: "center 20%",
    description: "Clinched double championship gold in Men's Singles Badminton and Men's Doubles Badminton (with Dr. Dasarithi) at Nirbhaya 2026.",
    significance: "Double Badminton Champion at MLRIT",
  },
  {
    id: "fac-8",
    name: "Dr. Mekala Pravallika",
    department: "Department of General Surgery",
    award: "Vascular Surgery Research Publication",
    occasion: "Indian Journal of Applied Research",
    image: null,
    description: "Published surgical case study on dynamic celiac artery compression in Median Arcuate Ligament Syndrome (MALS) in IJAR (Jan 2026).",
    significance: "IJAR Vascular Surgery Publication",
  },
  {
    id: "fac-9",
    name: "Ms. Sudha",
    department: "Department of Physiotherapy (BPT)",
    award: "1st Prize Director & Annual Day Leadership",
    occasion: "AIMS Annual Day Competitions",
    image: null,
    description: "Directed the First Prize-winning Stroke Awareness Skit at Annual Day 2026, coordinated Women's Day celebrations, and led AHS Fresher Orientation.",
    significance: "1st Prize Stroke Awareness Skit",
  },
  {
    id: "fac-10",
    name: "Dr. Lalitha Devi",
    department: "Head of Events and Activities / Biochemistry",
    award: "Institutional & Cultural Leadership",
    occasion: "Annual Institutional Direction",
    image: img(37),
    objectPosition: "center 20%",
    description: "Driving force behind student council wings, cultural festivals, academic quizzes, and publications including the AIMS Newsletter and Annual College Magazine.",
    significance: "Head of Events, Publications & Multi-Club Leadership",
  },
];

export const nariShaktiPuraskar = {
  title: "Nari Shakti Puraskar",
  subtitle: "Honouring the Women of AIMS",
  quote: "Empowered women empower nations — and at AIMS, we are proud to lead by example.",
  description:
    "Conferred on the eve of Women's Day, celebrating academic brilliance, artistic excellence, sporting triumphs, and research innovation among women scholars and faculty.",
  presidedBy: "Presided over by Principal, AIMS, under the guidance of Dr. Lalitha Devi.",
  images: [img(37), img(38)],
  categories: [
    {
      award: "Arundathi Award",
      awardees: [{ name: "Poorva", program: "2nd Year MBBS" }],
      description:
        "The premier flagship institutional distinction of AIMS, conferred upon Poorva (MBBS) in supreme recognition of exemplary academic dedication, ICMR research project scholarship in Biochemistry, multidimensional merit, and inspiring leadership representing the highest ideals of women scholars.",
      recognition: "Supreme Student Distinction & Flagship Institutional Honour",
    },
    {
      award: "Medhavi Chhatra Award",
      awardees: [
        { name: "Jayanthika", program: "MBBS" },
        { name: "Nishitha", program: "MBBS" },
        { name: "Keerthana", program: "BPT" },
        { name: "Aza Hussain", program: "2nd yr MLT" },
        { name: "Nandini", program: "3rd yr Nursing" },
      ],
      description: "Recognizing outstanding academic brilliance and scholastic rank.",
    },
    {
      award: "Kala Shresthi Award",
      awardees: [
        { name: "Aishwarya", program: "BPT" },
        { name: "Varshini", program: "BPT" },
        { name: "Vidathri", program: "BPT" },
      ],
      description: "Conferred for exceptional artistic talent, creative vision, and cultural mastery.",
    },
    {
      award: "Mirabai Award",
      awardees: [{ name: "Dr. Sandhya Rani", program: "Faculty / Senior Academician" }],
      description: "Honoring steadfast perseverance and inspiring service to medical academia.",
    },
    {
      award: "Ojaswi Award",
      awardees: [
        { name: "Nawazia", program: "MBBS (Sports Champion)" },
        { name: "Rakshitha", program: "BPT (National Sports Achiever)" },
      ],
      description: "Celebrating athletic distinction and competitive excellence.",
    },
  ],
};

export const nationalAwards = [
  {
    id: "nat-1",
    recipient: "Nawazia",
    program: "MBBS",
    domain: "Sports",
    award: "National Award for Outstanding Performance in Sports",
    image: img(54),
    details: "Recognized at the national level for collegiate sports achievements and table tennis medals across MLRIT Nirbhaya, ARUDVEG (ICFAI), and ANASTOMOZ (Apollo IMS).",
  },
  {
    id: "nat-2",
    recipient: "Eekshitha Suvarna",
    program: "MBBS",
    domain: "Art & National Policy Debate",
    award: "National Award for Excellence in Art & Policy Debate",
    image: null,
    details: "Honored nationally for excellence in debate on National Policy & Health and distinguished fine art contributions.",
  },
  {
    id: "nat-3",
    recipient: "D. Rakshitha",
    program: "BPT",
    domain: "Sports",
    award: "National Award for Remarkable Achievement in Sports",
    image: null,
    details: "Conferred national award for athletic distinction, also recipient of the Ojaswi Award at Nari Shakti Puraskar.",
  },
];

export const studentAchievements = [
  {
    id: "stu-1",
    title: "Healthcare Referral Platform at KRITI Conference Hackathon",
    students: "Raeesah Ranaa, Juveriah Rasheed Seereen, Aishwarya",
    year: "3rd Year MBBS",
    event: "Kakatiya Medical College KRITI Hackathon",
    image: null as string | null,
    details: "Built an innovative web platform connecting Primary Healthcare workers directly with Tertiary Care hospitals to streamline referrals, earning top appreciation at KRITI.",
  },
  {
    id: "stu-2",
    title: "Mixed Connective Tissue Disease (MCTD) Case Presentation",
    students: "Juveriah Rasheed Seereen",
    year: "3rd Year MBBS",
    event: "KRITI Conference",
    image: null as string | null,
    details: "Presented an analytical poster detailing overlapping autoimmune manifestations and diagnostic challenges of Mixed Connective Tissue Disease.",
  },
  {
    id: "stu-3",
    title: "Gandhi Research Orientation Workshop (GROW) Presentations",
    students: "Isha Subhash Badhe & Khushboo Mandelia",
    year: "3rd Year MBBS",
    event: "Gandhi Medical College Research Conclave",
    image: null as string | null,
    details: "Isha presented on lifestyle factors in Recurrent Aphthous Stomatitis (260 participants). Khushboo presented on lifestyle and hormonal triggers in dysmenorrhoea.",
  },
  {
    id: "stu-4",
    title: "Clinical Case on Giardiasis & Active Euthanasia Debate Champion",
    students: "Raeesah Ranaa",
    year: "3rd Year MBBS",
    event: "Prathima IMS & Praana Conference",
    image: null as string | null,
    details: "Presented Giardiasis case at Prathima IMS and won 1st Place in the debate on 'Is Active Euthanasia Ethically Right?' at Praana Conference.",
  },
  {
    id: "stu-5",
    title: "National TB Quiz at ESI Medical College: Ranked 5th of 80 Colleges",
    students: "AIMS Medical Scholars Contingent",
    year: "MBBS",
    event: "ESI Medical College, Hyderabad",
    image: null as string | null,
    details: "Secured 5th rank among 80 participating medical colleges across the region, demonstrating academic excellence on a competitive national stage.",
  },
  {
    id: "stu-6",
    title: "KNRUHS Drug Control Day — Multi-Category Sweep",
    students: "Raeesah Ranaa, V. Snehith Pawar, Diya, Sudhasree, Eekshith, Shritika, Eekshitha",
    year: "3rd Year MBBS",
    event: "Drug Control and Regulatory Strengthening Competitions",
    image: img(52) as string | null,
    details: "Clinched 1st Place in Quiz, 1st Place in Arts (Eekshith), Winner in Elocution (Shritika), Runner-up in Elocution (Eekshitha), and distinctions in Essay Writing.",
  },
  {
    id: "stu-7",
    title: "Webinar on Research Proposal Writing by Student Researcher",
    students: "Raeesah Ranaa (Lead Speaker)",
    year: "3rd Year MBBS & ICMR STS Researcher",
    event: "AIMS Academic Webinar Series",
    image: img(29) as string | null,
    details: "In an inspiring student-led initiative, ICMR STS Researcher Raeesah Ranaa guided peer scholars on formulating rigorous medical research proposals.",
  },
];

export const academicToppers = {
  event: "TRISHNA 2K26 Annual Day Academic Toppers",
  quote: "Achievement is measured in the courage to persist, the will to excel, and the grace to inspire others.",
  toppers: [
    { name: "Jayanthika Raj", program: "III MBBS" },
    { name: "Nishitha", program: "III MBBS" },
    { name: "Harshashree", program: "II MBBS" },
    { name: "Keerthana", program: "BPT" },
    { name: "C. Rohith", program: "BPT" },
    { name: "Nandhani", program: "III Nursing" },
    { name: "Ganesh", program: "II Nursing" },
    { name: "Ruchitha", program: "II Nursing" },
    { name: "Aza Hussain", program: "II MLT" },
    { name: "Bala Mahesh", program: "II MLT" },
    { name: "Sana Firdos", program: "II MLT" },
  ],
  gallery: [img(39), img(40), img(41), img(42), img(43), img(44), img(45), img(46)],
};

export const sportsAccolades = {
  event: "Nirbhaya 2026 – Annual Sports Meet",
  venue: "MLRIT Auditorium & Grounds",
  highlights: "AIMS put up a stellar athletic performance, clinching 12 wins across track, field, and indoor sports.",
  images: [img(53), img(54), img(57, "png")],
  internalEvents: [
    { event: "Women's Shot Put", winner: "Ananya (3rd Year)", position: "1st Place" },
    { event: "Men's Shot Put", winner: "Murali Kartheek (3rd Year)", position: "2nd Place" },
    { event: "Men's 400 Metres Running", winner: "C. Sai Kumar (1st Year)", position: "3rd Place" },
    { event: "Women's Discus Throw", winner: "Prathyusha (3rd Year)", position: "1st Place" },
    { event: "Women's Chess", winner: "Neha (1st Year)", position: "1st Place" },
    { event: "Men's Chess", winner: "Kaushik (1st Year)", position: "2nd Place" },
    { event: "Men's Table Tennis Singles", winner: "Sucheth (1st Year)", position: "1st Place" },
    { event: "Men's Table Tennis Doubles", winner: "Mohith & Sucheth (3rd & 1st Year)", position: "1st Place" },
    { event: "Women's Table Tennis Singles", winner: "Nawazia (3rd Year)", position: "1st Place" },
    { event: "Women's Table Tennis Doubles", winner: "Nawazia & Isha (3rd Year)", position: "1st Place" },
  ],
  externalEvents: [
    { tournament: "ARUDVEG 2026, ICFAI Hyderabad", category: "Table Tennis — Singles", athlete: "Nawazia", result: "Silver Medal (Tournament Finalist)" },
    { tournament: "ANASTOMOZ 2025, Apollo IMS", category: "Table Tennis — Singles", athlete: "Nawazia", result: "Bronze Medal" },
    { tournament: "ANASTOMOZ 2K25, Apollo IMS", category: "Table Tennis — Doubles", athlete: "Nawazia & Bhavna", result: "Silver Medal" },
  ],
};

export const wings = [
  {
    id: "wing-scientific",
    name: "Scientific and Research Wing",
    motto: "Where curiosity becomes discovery.",
    description: "Spearheads research symposia, scientific conclaves, and health awareness campaigns including World Cancer Day contests and World Kidney Day outreach.",
    image: img(25),
    highlight: "World Cancer Day Quiz Champions: Haveela, Sanjana, Srena & Pavithra",
  },
  {
    id: "wing-literary",
    name: "Literary and Editorial Wing",
    motto: "Where thought finds its voice.",
    description: "Nurtures creative writing, debates, and oratory competitions across medical students.",
    image: img(30),
    highlight: "Cancer Day Slogan Writing: 1st Place Mohit (3rd Year), 2nd Place Poojitha (2nd Year)",
  },
  {
    id: "wing-cultural",
    name: "Cultural Wing",
    motto: "Where tradition meets celebration.",
    description: "Curates rich heritage celebrations, Traditional Day festivities at MLRIT Grounds, and performing arts.",
    image: img(34),
    highlight: "Traditional Day 2026: Mr. Fresher Gyana Keshava Rao A S & Ms. Fresher Megavath Nandini",
  },
  {
    id: "wing-fine-arts",
    name: "Fine Arts Wing",
    motto: "Where imagination takes form.",
    description: "Sanctuary for creative visual expression through drawing, painting, and exhibition installations.",
    image: img(47, "png"),
    highlight: "Drawing & Painting Exhibition: Eekshitha, N. Anjali, Mythri, D. Anil, Janaki, Sreenidhi",
  },
  {
    id: "wing-digital",
    name: "Digital and Media Wing",
    motto: "Where innovation speaks.",
    description: "Captures and amplifies institutional milestones through digital storytelling and photography exhibitions.",
    image: img(55, "png"),
    highlight: "Photography Competition: Pranay, Varun, Akil Naik, Stephin, Ashok, T. Akshitha",
  },
  {
    id: "wing-sports",
    name: "Sports Wing",
    motto: "Where character is forged.",
    description: "Fosters athleticism, discipline, and sportsmanship across collegiate and state sports arenas.",
    image: img(54),
    highlight: "12 Wins at Nirbhaya 2026 and multiple inter-college table tennis medals",
  },
];
