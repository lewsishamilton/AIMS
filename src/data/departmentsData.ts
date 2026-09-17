import type { Department } from "./types";

export const DEPARTMENT_METADATA: Record<
  string,
  Omit<Department, "id" | "facultyCount">
> = {
  "anatomy": {
    "name": "Anatomy",
    "category": "Pre-Clinical",
    "description": "Gross anatomy, osteology, microscopic anatomy, neuroanatomy, and embryology.",
    "bgImage": "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-blue-950/90 via-slate-900/80 to-blue-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The Department of Anatomy’s goal is to assist undergraduate students in being trained in areas such as gross anatomy, osteology, microscopic anatomy, developmental anatomy, surface anatomy, neuroanatomy, and radiographic anatomy. The major goal is to provide students and professors with up-to-date knowledge on the most recent breakthroughs in human anatomy to assist their learning and research pursuits, and thereby help the medical community as a whole.",
            "The available faculty, infrastructure, and equipment adhere to the guidelines set by N.M.C. and K.N.R.U.H.S. for facilitating undergraduate education."
          ],
          "layout": "full"
        },
        {
          "title": "Courses Offered",
          "badges": ["MBBS"],
          "content": "Undergraduate medical education adhering to NMC and KNRUHS guidelines.",
          "layout": "half"
        },
        {
          "title": "Research",
          "content": "The Research work of the department has been widely acclaimed, both at National & International level. At present three Research projects have been submitted for funding.",
          "layout": "half"
        },
        {
          "title": "Teaching & Learning Resources",
          "bullets": [
            "The departmental library has a collection of over 160+ books as well as two desktop computers that provide internet access.",
            "There is an adequate supply of cadavers to meet the requirements of both undergraduate teaching and research.",
            "Teaching resources such as OHP, LCD projectors, models, and charts are available to facilitate the teaching of gross, microscopic, and developmental anatomy."
          ],
          "layout": "full"
        },
        {
          "title": "Radiographs",
          "content": "As diagnostic and treatment methods have grown in significance, students are taught Radiological Anatomy in the course to familiarise them with imaging techniques. The X-ray library has meticulously compiled a series of crucial radiographs, CT scans, and MRI films that are discussed and demonstrated with the students.",
          "layout": "half"
        },
        {
          "title": "Museum",
          "content": "The Anatomy Museum offers a large selection of dry and wet specimens that were created under the supervision of successive departmental staff. Specimens include gross anatomy, neuroanatomy, embryology, X-ray lobbies with radiographs, genetic charts, skeletons, and individual bones. Specimens are displayed system-wide in the Museum. The Museum displays specimens in a systematic manner. For easy specimen referencing, catalogues are placed.",
          "layout": "half"
        },
        {
          "title": "Dissection Hall",
          "subtitle": "Dissection Hall is occupied with:",
          "bullets": [
            "Two – Body Injectors for embalming procedures",
            "Six – Cadaver Storage Tanks to store up to 20 cadavers",
            "A Cold Storage (mortuary chamber) with capacity for preserving up to 4 deceased bodies",
            "A power saw and a meat-cutting machine for sectioning the bones and soft tissues."
          ],
          "layout": "half"
        },
        {
          "title": "Histology Lab",
          "bullets": [
            "A binocular microscope that has an HD camera and LCD projector for demonstrating histology practical classes to both undergraduate and postgraduate students.",
            "Two rotary microtomes, one incubator, a hot water bath, a refrigerator, and staining materials, along with sufficient slide cabinets for preparing and staining histology slides.",
            "H&E and special staining slides are prepared for both UG and PG teaching.",
            "120 compound microscopes and five dissecting microscopes with trinocular microscopes for providing individual student demonstrations.",
            "There are Different kinds of Microtomes(Rotatory & Sliding), Incubator & Ovens."
          ],
          "layout": "half"
        }
      ]
    }
  },
  "physiology": {
    "name": "Physiology",
    "category": "Pre-Clinical",
    "description": "Cellular functions, cardiovascular hemodynamics, and organ systems physiology.",
    "bgImage": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-emerald-950/90 via-slate-900/80 to-teal-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of the department",
          "content": "Physiology is a branch of medicine that explores the nature of life and forms the foundation of medicine. The department offers a well-organised undergraduate programme consisting of lectures, tutorials, seminars, journal clubs, laboratory practicals, and demonstrations. Additionally, the faculty is motivated to pursue novel research projects and present their findings at conferences and in publications. In collaboration with clinical departments to provide integrated teaching and early clinical exposure, making the subject more engaging and enhancing students’ understanding of the pathological aspects of diseases.",
          "layout": "full"
        },
        {
          "title": "Facilities & Learning Sources Of The Department",
          "bullets": [
            "The departmental library has an e-library, which is provided with 500 books and two desktops with internet facilities.",
            "A didactic lecture gallery with audio-visual equipment facilities: The didactic lecture hall is well equipped with overhead projectors audio, video visual aids and adequate seating capacity of 200 students with well ventilation."
          ],
          "layout": "half"
        },
        {
          "title": "Demo Room",
          "content": "Well equipped with video , audio visual aids for small group teachings with adequate seating capacity of 75 students",
          "layout": "half"
        },
        {
          "title": "Haematology laboratory",
          "content": "Haematology laboratory provides a wide variety of basic and advanced haematological testing on blood serum, urine and other body fluids.",
          "bullets": [
            "Laboratory is well equipped with microscopes with occupancy of 75 students per session."
          ],
          "layout": "half"
        },
        {
          "title": "Clinical lab",
          "content": "Clinical labs are well equipped with latest instruments to carry out all clinical human experiments on the subject to enable the students to understand the normal functioning in healthy subjects and functional disturbances in diseased.",
          "bullets": [
            "Suitable physiological methods for the study of patients particular for diagnostics ,research and education of medical students.",
            "It forms a bridge between basic physiology and other clinical specialities for practise of modern medicine."
          ],
          "layout": "half"
        },
        {
          "title": "Human laboratory",
          "content": "Human Laboratory is designed to provide students with hands-on experience on modern teaching methods in human physiological analysis for a course based research approach.",
          "layout": "half"
        },
        {
          "title": "Skill Lab",
          "content": "Skill lab is specifically equipped practice rooms functioning as skill based training for practise of skills prior to real life application. Labs are equipped with mannequins related to development of skills necessary to examine and interpret issues of human physiology. It synthesises ideas to make connections between knowledge of anatomy , physiology and real world problems involving human health and medicine.",
          "layout": "half"
        }
      ]
    }
  },
  "biochemistry": {
    "name": "Biochemistry",
    "category": "Pre-Clinical",
    "description": "Clinical chemistry, molecular genetics, metabolic pathways, and central clinical laboratory.",
    "bgImage": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-indigo-950/90 via-slate-900/80 to-purple-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": "The Biochemistry Department ensures that students get a better understanding of the chemical processes and structures that underlie both health and illness, which is the foundation of fundamental medical sciences. The courses in biochemistry are taught by a highly qualified and experienced faculty. The department is categorised under laboratory medicine, specifically the central clinical laboratory, and also engages in research activities",
          "layout": "full"
        },
        {
          "title": "Courses",
          "badges": ["MBBS"],
          "content": "Undergraduate medical training adhering to the highest curriculum benchmarks set by NMC.",
          "layout": "half"
        },
        {
          "title": "Learning Resources",
          "bullets": [
            "Desktop with internet",
            "Laptop & OHP & LCD projector",
            "Charts, Models & Case studies",
            "Department library: 103 books including course, reference books, and Journals."
          ],
          "layout": "half"
        },
        {
          "title": "Clinical laboratory",
          "content": "The Clinical Biochemistry Laboratory is a wing of the hospital and is a well-equipped laboratory that provides services to patients in the outpatient, inpatient, and emergency departments. The laboratory offers routine biochemical investigations, hormone analysis, and other specialised parameters. The clinical laboratory is open round the clock (24/7) to provide emergency services. The laboratory services are under regular monitoring by the faculty members.",
          "layout": "full"
        },
        {
          "title": "Equipments in Clinical Lab",
          "bullets": [
            "Fully Automated Chemistry analyser",
            "Fully Automated Chemistry analyzer",
            "Fully Automated Hormone analyzer",
            "Semi auto analyser",
            "Blood Gas Analyser",
            "Electrolyte Analyser"
          ],
          "layout": "half"
        },
        {
          "title": "Equipments in research lab",
          "bullets": [
            "Semi automated analyzers",
            "ELISA Reader",
            "Colorimeter",
            "UV spectrophotometer",
            "Chromatography Unit",
            "Thin layer chromatography unit",
            "Electrophoresis Unit",
            "Flame Photometer",
            "pH meter",
            "Single pan electronic balance",
            "Hot air oven",
            "Incubators",
            "Magnetic stirrers"
          ],
          "layout": "half"
        }
      ]
    }
  },
  "pharmacology": {
    "name": "Pharmacology",
    "category": "Para-Clinical",
    "description": "Pharmacokinetics, therapeutics, clinical trials, and pharmacovigilance.",
    "bgImage": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-cyan-950/90 via-slate-900/80 to-blue-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": "Department of Pharmacology is a basic medical sciences specialty, deals with imparting knowledge and skills concerning with drug administration to health care professional medical students. Teaching & research opportunities are satisfactorily met with the availability of well-equipped air-conditioned lecture halls, demonstration rooms with high quality audio-visual aids, research & experimental lab. The faculty are involved in drug safety monitoring (pharmacovigilance committee).",
          "layout": "full"
        },
        {
          "title": "Courses offered",
          "badges": ["MBBS"],
          "content": "Undergraduate medical training imparting foundational and applied knowledge in drug administration, rational therapeutics, and safety.",
          "layout": "half"
        },
        {
          "title": "Core Competencies",
          "bullets": [
            "Experimental Pharmacology",
            "Clinical Pharmacology",
            "Pharmacoeconomics",
            "Pharmacovigilance",
            "Pharmacogenomics"
          ],
          "layout": "half"
        },
        {
          "title": "Facilities and learning sources",
          "subtitle": "Departmental Library & Audio-visual aids",
          "bullets": [
            "Library: Having 107 books including question banks & MCQ’s.",
            "Desktop computers with internet connection.",
            "One laptop & one printer.",
            "Overhead projectors & LCD monitor.",
            "CDs"
          ],
          "layout": "half"
        },
        {
          "title": "Museum",
          "bullets": [
            "History of medicine .",
            "Charts & flow charts .",
            "Different dosage forms.",
            "Drugs used in different disease conditions."
          ],
          "layout": "half"
        },
        {
          "title": "Research laboratory with animal house facility",
          "subtitle": "Well equipped with basic instruments for conducting research:",
          "bullets": [
            "Spectrophotometer, Analgesiometers, Electro-convulsometers",
            "Cooks pole climbing apparatus, metabolic cages, Digitalphotoactometer",
            "Incubator, Soxhlet apparatus, Dark light chamber apparatus",
            "Elevated plus maze, Digital PH meter, Centrifuge machines"
          ],
          "layout": "full"
        },
        {
          "title": "Pharmacy laboratory",
          "bullets": [
            "Facility to extract active principles of plant products.",
            "Chemical analysis of unknown substances.",
            "Preparing & dispensing various drug formulations."
          ],
          "layout": "half"
        },
        {
          "title": "Clinical pharmacology laboratory",
          "content": "Facility to carry out clinical research work and therapeutic evaluations.",
          "layout": "half"
        }
      ]
    }
  },
  "pathology": {
    "name": "Pathology",
    "category": "Para-Clinical",
    "description": "Histopathology, cytopathology, hematology, and clinical laboratory investigations.",
    "bgImage": "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-rose-950/90 via-slate-900/80 to-red-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The Department of Pathology is a vital entity; it serves as the backbone of medical education and patient care. It provides students with a comprehensive understanding of diseases through the study of pathological processes. Pathology courses and practical sessions equip students with the knowledge and skills necessary to accurately diagnose and manage various conditions.",
            "Additionally, the department supports clinical practice by conducting research, analysing specimens, and providing diagnostic services to aid in patient care. Its role extends beyond the classroom, contributing to advancements in medical science and ultimately improving healthcare outcomes."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["MBBS"],
          "content": "Comprehensive undergraduate pathology curriculum covering disease mechanisms, systemic pathology, and diagnostic interpretations.",
          "layout": "half"
        },
        {
          "title": "CORE COMPETENCIES",
          "content": "The core competencies of department of Pathology is teaching programme to prepare undergraduate students for their course. Formal teaching is conducted in a variety of settings. Full participation by residents is expected.",
          "bullets": [
            "At the end of sessions students should attain competencies in the cognitive knowledge of basic sciences applied to speciality courses.",
            "They should be experts in clinical and practical skills.",
            "Student should be able to attain knowledge about basic principles of research and to take up small time research projects."
          ],
          "layout": "half"
        },
        {
          "title": "FACILITIES AND LEARNING SOURCES OF THE DEPARTMENT",
          "bullets": [
            "Well equipped Histopathology lab",
            "Well equipped Hematology / Clinical Pathology lab",
            "Fully air conditioned lecture galleries",
            "Well equipped blood bank with component separation unit",
            "Departmental library is provided with 111 books",
            "Museum with extensive pathological gross specimens",
            "Internet facility",
            "Microphotography unit",
            "Slide library"
          ],
          "layout": "full"
        }
      ]
    }
  },
  "microbiology": {
    "name": "Microbiology",
    "category": "Para-Clinical",
    "description": "Bacteriology, virology, mycology, parasitology, and hospital infection control.",
    "bgImage": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-teal-950/90 via-slate-900/80 to-emerald-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The Department of Microbiology undertakes the teaching of undergraduate medical students in order to provide knowledge and skills in infectious diseases and immunology that are essential for the practice of medicine. The department is well equipped with different sections including Bacteriology, Mycobacteriology, Parasitology, Mycology, Serology and Virology labs.",
            "The infrastructure, Staff pattern, the different medical courses and diagnostic laboratories are established and run strictly as per the NMC regulations and Dr.KNRUHS stipulations. Museum with more than 100 exhibits, library with 138 books, computers, LCD Projectors, Binocular Microscopes etc are useful for UG students and faculty. Appropriate biosafety precautions are maintained in each working area for the laboratory staff."
          ],
          "layout": "full"
        },
        {
          "title": "Diagnostic Laboratory Sections",
          "subtitle": "Established and run strictly as per NMC regulations and Dr. KNRUHS stipulations:",
          "bullets": [
            "Bacteriology Laboratory",
            "Mycobacteriology Laboratory",
            "Parasitology Laboratory",
            "Mycology Laboratory",
            "Serology Laboratory",
            "Virology Laboratory"
          ],
          "layout": "half"
        },
        {
          "title": "Facilities & Learning Resources",
          "bullets": [
            "Museum with more than 100 exhibits useful for UG students and faculty.",
            "Departmental library with 138 books, course references, and journals.",
            "Computers and LCD Projectors for interactive didactic delivery.",
            "Binocular Microscopes for individual student practical sessions.",
            "Appropriate biosafety precautions maintained in each working area for laboratory staff."
          ],
          "layout": "half"
        },
        {
          "title": "Public Health & Hospital Infection Control",
          "content": "The department also contributes to public-private partnership in association with RNTCP where the diagnosis of tuberculosis and HIV are done free of cost. It also contributes to the infection control activities in the Hospital.",
          "badges": ["RNTCP Partnership", "Free Tuberculosis & HIV Diagnosis", "Hospital Infection Control"],
          "layout": "full"
        }
      ]
    }
  },
  "forensic-medicine": {
    "name": "Forensic Medicine",
    "category": "Para-Clinical",
    "description": "Medical jurisprudence, clinical forensic medicine, and toxicology investigations.",
    "bgImage": "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-slate-950/90 via-gray-900/80 to-zinc-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The Department of Forensic Medicine holds immense significance within a medical college, playing a critical role in the intersection of medicine and law. It is responsible for training future doctors in the principles and practices of forensic medicine, which involves the application of medical knowledge to legal matters.",
            "This department not only equips students with essential skills but also contributes to the administration of justice and the protection of public health. By providing education on topics such as post-mortem examination, medico-legal documentation, and the interpretation of injuries, the department prepares students to serve as expert witnesses, forensic consultants, and medical examiners."
          ],
          "layout": "full"
        },
        {
          "title": "Courses offered",
          "badges": ["MBBS"],
          "content": "Undergraduate curriculum covering medical jurisprudence, clinical forensics, autopsy techniques, and toxicology.",
          "layout": "half"
        },
        {
          "title": "Core Competencies",
          "subtitle": "Forensic Medicine is to train a doctor to become a competed Medico-legal expert with:",
          "bullets": [
            "An awareness of medico-legal aspects in various settings.",
            "An awareness of advances and developments in the field of forensic medicine and research methodology."
          ],
          "layout": "half"
        },
        {
          "title": "Facilities and learning sources of the department",
          "bullets": [
            "Library: Departmental library is provided with 108 books and two desktops with an internet facility.",
            "Research Laboratory: The Department of Forensic Medicine is well equipped with the instruments required for regular medico-legal work."
          ],
          "layout": "half"
        },
        {
          "title": "Museum",
          "content": "A pretty good collection of specimens are displayed in the department museum:",
          "bullets": [
            "Wet and dry specimens",
            "Forensic and skeletal models",
            "Photographs of injuries and medico-legal cases",
            "Toxicology and jurisprudence charts"
          ],
          "layout": "half"
        }
      ]
    }
  },
  "community-medicine": {
    "name": "Community Medicine",
    "category": "Para-Clinical",
    "description": "Epidemiology, public health administration, preventive healthcare, and biostatistics.",
    "bgImage": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-sky-950/90 via-slate-900/80 to-cyan-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The department has state-of-the-art facilities for training undergraduate students in Community Medicine. Assistance to central and state governments in implementation of various national health programs through monitoring and evaluation and providing assessment reports and constructive feedback. It has state-of-the-art facilities for training undergraduate students in Community Medicine. The department has been involved in the planning, implementation, monitoring and evaluation of health programs and activities in its vast field practice area.",
            "M.B.B.S students’ training in Community Medicine starts from 1st Year and continues till 4th Year. Medical students teaching and training includes Lectures, Small Group Discussions, Seminars, Clinico-social Case Discussions, Problem solving exercises, Field Visits and Laboratory work."
          ],
          "layout": "full"
        },
        {
          "title": "Courses Offered",
          "badges": ["MBBS Course"],
          "content": "Community oriented training given to MBBS students from 1st Year through 4th Year, followed by CRRI training.",
          "layout": "half"
        },
        {
          "title": "Core Competencies",
          "bullets": [
            "Epidemiology",
            "Health management",
            "Health education",
            "Primary Health Care",
            "Monitoring and evaluation of health program",
            "Biostatistics",
            "Disease prevention and control strategies.",
            "Community Health Research"
          ],
          "layout": "half"
        },
        {
          "title": "Community Oriented Training",
          "subtitle": "Students are taken to field practice areas and are exposed to local health problems with observational and participatory instruction:",
          "bullets": [
            "Nutrition, Socio-demographic & morbidity surveys",
            "Family health advisory services, home visits",
            "Reproductive & Child health care",
            "Outreach activities (Health Awareness Programmes)",
            "Specialist clinics are conducted every week on Thursdays",
            "Clinico – social case studies are conducted on cases from OPD as well as from wards.",
            "The students are exposed to various important institutions / organizations of Public Health importance.",
            "At the end of the programme, students present observations on their visits / Clinico-Social cases discussed objectively with all staff members.",
            "Short assessment test is conducted on the penultimate day of each posting with adequate feedback given to students."
          ],
          "layout": "full"
        },
        {
          "title": "Compulsory Rotating Internship (CRRI)",
          "subtitle": "After successful completion of final year, MBBS students are posted for 2 months in batches of 21–24 students to PHCs, UHCs, and other Public Health Institutions:",
          "bullets": [
            "Training in clinical diagnosis & management of common diseases in Rural settings.",
            "Exposure & hands-on experience in District Health Care system.",
            "Management training through assistance to the concerned Medical Officer.",
            "Training in Journal club presentations, seminars and recent advances in health care.",
            "Doctor-patient relationship – emphasis on care & compassion especially for the socially disadvantaged (Non scholastic ability)."
          ],
          "layout": "half"
        },
        {
          "title": "Departmental Library",
          "bullets": [
            "Departmental library is provided with more than 108 books.",
            "Two desktops with an internet facility for student research and epidemiological data analysis."
          ],
          "layout": "half"
        }
      ]
    }
  },
  "general-medicine": {
    "name": "General Medicine",
    "category": "Clinical",
    "description": "Comprehensive adult patient care, critical care, infectious disease, and acute medicine.",
    "bgImage": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-blue-950/90 via-slate-900/80 to-indigo-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "Medicine is an essential department in the health care system. The Department of General Medicine provides primary, secondary, and tertiary treatment. This is an integration center for patient management, undergraduate teaching and academic research.",
            "Department provides better care to patients in outpatient and inpatient department daily along with 24 hours casualty and critical care services in the ICUs."
          ],
          "layout": "full"
        },
        {
          "title": "Courses Offered",
          "badges": ["MBBS"],
          "content": "Comprehensive undergraduate clinical curriculum spanning internal medicine, clinical diagnostics, critical care, and emergency stabilization.",
          "layout": "half"
        },
        {
          "title": "Community Health Services",
          "bullets": [
            "Regular rural health camps",
            "School health camps",
            "Adoption of 15 villages for holistic community health care",
            "Detection and Medical advice of MALNUTRITION, Fluorosis in the area."
          ],
          "layout": "half"
        },
        {
          "title": "Clinical Services",
          "subtitle": "Comprehensive outpatient, diagnostic, and inpatient facilities:",
          "bullets": [
            "Free OPD care with free registration & free consultation in OPD.",
            "Free investigation, X-Rays and USG’s.",
            "Evaluation of the routine problem, malnutrition status and relevant preventive aspects.",
            "Even free medications, free specialty consultations.",
            "Inpatient care is also free, including free bed & diet.",
            "Free CT Scans, MRI, 2D Echo for academic cases.",
            "Assessment and reassessment of the inpatients in morning & evening by consultants regularly.",
            "Multi disciplinary assessments by cross references as and when required."
          ],
          "layout": "full"
        },
        {
          "title": "Emergency & Mega Critical Care Complex",
          "subtitle": "Round-the-clock emergency and intensive care services:",
          "bullets": [
            "25 beds, fully equipped casualty.",
            "Mega critical care complex with complete ultramodern MICU, RICU, NICU, ICCU, AMC & a dialysis unit comprising 32 beds in total.",
            "All ICUs with central oxygen & suction, ventilators, cardiac monitors, pulse oxymeters, defibrillators, syringe pumps, blood gas analyzer, mobile X-Ray unit.",
            "Protocols displayed for all common emergencies in ICUs."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "paediatrics": {
    "name": "Paediatrics",
    "category": "Clinical",
    "description": "Neonatology, child health, pediatric intensive care, and immunization programs.",
    "bgImage": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-amber-950/90 via-slate-900/80 to-orange-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "Department of Pediatrics caters the needs of primary, secondary and tertiary care to the people of Hyderabad and surrounding districts.",
            "Department provides better care to patients in out patients and In patients department daily along with 24 hours causality and critical care services in ICU."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["MBBS"],
          "content": "Comprehensive undergraduate pediatric training covering neonatal care, developmental milestones, childhood diseases, and pediatric emergencies.",
          "layout": "half"
        },
        {
          "title": "Community health services",
          "bullets": [
            "School health camps.",
            "Regular Rural health camps.",
            "Detection and Medical advice of MALNUTRITION among children in both urban & rural areas.",
            "We conduct awareness about oral hydration , Breasting feeding promotions among both urban and Rural parents."
          ],
          "layout": "half"
        },
        {
          "title": "Clinical Services",
          "subtitle": "24/7 dedicated pediatric clinical and intensive care:",
          "bullets": [
            "Free OPD care with free registration & free consultation in OPD.",
            "We provide all kinds of vaccinations as per immunization schedule.",
            "Multi disciplinary assessments by cross references as and when required.",
            "Emergency care admitting and treating all kinds of poisons cases.",
            "Medical PICU with beds and NICU beds, both ICU have central oxygen, Ventilators, Bubble CPAP, HFNCs and Cardiac monitors.",
            "Advanced phototherapy with LED lights , Exchange transfusions (Both total and partial).",
            "Protocols displayed for all common emergencies in both PICU & NICU."
          ],
          "layout": "full"
        },
        {
          "title": "FACILITIES & LEARNING SOURCES OF THE DEPARTMENT",
          "bullets": [
            "E-learning classes to all under graduates.",
            "Encourage students to actively participate in both state and national level activities academically.",
            "Equipped with skilled lab for under graduates, They are given hands on training skills.",
            "Intensive Teaching schedule on all working days for Under Graduates.",
            "Clinical postings done regularly with ward leaving examinations to under graduates.",
            "We update ourselves regular approaches and treatment methods by from of journal club.",
            "Departmental library is provided with various journals and recent books- 176."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "dermatology": {
    "name": "Dermatology",
    "category": "Clinical",
    "description": "Clinical dermatology, dermatosurgery, venereology, and leprosy care.",
    "bgImage": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-violet-950/90 via-slate-900/80 to-fuchsia-900/70",
    "details": {
      "sections": [
        {
          "title": "General Information & Overview",
          "content": [
            "Dermatology is the branch of medicine that deals with hair, nails, skin and its diseases. It is a specialty with both medical and surgical aspects. A dermatologist treats diseases, in the widest sense, and addresses cosmetic problems of the skin, scalp, hair, and nails. The department also incorporates venereology (the branch of medicine for sexually transmitted diseases and AIDS).",
            "As a subject, dermatology represents clinical, pathological and surgical perspectives. The training involves students learning the basics of diagnosing skin problems, their clinical aspects, and ways to manage and treat them. Apart from real-time observation, students have access to audio-visual facilities through which they can observe procedures being performed. Residents are also introduced to cosmetic dermatology and minor surgical procedures."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["MBBS"],
          "content": "Clinical undergraduate training in common cutaneous disorders, STDs, leprosy, dermatosurgery, and phototherapy.",
          "layout": "half"
        },
        {
          "title": "Clinical Services",
          "bullets": [
            "Free OPD care with free registration & free consultation in OPD.",
            "Inpatient care also free with free bed.",
            "Multi disciplinary assessments by cross references as and when required.",
            "Advanced phototherapy with LED lights.",
            "Lasers, phototherapy units, high-end microscopes, and minor surgical procedures."
          ],
          "layout": "half"
        },
        {
          "title": "FACILITIES & LEARNING SOURCES OF THE DEPARTMENT",
          "bullets": [
            "E-learning classes to all under graduates and post graduates.",
            "Encourage students to actively participate in both state and national level activities academically and non-academically.",
            "Equipped with skilled lab where under graduates are given hands on training skills.",
            "Intensive Teaching schedule on all working days for Under Graduates.",
            "Clinical postings done regularly with ward leaving examinations to under graduates.",
            "We update ourselves regular approaches and treatment methods from journal club.",
            "Departmental library is provided with various journals and recent books- 98."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "psychiatry": {
    "name": "Psychiatry",
    "category": "Clinical",
    "description": "Behavioral health, psychiatric assessment, clinical psychology, and de-addiction.",
    "bgImage": "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-indigo-950/90 via-slate-900/80 to-purple-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The department of Psychiatry provides a Comprehensive, Integrated, multi-disciplinary service in the management of patients with Psychological & Psychiatric disorders.",
            "The department focuses on empathetic care to patients and family members, societal integration, community service, orientation to research methodology, and training Under Graduates with basic skills in Psychiatry and scientific foundations in behavioral science across Hyderabad and surrounding districts."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED & Special Clinics",
          "badges": ["MBBS"],
          "subtitle": "Special Clinics:",
          "bullets": [
            "Child guidance clinic",
            "Adolescence guidance",
            "De-addiction clinic",
            "Geriatric and community psychiatry"
          ],
          "layout": "half"
        },
        {
          "title": "Clinical & Community Services",
          "bullets": [
            "Free OPD care with free registration & free consultation in OPD.",
            "Multi disciplinary assessments by cross references as and when required.",
            "Emergency care.",
            "School mental health camps.",
            "Regular Rural mental health camps."
          ],
          "layout": "half"
        },
        {
          "title": "FACILITIES & LEARNING SOURCES OF THE DEPARTMENT",
          "bullets": [
            "Consultation cum examination rooms with provision for Special clinics.",
            "Psychometric facilities & Anesthesia assisted ECT.",
            "Seminar hall with aids like LCD projector & laptop, demo models and charts for counseling.",
            "IPD: Closed ward facility for aggressive patients and de-addiction centre.",
            "Equipped with skilled lab where students receive hands-on training skills.",
            "Intensive teaching schedule, clinical postings, and ward-leaving examinations.",
            "Departmental library with a collection of 139 books and various journals."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "general-surgery": {
    "name": "General Surgery",
    "category": "Clinical",
    "description": "Advanced minimally invasive laparoscopic surgery, surgical oncology, and trauma care.",
    "bgImage": "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-slate-950/90 via-blue-950/80 to-cyan-900/70",
    "details": {
      "sections": [
        {
          "title": "General Information & Overview",
          "content": [
            "Surgery is a medical speciality that uses operative manual and instrumental techniques to investigate and/or treat a pathological condition such as a disease or an injury, to help improve bodily function or appearance. Pre-operative and post-operative care comes together at the Department of General Surgery.",
            "The department handles all major emergencies and planned surgical procedures including surgeries related to the pancreas, the liver and the bile duct. UGs learn the subject through a combination of theory and practicals. A special highlight is the experience they earn through Operation Theatre procedures, wherein they are allowed to observe surgical procedures in an audio-visual room. UGs are also taught basic surgical skills like suturing, knotting, venous cut down, catheterization, etc."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["M.B.B.S. (150 students in each batch)"],
          "content": "Undergraduate surgical education nurturing an intellectually motivated environment to cultivate a quest for knowledge and passion for surgery.",
          "layout": "half"
        },
        {
          "title": "CORE COMPETENCIES",
          "bullets": [
            "Patient Care – compassionate, appropriate, and effective for the treatment of health problems.",
            "Critical evaluation and demonstration of pertinent scientific surgical information.",
            "Practice-Based Learning and Improvement involving assimilation of scientific evidence.",
            "Interpersonal and Communication Skills resulting in effective information exchange.",
            "Professionalism and strict adherence to ethical principles.",
            "Systems-Based Practice demonstrating the role of different specialists in patient management."
          ],
          "layout": "half"
        },
        {
          "title": "FACILITIES & LEARNING SOURCES OF THE DEPARTMENT",
          "bullets": [
            "Two clinical demonstration rooms for undergraduate students with seating capacity of fifty students in each room.",
            "Department office, library, chambers for faculty, and central conference room with broadband, LCD projectors, and laptops.",
            "Well equipped Skills lab for training undergraduate students with anatomical models, mannequins, laparoscopic Endo trainer, and suturing models.",
            "Well-established museum with requisite pathological specimens, collection of x-rays, and instruments.",
            "Four fully equipped & air-conditioned operation theatres with ventilators, Bi/Unipolar & spray diathermy, C-arm imaging, laparoscopes, defibrillator, and endoscopes.",
            "All diagnostic and therapeutic laparoscopies performed by surgeons, enhanced by Urology and Neurosurgery super specialties."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "orthopaedics": {
    "name": "Orthopaedics",
    "category": "Clinical",
    "description": "Trauma surgery, joint replacements, arthroscopy, spine care, and sports medicine.",
    "bgImage": "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-cyan-950/90 via-slate-900/80 to-sky-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The Orthopaedics department provides a wide range of treatment. The department of orthopedics consists of highly qualified faculty in providing state of the art orthopedic care at the teaching hospital in the form of routine orthopedic work like, joint replacements, arthroscopy & complex spine problems.",
            "Orthopedics is a branch of medicine that focuses on the care of the musculoskeletal system, as well as the diagnosis and treatment of concerned conditions. This system consists of muscles, bones, joints, ligaments, and tendons."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["MBBS"],
          "content": "Undergraduate curriculum encompassing trauma stabilization, fracture reductions, cast applications, and reconstructive orthopedics.",
          "layout": "half"
        },
        {
          "title": "Core Competencies",
          "bullets": [
            "Complex trauma",
            "Joint replacement",
            "Arthroscopy & Sports Medicine",
            "Spine Surgery",
            "Paediatric Orthopaedics",
            "Hand, wrist, elbow and micro surgery",
            "Bone tumor surgery",
            "Microvascular surgery"
          ],
          "layout": "half"
        },
        {
          "title": "Clinical Services",
          "subtitle": "Specialised outpatient and operative care:",
          "bullets": [
            "Pediatric Orthopaedics Clinic",
            "Reconstructive Orthopaedics",
            "Arthroscopy & Sports injuries",
            "Joint replacement",
            "Neck and spine clinic",
            "Pain Relief Clinic",
            "Physiotherapy & Rehabilitation",
            "C.T.E.V Clinic",
            "Bone Tumor Clinic"
          ],
          "layout": "full"
        }
      ]
    }
  },
  "ent": {
    "name": "ENT / Otorhinolaryngology",
    "category": "Clinical",
    "description": "Otology, rhinology, head & neck surgery, audiology, and endoscopic sinus procedures.",
    "bgImage": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-emerald-950/90 via-slate-900/80 to-teal-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "Otorhinolaryngology is a surgical subspeciality that deals with the surgical and medical management of conditions of the head and neck.",
            "The department of ENT (Otorhinolaryngology) deals with the diagnosis and treatment of diseases of the ear, nose, throat, head, and neck."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["UG courses – MBBS"],
          "content": "Clinical examination skills of ear, nose, and throat, tuning fork tests, indirect laryngoscopy, and diagnostic endoscopy.",
          "layout": "half"
        },
        {
          "title": "AUDIOLOGY AND SPEECH THERAPY CLINIC",
          "bullets": [
            "Separate audiology and speech therapy clinic running on OPD days.",
            "Audiological examination is done and patients needing speech therapy are treated by trained audiologist & speech therapist.",
            "Equipment for micro ear and microlaryngeal surgery, FESS surgery and esophagoscopy are available."
          ],
          "layout": "half"
        },
        {
          "title": "Academic facilities",
          "bullets": [
            "Department library with 130 books.",
            "Journals available in central library.",
            "Temporal bone lab for dissection training.",
            "AC seminar hall with A.V aids.",
            "Laptop & desktop with internet."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "ophthalmology": {
    "name": "Ophthalmology",
    "category": "Clinical",
    "description": "Cataract surgery, glaucoma, retina diagnostics, corneal care, and refractive procedures.",
    "bgImage": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-blue-950/90 via-sky-900/80 to-indigo-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": "Department of Ophthalmology provides comprehensive program for patient care. It offers both out- patient services and in-patient services. It strives for achieving excellence in the fields of patient and community eye care, teaching, research and faculty development.",
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED & OBJECTIVES",
          "badges": ["MBBS"],
          "bullets": [
            "To offer an excellent standard in teaching.",
            "To conduct research in basic, applied clinical fields and community ophthalmology.",
            "To provide accessible, cost-effective, quality eye care.",
            "To conduct awareness programmes on issues such as Diabetic retinopathy, glaucoma, eye donation."
          ],
          "layout": "half"
        },
        {
          "title": "CORE COMPETENCIES",
          "bullets": [
            "UG teaching program for MBBS curriculum.",
            "Clinical facilities include services to manage cataract, retinal diseases, glaucoma and uvea services.",
            "Community services like screening of diabetic retinopathy, cataract in camps, and school screening programmes."
          ],
          "layout": "half"
        },
        {
          "title": "FACILITIES AND LEARNING SOURCES OF DEPARTMENT",
          "subtitle": "State-of-the-art diagnostic and surgical equipment:",
          "bullets": [
            "Slit lamps, Binocular Indirect Ophthalmoscope, 90 D Lens & Goniolens",
            "Fundus Camera, Keratometer, Autorefractor & Automated Perimeter",
            "Operating Microscope with CCTV",
            "Phacoemulsification Machine & A-Scan",
            "Argon Laser & Nd:YAG Laser",
            "Applanation Tonometer & Schiotz Tonometer"
          ],
          "layout": "half"
        },
        {
          "title": "Surgical & Laser Treatments",
          "subtitle": "Advanced ophthalmic interventions:",
          "bullets": [
            "Phacoemulsification Cataract Surgery",
            "Small Incision Cataract Surgery ( SICS)",
            "Trabeculectomy",
            "DCT, DCR",
            "Pterygium Excision with Autograft",
            "Laser Treatment: Nd: YAG Laser Capsulotomy"
          ],
          "layout": "half"
        }
      ]
    }
  },
  "obstetrics-gynaecology": {
    "name": "Obstetrics & Gynaecology",
    "category": "Clinical",
    "description": "Maternal-fetal medicine, high-risk obstetrics, gynaecologic endoscopy, and reproductive health.",
    "bgImage": "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-pink-950/90 via-slate-900/80 to-rose-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "The Department of Obstetrics and Gynaecology is a multi- specialty department providing high quality patient care in the areas of antenatal care, postnatal welfare and infertility. The department brings first-hand clinical services with an updated academic curriculum and advanced level of research.",
            "The vision is to establish a centre of excellence for the reproductive health needs of women, train the next generation and be involved in expanding research."
          ],
          "layout": "full"
        },
        {
          "title": "Academics & Courses Offered",
          "badges": ["MBBS"],
          "content": "Our educational endeavors include teaching undergraduate medical students during their clinical rotation for MBBS. A well-structured curriculum for the undergraduate programs balances the strengths of sub-specialization and general practice.",
          "layout": "half"
        },
        {
          "title": "Core Competencies",
          "bullets": [
            "Infertility management",
            "High risk Pregnancy",
            "Gynaecologic surgeries",
            "Colposcopy clinic",
            "High risk pregnancy clinic",
            "Endoscopy",
            "Community care"
          ],
          "layout": "half"
        },
        {
          "title": "Clinical Services",
          "bullets": [
            "Complete obstetrical care and management of high risk pregnancies.",
            "Comprehensive family welfare and infertility management.",
            "Endoscopic surgery, menopause management, and reconstructive surgery.",
            "Community services: campaign for anemia prevention, pulse polio, save the girl child, adolescent, cancer screening and school health throughout the year."
          ],
          "layout": "half"
        },
        {
          "title": "Labs & Facilities",
          "bullets": [
            "Supported by good infrastructure for research and clinical experience.",
            "Departmental and central libraries with excellent resources for reference and study.",
            "Teaching in hospitals giving students hands-on clinical learning."
          ],
          "layout": "half"
        }
      ]
    }
  },
  "anaesthesiology": {
    "name": "Anaesthesiology",
    "category": "Clinical",
    "description": "Perioperative anesthesia care, critical care resuscitation, and acute/chronic pain medicine.",
    "bgImage": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-teal-950/90 via-slate-900/80 to-cyan-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": "Anesthesiology, or anaesthesia, is the medical specialty concerned with the total perioperative care of patients before, during and after surgery. It encompasses anesthesia, intensive care medicine, critical emergency medicine, and pain medicine.",
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["MBBS"],
          "content": "Undergraduate instruction in basic life support, resuscitation, perioperative monitoring, and general/regional anesthesia principles.",
          "layout": "half"
        },
        {
          "title": "CORE COMPETENCIES",
          "bullets": [
            "Social commitment",
            "Intensive care unit",
            "Palliative care unit",
            "Academics",
            "CSSD Maintenance",
            "Painless labour",
            "PAC clinics",
            "Multispecialty surgeries"
          ],
          "layout": "half"
        },
        {
          "title": "FACILITIES & LEARNING SOURCES OF THE DEPARTMENT",
          "bullets": [
            "Departmental Library – 70 books.",
            "Central Library (Journals).",
            "Desktop with broadband internet facility.",
            "State-of-the-art anesthesia workstations and hemodynamic monitoring in all operation suites."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "radiology": {
    "name": "Radiology",
    "category": "Clinical",
    "description": "Diagnostic ultrasound, computed tomography (CT), MRI neuroimaging, and interventional radiology.",
    "bgImage": "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-slate-950/90 via-blue-950/80 to-violet-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": [
            "Comprehensive diagnostic studies with upto date latest techniques and advanced technology under supervision of experienced and dedicated faculty with deep knowledge. This Department gives 24X7 services and caters all clinical departments of our Institute.",
            "The advanced Imaging modalities include latest MRI, Multislice CT, recently purchased Image Intensifier and colour Doppler Machines, routine X-ray and Special Investigations, exclusive Mammography and Sono-Mammography for detection of Breast cancers and transrectal probe to detect prostatic benign and malignant diseases etc."
          ],
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["MBBS"],
          "content": "Undergraduate training in diagnostic imaging interpretation, chest radiographs, contrast procedures, ultrasound, and cross-sectional imaging.",
          "layout": "half"
        },
        {
          "title": "24X7 Diagnostic Services",
          "content": "Round-the-clock emergency imaging coverage catering to all emergency, inpatient, ICU, and trauma departments of the institute.",
          "layout": "half"
        },
        {
          "title": "Advanced Imaging Modalities & Equipment",
          "bullets": [
            "Latest high-field MRI scanner",
            "Multislice CT scanner for whole-body imaging and angiography",
            "Image Intensifier and digital fluoroscopy units",
            "High-end Colour Doppler machines",
            "Routine digital X-ray and specialized contrast investigations",
            "Exclusive Mammography and Sono-Mammography for detection of breast cancers",
            "Transrectal probe to detect prostatic benign and malignant diseases"
          ],
          "layout": "full"
        }
      ]
    }
  },
  "respiratory-medicine": {
    "name": "Respiratory Medicine",
    "category": "Clinical",
    "description": "Pulmonology, asthma & COPD management, bronchoscopy, and sleep medicine.",
    "bgImage": "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-sky-950/90 via-slate-900/80 to-blue-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": "Respiratory Medicine is medical speciality that deals with Respiratory and Sleep disorders which is constantly evolving day by day. Interventional pulmonology, critical care and sleep medicine has further increased its scope in the present day. Interventional pulmonology is a relatively new field within pulmonary medicine that deals with the use of procedures such as bronchoscopy and thoracoscopy to treat several pulmonary and pleural diseases.",
          "layout": "full"
        },
        {
          "title": "Courses offered",
          "badges": ["MBBS"],
          "content": "Undergraduate curriculum covering pulmonary physiology, airway diseases, tuberculosis, critical respiratory failure, and sleep medicine.",
          "layout": "half"
        },
        {
          "title": "Core competencies",
          "bullets": [
            "Department caters to the tertiary medical care needs of the Hyderabad and surrounding districts.",
            "Tuberculosis clinic – DOTS centre with DMC takes care of the NTEP of the entire district and drugs are provided free at the door steps.",
            "Allergy and Asthma clinic with Allergy skin tests, spirometry and patient education material provided free of cost.",
            "Smoking cessation clinic through counselling and de addiction protocols.",
            "H1N1/COVID -19 awareness programmes for doctors and general population.",
            "Diagnostic bronchoscopy & Medical thoracoscopy for pleural disorders.",
            "Polysomnography [sleep study] with titrations studies for patients with OSA and other sleep related disorders."
          ],
          "layout": "half"
        },
        {
          "title": "Equipment and Facilities",
          "bullets": [
            "Free OPD and Inpatient facilities.",
            "Well-equipped RICU with Invasive and Non Invasive ventilators.",
            "Video assisted bronchoscopy.",
            "Polysomnography[Sleep study] with titration study.",
            "Pulmonary function lab.",
            "Allergy skin testing kit.",
            "USG/CT guided lung biopsy."
          ],
          "layout": "half"
        },
        {
          "title": "Out Reach Programmes",
          "subtitle": "Medical services are made available to the poor and needy people of the community:",
          "bullets": [
            "Conducting free asthma and COPD camps with free PFTs and patient awareness programmes.",
            "Conducting awareness programmes on harmful effects of smoking & Smoking Cessation Clinics.",
            "Counselling and creating awareness among school children about TB, HIV, Smoking, Asthma, COVID -19 etc."
          ],
          "layout": "half"
        },
        {
          "title": "Learning resources & Departmental Library",
          "bullets": [
            "Desktop with internet connection, laptop, OHP & LCD Projectors.",
            "Departmental library has 100 books.",
            "3 International Journals subscribed besides Indian journals.",
            "Question bank / previous years questions / Objective type of questions."
          ],
          "layout": "full"
        }
      ]
    }
  },
  "dentistry": {
    "name": "Dentistry",
    "category": "Clinical",
    "description": "Oral & maxillofacial care, restorative dentistry, orthodontic diagnosis, and periodontal therapy.",
    "bgImage": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop",
    "gradient": "from-cyan-950/90 via-slate-900/80 to-emerald-900/70",
    "details": {
      "sections": [
        {
          "title": "Overview of Department",
          "content": "Dentistry is the branch of medicine focused on the teeth, gums, and mouth. The department of dentistry deals with the study, diagnosis, prevention, management, and treatment of diseases, disorders, and conditions of the mouth and maxillofacial region, most commonly focused on dentition as well as the oral mucosa.",
          "layout": "full"
        },
        {
          "title": "COURSES OFFERED",
          "badges": ["MBBS"],
          "content": "Undergraduate orientation covering oral pathology, odontogenic infections, dental emergency trauma management, and systemic-oral health connections.",
          "layout": "half"
        },
        {
          "title": "Clinical Services & Specialties",
          "bullets": [
            "Routine dental consultation, prophylaxis, and oral hygiene education.",
            "Restorative dentistry and endodontic treatments.",
            "Dental extractions and minor oral surgical procedures.",
            "Periodontal care and screening for oral mucosal lesions.",
            "Maxillofacial trauma evaluation and multidisciplinary cross-consultations."
          ],
          "layout": "half"
        },
        {
          "title": "Clinical Infrastructure",
          "bullets": [
            "Modern dental operatory equipped with motorized dental chairs and intraoral illumination.",
            "Digital dental radiography (RVG) for high-precision diagnostic imaging.",
            "Strict sterilization, ultrasonic scaling, and infection control protocols.",
            "Bedside dental consultation support for inpatient and ICU departments."
          ],
          "layout": "full"
        }
      ]
    }
  }
};
