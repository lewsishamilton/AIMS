import chronicle1 from "../assets/News/chronicle-1.png";
import chronicle2 from "../assets/News/chronicle-2.png";
import chronicle3 from "../assets/News/chronicle-3.png";
import chronicle4 from "../assets/News/chronicle-4.png";
import chronicle5 from "../assets/News/chronicle-5.png";
import chronicle6 from "../assets/News/chronicle-6.png";
import image1 from "../assets/News/image-1.png";
import image2 from "../assets/News/image-2.png";
import image3 from "../assets/News/image-3.png";

export interface ChronicleItem {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  supportingContent: string[];
  image: string;
}

export interface GalleryFrame {
  id: string;
  tag: string;
  label: string;
  caption: string;
  image: string;
}

export const chronicles: ChronicleItem[] = [
  {
    id: 1,
    number: "01",
    title: "WOMEN'S HEALTH & PREVENTIVE WELLNESS",
    subtitle: "INTERNATIONAL WOMEN'S DAY INITIATIVE",
    category: "WOMEN'S HEALTH",
    tags: ["Women's Health", "IWD"],
    description: "Arundathi Institute of Medical Sciences (AIMS) marked International Women’s Day (IWD) with an engaging, educational event centered on women's health and well-being.",
    supportingContent: [
      "The initiative highlighted the critical need for proactive health literacy and preventive screenings across all stages of life. Through interactive clinical counseling and educational displays, medical faculty addressed pervasive yet often overlooked concerns, emphasizing timely diagnostic evaluations and routine health consultations.",
      "By fostering open discussions on nutrition, lifestyle management, and holistic wellness, the institution reaffirmed its commitment to community-wide health advocacy. The observance served as an enduring reminder of the importance of encouraging women to prioritize their personal physical and emotional well-being."
    ],
    image: chronicle1
  },
  {
    id: 2,
    number: "02",
    title: "FREE PEDIATRIC CAMP FOR ORPHAN CHILDREN",
    subtitle: "COMMUNITY OUTREACH INITIATIVE",
    category: "COMMUNITY HEALTH",
    tags: ["Medical Camp", "Social Outreach"],
    description: "On the occasion of the birthday of K. T. Rama Rao (KTR)—Minister for IT and Municipal Administration, and BRS Party Working President—a free medical check-up camp was organized for orphan children.",
    supportingContent: [
      "Organized as a dedicated social outreach initiative, the camp provided comprehensive clinical screenings and diagnostic evaluations for young children residing in local welfare homes. The effort focused on early detection of common developmental and nutritional concerns, ensuring that vulnerable youth receive attentive medical care.",
      "Such community-oriented clinical programs underscore the vital role healthcare institutions play in bridging systemic accessibility gaps. By delivering essential consultations and necessary medications directly to underserved children, the camp reflected a sustained institutional dedication to public health equity."
    ],
    image: chronicle2
  },
  {
    id: 3,
    number: "03",
    title: "PHILANTHROPIC HEALTHCARE & SOCIAL WELFARE",
    subtitle: "ACCESSIBLE COMMUNITY HEALTHCARE MODEL",
    category: "SOCIAL WELFARE",
    tags: ["Social Welfare", "Healthcare Model"],
    description: "In an era where education and medical treatments have become highly commercialized, the services rendered by the Marri family stand out as a model for social welfare across the region.",
    supportingContent: [
      "Their philanthropic approach to institutional healthcare has continually prioritized social responsibility, ensuring that quality treatment and diagnostic services remain accessible to families from all socioeconomic backgrounds. This patient-first philosophy counters prevailing commercialization by placing human healing and community well-being above fiscal considerations.",
      "Through sustained institutional patronage and compassionate clinical leadership, this model of service continues to impact the wider region. It serves as an enduring reminder of the foundational responsibility medical and academic establishments hold in uplifting surrounding communities through accessible care."
    ],
    image: chronicle3
  },
  {
    id: 4,
    number: "04",
    title: "OCCUPATIONAL HEALTH CAMP FOR JOURNALISTS",
    subtitle: "TUWJ COLLABORATIVE WELLNESS",
    category: "JOURNALIST HEALTH",
    tags: ["Health Camp", "TUWJ"],
    description: "A free health camp was organized at Arundathi Hospital (located in Dundigal) specifically for working journalists under the leadership of the Telangana Union of Working Journalists (TUWJ), Medchal District Chapter.",
    supportingContent: [
      "Recognizing the demanding schedules, occupational stress, and irregular hours inherent in media reporting, the dedicated camp offered journalists streamlined access to multispecialty consultations and vital health screenings. The initiative emphasized the importance of regular clinical check-ups for working professionals who frequently postpone routine medical care.",
      "Collaborations between professional associations like TUWJ and tertiary medical facilities play a crucial role in promoting sustained occupational health and preventive wellness. The camp facilitated personalized diagnostic guidance, empowering media personnel to take proactive measures for their long-term health."
    ],
    image: chronicle4
  },
  {
    id: 5,
    number: "05",
    title: "MEDICAL SOLIDARITY & DOCTOR SAFETY REFORMS",
    subtitle: "INSTITUTIONAL VOICES FOR JUSTICE",
    category: "INSTITUTIONAL VOICES",
    tags: ["Medical Community", "Solidarity"],
    description: "Protests were held across multiple medical institutes in the Quthbullapur, Dundigal, and Kompally regions against the horrific rape and murder of a trainee postgraduate doctor at RG Kar Medical College in Kolkata.",
    supportingContent: [
      "Resident doctors, senior faculty, and clinical staff assembled in collective solidarity to voice profound concern over workplace vulnerabilities faced by medical trainees and healthcare workers nationwide. The peaceful demonstrations underscored urgent calls for systemic legal protections and immediate accountability.",
      "The widespread institutional response brought to the forefront critical imperatives surrounding institutional security, secure duty environments, and institutional safety measures across teaching hospitals. Medical fraternity members stood unified in demanding institutional reforms that guarantee a safe, dignified working environment for all healthcare professionals."
    ],
    image: chronicle5
  },
  {
    id: 6,
    number: "06",
    title: "ADVANCED CLINICAL CARE & INFRASTRUCTURE",
    subtitle: "TERTIARY HEALTHCARE EXCELLENCE",
    category: "HEALTHCARE SERVICES",
    tags: ["Hospital Facilities", "Specialized Care"],
    description: "Marri Laxman Reddy, Chairman of Arundathi Hospital, welcomed the MLA and briefed him on the various healthcare services, advanced equipment, and specialized departments operating in the hospital.",
    supportingContent: [
      "The comprehensive briefing highlighted the hospital's clinical infrastructure, including advanced surgical suites, modern diagnostic facilities, and round-the-clock emergency departments. Institutional leadership demonstrated how modern medical technology is integrated with compassionate patient care to serve the wider regional population.",
      "Engagements between public representatives and medical leaders foster vital coordination in identifying community health priorities and expanding healthcare access. The walkthrough reaffirmed the hospital's ongoing mission to provide high-standard tertiary medical treatments and specialized clinical care within reach of all citizens."
    ],
    image: chronicle6
  }
];

export const bottomGalleryFrames: GalleryFrame[] = [
  {
    id: "frame-1",
    tag: "ARCHIVE 01",
    label: "CLINICAL CAMPUS",
    caption: "AIMS Arundhati Central Complex",
    image: image1
  },
  {
    id: "frame-2",
    tag: "ARCHIVE 02",
    label: "SURGICAL SUITE",
    caption: "Advanced Precision Operating Theatres",
    image: image2
  },
  {
    id: "frame-3",
    tag: "ARCHIVE 03",
    label: "PATIENT SPACES",
    caption: "Healing Sanctuary & Inpatient Rooms",
    image: image3
  }
];
