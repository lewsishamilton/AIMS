import arthroImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/ARTHOSCOPY.jpeg";
import biochemistryLabImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/BIOCHEMISTRY LAB.jpeg";
import bloodBankImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/BLOOD BANK.jpeg";
import cathLabImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/cath lab.jpeg";
import ctScannerImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/ct scan image.jpeg";
import eegImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/EEG MACHINE.jpeg";
import emgImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/EMG MACHINE.jpeg";
import entImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/ENT MICROSCOPE.jpeg";
import centralLabImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/FULLY AUTOMATED CENTRAL LAB ADVANCED ENDOSCOPY.jpeg";
import heartLungImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/HEART LUNG MACHINE WITH HEMOTHERM.jpeg";
import digitalXRayImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/hospital digital x ray.jpeg";
import iabpImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/INTRA AORTIC BALLON PUMP.jpeg";
import laparoscopyImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/LAPROSCOPY WITH PHU.jpeg";
import phacoImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/LEGION PHACO UNIT.jpeg";
import mriImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/mri machine images.jpeg";
import neuroMicroscopeImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/NEURO MICROSCOPE.jpeg";
import pathLabImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/PATHLAB.jpeg";
import thuliumLaserImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/THULIUM LASER.jpeg";
import ultrasoundImg from "../assets/clg-imgs/MACHINE IMAGES/aims images machines/usg scan image.jpeg";
import mammographyImg from "../assets/Departments/radiology.PNG";
import icuVentilatorImg from "../assets/clg-imgs/Operation Room/1.png";

export interface Machine {
  id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
}

