/**
 * "Advances in <speciality>" for each detailed PG programme page.
 *
 * `atAims: true` only where the AIMS site already states the hospital has the facility or service
 * (department pages, PG programme data). Everything else is marked as an emerging practice in the
 * speciality — what residents learn about through the curriculum, journal clubs and CMEs — and is
 * never presented as available at AIMS.
 */

export type AdvanceIcon =
  | "heart"
  | "scope"
  | "droplets"
  | "ai"
  | "laser"
  | "light"
  | "scan"
  | "dna"
  | "scissors"
  | "timer"
  | "robot"
  | "bone"
  | "print"
  | "baby"
  | "pulse"
  | "eye"
  | "wave"
  | "syringe"
  | "gauge"
  | "microscope"
  | "tube"
  | "monitor";

export interface Advance {
  title: string;
  text: string;
  icon: AdvanceIcon;
  atAims?: boolean;
}

export const PG_ADVANCES: Record<string, { speciality: string; items: Advance[] }> = {
  "md-general-medicine": {
    speciality: "General Medicine",
    items: [
      { icon: "heart", atAims: true, title: "Cardiac Catheterisation Lab", text: "A full-fledged cath lab in the same hospital, so residents see coronary angiography and interventions as part of managing heart disease." },
      { icon: "scope", atAims: true, title: "High-End Endoscopy", text: "Diagnostic and therapeutic endoscopy with the Gastroenterology team, from upper-GI bleeds to liver disease." },
      { icon: "droplets", atAims: true, title: "Dialysis Unit", text: "Haemodialysis with the Nephrology team, for acute kidney injury and chronic kidney disease." },
      { icon: "ai", title: "Point-of-Care Ultrasound and AI", text: "Bedside ultrasound and AI-assisted ECG and imaging reading are changing how physicians diagnose — covered through journal clubs and CMEs." },
    ],
  },
  "md-dermatology": {
    speciality: "Dermatology",
    items: [
      { icon: "laser", atAims: true, title: "Laser Therapy", text: "Lasers for pigmentation, scars, vascular lesions and hair conditions, with hands-on training under supervision." },
      { icon: "light", atAims: true, title: "Advanced LED Phototherapy", text: "Phototherapy units for psoriasis, vitiligo and eczema, including advanced LED light therapy." },
      { icon: "scan", title: "Dermoscopy and AI Skin Imaging", text: "Dermoscopy, teledermatology and AI-assisted lesion analysis are transforming early detection of skin cancer." },
      { icon: "dna", title: "Biologics and Targeted Therapy", text: "Biologic and small-molecule drugs now control severe psoriasis, eczema and hair loss once considered hard to treat." },
    ],
  },
  "ms-general-surgery": {
    speciality: "General Surgery",
    items: [
      { icon: "scissors", atAims: true, title: "Minimally Invasive Laparoscopic Unit", text: "Keyhole surgery with smaller incisions, less pain and faster recovery — a core skill residents build at AIMS." },
      { icon: "monitor", atAims: true, title: "11 Modular Operation Theatres", text: "Modern, infection-controlled theatres with integrated equipment for open and laparoscopic surgery." },
      { icon: "timer", atAims: true, title: "Rapid-Recovery Protocols", text: "Enhanced-recovery care before and after surgery helps patients eat, walk and go home sooner." },
      { icon: "robot", title: "Robotic and 3D/4K Surgery", text: "Robotic platforms and 3D/4K laparoscopy are extending minimally invasive surgery to more complex operations." },
    ],
  },
  "ms-orthopedics": {
    speciality: "Orthopaedics",
    items: [
      { icon: "bone", atAims: true, title: "Joint Replacement", text: "Hip and knee replacement with pre-operative planning and structured rehabilitation." },
      { icon: "pulse", atAims: true, title: "Spine and Trauma Care", text: "Complex trauma and spine cases managed with the Neurosurgery and Faciomaxillary Surgery teams." },
      { icon: "robot", title: "Navigation and Robotic Arthroplasty", text: "Computer navigation and robotic-arm systems help place implants with millimetre accuracy." },
      { icon: "print", title: "3D Printing and Arthroscopy", text: "3D-printed models and patient-specific guides, and keyhole arthroscopy for sports injuries, are reshaping orthopaedic practice." },
    ],
  },
  "md-paediatrics": {
    speciality: "Paediatrics",
    items: [
      { icon: "baby", atAims: true, title: "Neonatal Intensive Care Unit", text: "Care for premature and sick newborns, with residents trained in newborn resuscitation and neonatal critical care." },
      { icon: "heart", atAims: true, title: "Paediatric Intensive Care Unit", text: "Critical care for seriously ill children, with graded responsibility for residents." },
      { icon: "wave", title: "Non-Invasive Ventilation", text: "Gentler breathing support for newborns and children is reducing the need for invasive ventilation." },
      { icon: "dna", title: "Genomics and Newborn Screening", text: "Genetic testing and expanded newborn screening now diagnose rare diseases early, when treatment works best." },
    ],
  },
  "ms-ophthalmology": {
    speciality: "Ophthalmology",
    items: [
      { icon: "eye", atAims: true, title: "Phacoemulsification", text: "Small-incision cataract surgery using ultrasound, with quick visual recovery — a core surgical skill at AIMS." },
      { icon: "scan", atAims: true, title: "Advanced Eye Diagnostics", text: "Modern diagnostic equipment for the front and back of the eye, used in daily clinical work." },
      { icon: "ai", title: "OCT and AI Retinal Screening", text: "Optical coherence tomography and AI screening are detecting diabetic eye disease and glaucoma earlier." },
      { icon: "laser", title: "Femtosecond Laser and Premium Lenses", text: "Laser-assisted cataract surgery and premium intraocular lenses are raising the standard of visual outcomes." },
    ],
  },
  "ms-obstetrics-and-gynaecology": {
    speciality: "Obstetrics & Gynaecology",
    items: [
      { icon: "scissors", atAims: true, title: "High-End Laparoscopic Surgery", text: "Minimally invasive gynaecological surgery, with less pain and a quicker return home." },
      { icon: "syringe", atAims: true, title: "Painless Delivery", text: "Labour analgesia in a modern delivery room, giving mothers a safer, more comfortable birth." },
      { icon: "monitor", atAims: true, title: "High Dependency Unit", text: "Close monitoring for high-risk mothers before and after delivery." },
      { icon: "wave", title: "Fetal Medicine and Reproductive Technology", text: "Advanced fetal ultrasound and assisted reproduction are expanding what obstetricians can detect and treat." },
    ],
  },
  "md-anesthesiology": {
    speciality: "Anaesthesiology",
    items: [
      { icon: "wave", atAims: true, title: "Ultrasound-Guided Nerve Blocks", text: "Precise regional anaesthesia for surgery and pain relief, with fewer side effects than general anaesthesia alone." },
      { icon: "monitor", atAims: true, title: "Upgraded Workstations and Monitoring", text: "Modern anaesthesia workstations and the latest monitoring devices across 11 modular theatres." },
      { icon: "scope", title: "Video Laryngoscopy", text: "Camera-guided airway devices are making difficult intubations safer." },
      { icon: "gauge", title: "Depth-of-Anaesthesia Monitoring", text: "Brain-function monitoring and goal-directed fluid therapy help tailor anaesthesia to each patient." },
    ],
  },
  "md-pathology": {
    speciality: "Pathology",
    items: [
      { icon: "microscope", atAims: true, title: "24/7 Diagnostic Laboratory", text: "Round-the-clock tissue, blood and cell diagnostics supporting emergency and inpatient care." },
      { icon: "tube", atAims: true, title: "Central Research Laboratory", text: "A well-equipped research laboratory for academic work and residents' theses." },
      { icon: "ai", title: "Digital Pathology and AI", text: "Whole-slide imaging and AI tools are helping pathologists report faster and share opinions remotely." },
      { icon: "dna", title: "Molecular Pathology", text: "Immunohistochemistry and molecular tests now guide targeted cancer treatment." },
    ],
  },
  "md-biochemistry": {
    speciality: "Biochemistry",
    items: [
      { icon: "dna", atAims: true, title: "Molecular Laboratory Testing", text: "Molecular techniques used in modern diagnosis, alongside metabolic and hormonal assays." },
      { icon: "timer", atAims: true, title: "Rapid Turnaround, 24/7", text: "A laboratory that runs round the clock, with fast results for emergency and inpatient care." },
      { icon: "monitor", title: "Total Laboratory Automation", text: "Automated lines and laboratory information systems are cutting errors and turnaround times." },
      { icon: "tube", title: "Mass Spectrometry and Point-of-Care Tests", text: "High-precision mass spectrometry and bedside testing are widening what the laboratory can measure." },
    ],
  },
};