export const MACHINES_DATA: Machine[] = [
  {
    id: "arthroscopy-system",
    name: "Arthroscopy System",
    category: "Minimally Invasive Surgery",
    image: arthroImg,
    description:
      "The Arthroscopy System is used for minimally invasive examination and treatment of joints, particularly the knee, shoulder, and other complex joints. It combines a small camera, specialized instruments, illumination, and visualization equipment to provide clear internal views. The system supports procedures such as diagnostic arthroscopy, tissue repair, and removal of damaged structures while helping surgeons work through small incisions with improved visualization and precision.",
  },
  {
    id: "biochemistry-analyzer",
    name: "Biochemistry Analyzer",
    category: "Clinical Laboratory",
    image: biochemistryLabImg,
    description:
      "The Biochemistry Analyzer is designed for automated analysis of biochemical parameters in clinical samples. It can support testing of substances such as glucose, proteins, enzymes, electrolytes, and other routine laboratory markers, depending on configuration. Automation helps improve consistency, processing speed, and workflow efficiency. The analyzer is commonly used in clinical laboratories where reliable biochemical testing is required for diagnosis, monitoring, and routine health assessment.",
  },
  {
    id: "blood-bank-equipment",
    name: "Blood Bank Equipment",
    category: "Transfusion Services",
    image: bloodBankImg,
    description:
      "Blood bank equipment supports the safe processing, storage, and management of blood and blood components. The equipment shown is used within workflows involving collection, component preparation, preservation, testing, and controlled storage. Proper temperature management and organized handling are essential for maintaining product quality. Such systems help laboratories and transfusion services manage blood components efficiently while supporting traceability, safety, and timely availability for patient care.",
  },
  {
    id: "cath-lab",
    name: "Cath Lab",
    category: "Interventional Cardiology",
    image: cathLabImg,
    description:
      "The Catheterization Laboratory, or Cath Lab, is a specialized environment for image-guided cardiovascular procedures. It uses advanced fluoroscopic imaging and monitoring systems to help clinicians visualize blood vessels and the heart in real time. The setup can support procedures such as coronary angiography, catheter-based interventions, and stent placement. Integrated imaging and patient-monitoring equipment enables precise guidance while allowing the clinical team to continuously observe the patient.",
  },
  {
    id: "ct-scanner",
    name: "CT Scanner",
    category: "Radiology & Imaging",
    image: ctScannerImg,
    description:
      "The CT Scanner uses X-rays and computer-based image reconstruction to produce detailed cross-sectional images of the body. It can provide rapid visualization of bones, organs, blood vessels, and soft tissues, depending on the examination. CT imaging is widely used in emergency assessment, diagnosis, treatment planning, and follow-up. The equipment combines a rotating gantry, patient table, detector system, and computer workstation to generate diagnostic images efficiently.",
  },
  {
    id: "eeg-system",
    name: "EEG System",
    category: "Neurology",
    image: eegImg,
    description:
      "The EEG System, or Electroencephalography System, records the brain's electrical activity through electrodes placed on the scalp. It is used to evaluate brain-wave patterns and support clinical assessment of conditions involving abnormal electrical activity. EEG examinations may be useful in neurological investigations, including seizure-related evaluation and monitoring. The system captures electrical signals and presents them as waveforms for review and interpretation by qualified healthcare professionals.",
  },
  {
    id: "emg-system",
    name: "EMG System",
    category: "Neuromuscular Diagnostics",
    image: emgImg,
    description:
      "The EMG System, or Electromyography System, evaluates electrical activity associated with muscles and peripheral nerves. It can be used alongside nerve conduction studies to help assess neuromuscular function. The equipment records electrical signals generated by muscles and nerves, allowing clinicians to examine patterns that may indicate functional abnormalities. EMG testing can contribute to the evaluation of nerve, muscle, and neuromuscular disorders as part of a broader clinical assessment.",
  },
  {
    id: "ent-equipment",
    name: "ENT Equipment",
    category: "Otolaryngology",
    image: entImg,
    description:
      "ENT equipment supports examination, diagnosis, and treatment within the ear, nose, and throat specialties. The setup may include visualization systems, examination instruments, illumination, suction, and procedure-specific devices. High-quality visualization helps clinicians inspect anatomical structures and perform procedures with greater precision. Such equipment is used across routine examinations and specialized interventions involving the ear, nasal passages, throat, and related head-and-neck structures.",
  },
  {
    id: "fully-automated-central-lab-system",
    name: "Fully Automated Central Lab System",
    category: "Automated Diagnostics",
    image: centralLabImg,
    description:
      "The Fully Automated Central Laboratory System integrates multiple laboratory processes into an automated workflow. Depending on configuration, it can support sample identification, transport, preparation, analysis, and result handling across different testing areas. Automation can reduce manual handling and improve workflow consistency for high-volume laboratories. Centralized processing helps laboratories manage large numbers of samples efficiently while supporting standardized procedures, traceability, and timely availability of laboratory results.",
  },
  {
    id: "heart-lung-machine-with-hemotherm",
    name: "Heart-Lung Machine with Hemotherm",
    category: "Cardiothoracic Surgery",
    image: heartLungImg,
    description:
      "The Heart-Lung Machine with Hemotherm is used during selected cardiac surgical procedures to temporarily support circulation and oxygenation while the heart and lungs are not performing their normal functions. The system can circulate and oxygenate blood through an extracorporeal circuit. The Hemotherm component supports controlled temperature management during procedures. Together, these systems assist the surgical team in maintaining essential physiological parameters under carefully monitored clinical conditions.",
  },
  {
    id: "hospital-digital-x-ray",
    name: "Hospital Digital X-Ray",
    category: "Digital Radiography",
    image: digitalXRayImg,
    description:
      "The Digital X-Ray System produces radiographic images using X-rays and digital detectors. It supports examinations of areas such as the chest, bones, and other anatomical regions requiring radiographic evaluation. Digital imaging allows rapid image acquisition and electronic viewing, which can streamline clinical workflow. The system shown includes an X-ray unit and imaging workstation designed to support efficient positioning, exposure, image review, and documentation during diagnostic examinations.",
  },
  {
    id: "intra-aortic-balloon-pump",
    name: "Intra-Aortic Balloon Pump",
    category: "Cardiac Critical Care",
    image: iabpImg,
    description:
      "The Intra-Aortic Balloon Pump, or IABP, is a mechanical circulatory support device used in selected patients with compromised cardiac function. A balloon catheter is positioned in the aorta and operates in synchronization with the cardiac cycle to assist circulation. The system can help reduce the workload on the heart and improve coronary blood flow under appropriate clinical indications. Its use requires continuous monitoring by trained healthcare professionals.",
  },
  {
    id: "laparoscopy-system",
    name: "Laparoscopy System",
    category: "Endoscopic Surgery",
    image: laparoscopyImg,
    description:
      "The Laparoscopy System supports minimally invasive surgical procedures by providing visualization of internal abdominal or pelvic structures through small incisions. A camera, light source, display system, and specialized instruments allow surgeons to view and operate within the body without a large surgical opening. Laparoscopic techniques can be used for a range of procedures and are designed to provide controlled visualization and instrument access through small entry points.",
  },
  {
    id: "phacoemulsification-system",
    name: "Phacoemulsification System",
    category: "Ophthalmic Surgery",
    image: phacoImg,
    description:
      "The Phacoemulsification System is used in cataract surgery to remove the cloudy natural lens of the eye. It uses controlled ultrasonic energy to break the lens into smaller fragments, which are then aspirated from the eye. The system integrates fluid management, aspiration, and energy control to support precise surgical handling. Following lens removal, an intraocular lens may be positioned to restore the eye's focusing ability.",
  },
  {
    id: "mri-system",
    name: "MRI System",
    category: "Magnetic Resonance Imaging",
    image: mriImg,
    description:
      "The MRI System uses a strong magnetic field and radiofrequency energy to create detailed images of internal body structures without using ionizing radiation. MRI can provide high-contrast visualization of soft tissues, the brain, spine, joints, and other anatomical regions. The system includes a magnet, patient table, radiofrequency components, and imaging workstation. Different imaging sequences can be selected according to the clinical examination and diagnostic requirement.",
  },
  {
    id: "neuro-microscope",
    name: "Neuro Microscope",
    category: "Microsurgery & Neurosurgery",
    image: neuroMicroscopeImg,
    description:
      "The Neuro Microscope is a specialized operating microscope designed to provide magnified, illuminated visualization during delicate neurosurgical procedures. Its optical system helps surgeons identify small anatomical structures and work with greater visual precision. Depending on configuration, features may include high-resolution optics, integrated illumination, and ergonomic positioning controls. Such microscopes are particularly valuable in procedures where accurate visualization of fine neural and vascular structures is essential.",
  },
  {
    id: "pathology-laboratory-equipment",
    name: "Pathology Laboratory Equipment",
    category: "Histopathology & Diagnostics",
    image: pathLabImg,
    description:
      "Pathology laboratory equipment supports the examination and processing of tissue, cell, and other clinical specimens. The setup may include instruments for specimen preparation, staining, microscopy, and related laboratory workflows. These processes help pathologists examine cellular and tissue characteristics for diagnostic purposes. Proper sample handling, processing, and quality control are essential for producing reliable laboratory findings that can contribute to diagnosis, treatment planning, and patient management.",
  },
  {
    id: "thulium-laser",
    name: "Thulium Laser",
    category: "Laser Surgery & Urology",
    image: thuliumLaserImg,
    description:
      "The Thulium Laser is a medical laser system used in selected surgical and therapeutic applications, particularly within urology and other specialized fields depending on the system configuration. It delivers controlled laser energy to target tissue with high precision. Thulium laser technology can support procedures involving tissue cutting, vaporization, or enucleation. Its use allows clinicians to perform specific interventions through carefully controlled energy delivery under appropriate clinical protocols.",
  },
  {
    id: "ultrasound-scanner",
    name: "Ultrasound Scanner",
    category: "Ultrasound & Sonography",
    image: ultrasoundImg,
    description:
      "The Ultrasound Scanner uses high-frequency sound waves to create real-time images of internal organs, tissues, and other anatomical structures. It is widely used because it does not use ionizing radiation and can support dynamic examinations. Depending on the transducer and configuration, ultrasound can assist with abdominal, obstetric, vascular, cardiac, musculoskeletal, and other examinations. The system provides immediate imaging that can support clinical assessment and procedure guidance.",
  },
  {
    id: "mammography-system",
    name: "Mammography System",
    category: "Radiology & Breast Imaging",
    image: mammographyImg,
    description:
      "The Mammography System utilizes low-dose specialized X-ray technology designed for detailed examination of breast tissue and early detection of abnormalities. Equipped with high-resolution digital detectors and ergonomic compression paddles, it provides superior contrast visualization of soft tissues and microcalcifications. The system supports routine screening, diagnostic imaging, and stereotactic biopsies while optimizing patient comfort and delivering swift clinical image acquisition for accurate diagnostic assessments.",
  },
  {
    id: "icu-ventilator-system",
    name: "ICU Ventilator System",
    category: "Critical Care & Pulmonology",
    image: icuVentilatorImg,
    description:
      "The ICU Ventilator System provides comprehensive invasive and non-invasive mechanical respiratory support for critically ill adult, pediatric, and neonatal patients. Featuring sophisticated pressure and volume control modes, high-precision gas blending, and continuous lung mechanics monitoring, the system adapts to complex respiratory conditions. Integrated alarm safety systems and responsive touch interfaces assist critical care specialists in stabilizing compromised patients within intensive care and post-operative environments.",
  },
];
