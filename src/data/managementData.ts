import laxmanReddyImg from "../assets/Management/M.LaxmanReddy.webp";
import anushreyaReddyImg from "../assets/Management/M.Anushreya Reddy.webp";
import mamathaReddyImg from "../assets/Management/M.Mamatha Reddy.webp";
import dhirenReddyImg from "../assets/Management/M.Dhiren Reddy.webp";
import devanandImg from "../assets/Management/Dr.B.Devanand.webp";
import sumaPreethiImg from "../assets/Management/Dr.S.SumaPreethi.webp";

export interface ManagementMember {
  id: string;
  name: string;
  role: string;
  designationNote?: string;
  category: "executive" | "academic" | "principal";
  hierarchyTier: "President" | "Key Executive Officers" | "Executive Members" | "Institutional Leadership" | "Institutional Principals";
  hierarchyRank: number; // 1 = Highest
  contact?: string;
  departmentOrWing?: string;
  photoUrl?: string; // Loaded if available, empty if not provided yet
  badges?: string[];
  profile?: {
    fullName: string;
    title: string;
    bio?: string[];
    messageTitle?: string;
    message: string[];
  };
}

export const EXECUTIVE_MEMBERS: ManagementMember[] = [
  {
    id: "marri-laxman-reddy",
    name: "Marri Laxman Reddy",
    role: "President",
    category: "executive",
    hierarchyTier: "President",
    hierarchyRank: 1,
    departmentOrWing: "Executive Committee",
    badges: ["Apex Governance", "President"],
    photoUrl: laxmanReddyImg,
    profile: {
      fullName: "Sri Marri Laxman Reddy",
      title: "Founder & Chairman, Marri Educational Society",
      bio: [
        "A visionary leader, international athlete, and humanitarian, Sri Marri Laxman Reddy, Founder and Chairman of the Marri Educational Society, embodies the spirit of perseverance, purpose, and progress. Guided by his conviction that “an educated nation is a prosperous nation”, he has transformed this belief into a lifelong pursuit — creating institutions that ignite curiosity, cultivate character, and empower youth to lead with wisdom and compassion.",
        "His extraordinary journey — from the discipline of sports to the realm of education — reflects an enduring faith in human potential and a vision to shape a generation driven by excellence, empathy, and innovation.",
        "Under his dynamic guidance, Arundathi Institute of Medical Sciences (AIMS) and its teaching hospital in Hyderabad have grown into a cradle of healing and character — empowering minds, nurturing inclusivity, and redefining the future of medical education and patient care.",
      ],
      messageTitle: "Chairman’s Insights",
      message: [
        "It is my pleasure to welcome you to Arundathi Institute of Medical Sciences (AIMS). Built on the belief that education empowers individuals and transforms societies, AIMS stands committed to nurturing young minds with knowledge, discipline, and purpose.",
        "Rooted in strong values and driven by innovation, the institute and hospital offer an environment where students are encouraged to explore, learn, and excel in the service of patients.",
        "As the landscape of medicine and healthcare evolves, AIMS continues to adapt with advanced pedagogy, modern infrastructure, and a culture that promotes research, compassion, and inclusivity.",
        "I invite you to be part of this journey of growth, discovery, and transformation.",
      ],
    },
  },
  {
    id: "m-anushreya-reddy",
    name: "M. Anushreya Reddy",
    role: "Secretary",
    category: "executive",
    hierarchyTier: "Key Executive Officers",
    hierarchyRank: 2,
    departmentOrWing: "Executive Committee",
    badges: ["Secretary", "Administration"],
    photoUrl: anushreyaReddyImg,
    profile: {
      fullName: "Ms. Marri Anu Shreya Reddy",
      title: "Secretary, Marri Educational Society",
      bio: [
        "With an eye for the future and a heart rooted in purpose, Ms. Marri Anu Shreya Reddy brings a new dimension of thought and leadership to the Marri Educational Society. Her vision redefines education as a transformative journey — one that cultivates intellect, emotional depth, and social awareness in equal measure.",
        "At the crossroads of tradition and technology, she has been instrumental in shaping AIMS into a space that values curiosity as much as competence, empathy as much as excellence. Her leadership emphasizes creating meaningful change — empowering students and faculty to think critically, act ethically, and innovate responsibly.",
        "Articulate, progressive, and deeply committed to purposeful education, Ms. Shreya Reddy stands as a symbol of modern leadership — one that measures success not merely by outcomes, but by the impact it leaves on people and the world around them.",
      ],
      messageTitle: "Secretary’s Communiqué",
      message: [
        "Education, to me, is an experience that shapes identity and purpose. At AIMS, my vision is to create a learning environment where curiosity is encouraged, individuality is celebrated, and students grow with confidence, integrity, and intention.",
        "We aspire to be a community that thinks boldly and acts responsibly — where innovation is balanced with empathy, and ambition is strengthened by character. Here, learning is not confined to classrooms; it is a journey of discovering who you are and what you can become.",
        "I welcome you to a campus defined by possibility and progress — a place where your ideas matter, your growth is valued, and your future is yours to shape.",
      ],
    },
  },
  {
    id: "m-mamata-reddy",
    name: "M. Mamata Reddy",
    role: "Treasurer",
    category: "executive",
    hierarchyTier: "Key Executive Officers",
    hierarchyRank: 3,
    departmentOrWing: "Executive Committee",
    badges: ["Treasurer", "Finance & Planning"],
    photoUrl: mamathaReddyImg,
    profile: {
      fullName: "Smt. Marri Mamatha Reddy",
      title: "Treasurer, Marri Educational Society",
      bio: [
        "A visionary leader with a kind heart and an unwavering commitment to education, Smt. Marri Mamatha Reddy stands as a pillar of strength and inspiration at AIMS. As the Treasurer of the institution, she plays a crucial role in driving strategic growth, ensuring financial prudence, and nurturing an ecosystem where excellence and empathy coexist.",
        "Known for her warmth, approachability, and deep concern for student welfare, she believes in creating an environment that goes beyond academics — one that fosters confidence, compassion, and character. Her leadership reflects a perfect balance of professionalism and humanity, shaping a culture that values both achievement and ethics.",
        "With her steadfast vision, Smt. Mamatha Reddy continues to inspire faculty, staff, and students alike — guiding AIMS toward becoming a centre of medical excellence, inclusivity, and compassionate care. Her belief that education should empower hearts as much as it enlightens minds defines the spirit of the institution.",
      ],
      messageTitle: "Treasurer’s Covenant of Care",
      message: [
        "At AIMS, my vision is simple yet profound — to create a learning environment where stability, care, and opportunity come together to support every student’s journey. I believe that an institution grows strongest when its foundation is built on thoughtful planning, responsible stewardship, and a genuine concern for people.",
        "My focus is on ensuring that every resource we build and every initiative we support adds value to our students’ lives — academically, emotionally, and personally. Whether it is strengthening facilities, enhancing student support, or enabling new possibilities, each decision is guided by the belief that education must empower both the mind and the heart.",
        "Joining AIMS means stepping into an environment where care is constant, support is intentional, and each student is guided to rise with quiet strength and self-belief.",
        "Allow me to welcome you to an academic environment defined by integrity and inspiration.",
      ],
    },
  },
  {
    id: "m-dhiren-reddy",
    name: "M. Dhiren Reddy",
    role: "Member",
    category: "executive",
    hierarchyTier: "Executive Members",
    hierarchyRank: 4,
    departmentOrWing: "Executive Committee",
    badges: ["Executive Member"],
    photoUrl: dhirenReddyImg,
    profile: {
      fullName: "Sri Marri Dhiren Reddy",
      title: "Executive Member, Marri Educational Society",
      bio: [
        "A vibrant and visionary young leader, Sri Marri Dhiren Reddy brings energy, innovation, and a future-ready mindset to the leadership of AIMS. As an Executive Member, he stands at the intersection of tradition and transformation — carrying forward the institution’s legacy while infusing it with a spirit of modernity and progress.",
        "Driven by a passion for innovation, excellence, and student empowerment, he champions initiatives that blend technology with purpose and learning with impact. His dynamic approach inspires both faculty and students to dream bigger, think bolder, and create meaningful change in the world around them.",
        "With his charismatic presence and progressive vision, Sri Dhiren Reddy continues to be a motivating force behind the growth of AIMS as a hub of medical excellence, research, and leadership — where the healthcare professionals of tomorrow are shaped with purpose, passion, and pride.",
      ],
      messageTitle: "Leadership Insight",
      message: [
        "In a world that demands agility and imagination, AIMS stands as a catalyst for brilliance. I envision a learning environment where potential is recognized early, nurtured deeply, and transformed into achievements that resonate far beyond the classroom.",
        "What defines us is not just our academic strength but the spirit with which our students explore, care, and lead. At AIMS, I am committed to fostering a culture where innovation is instinctive, ideas are valued, and every learner is encouraged to pursue excellence with confidence and purpose.",
        "Together with our dedicated faculty and dynamic student community, we continue to build an institution that is bold in its vision, inclusive in its ethos, and future-driven in every endeavour. Here, education is not just a pathway — it is an experience that shapes resilience, ambition, and character.",
        "As you move forward, bring your curiosity, your courage, and individuality — the rest, we will build together.",
      ],
    },
  },
];

export const DEAN_AND_PRINCIPAL: ManagementMember[] = [
  {
    id: "dr-b-devanand",
    name: "Dr. B. Devanand",
    role: "Dean",
    category: "academic",
    hierarchyTier: "Institutional Leadership",
    hierarchyRank: 1,
    departmentOrWing: "Arundathi Institute of Medical Sciences",
    badges: ["Dean", "Institutional Leadership"],
    photoUrl: devanandImg,
    profile: {
      fullName: "Dr. B. Devanand",
      title: "Dean · Arundathi Institute of Medical Sciences (AIMS)",
      bio: [
        "Dr. B. Devanand is a distinguished medical educator and healthcare administrator serving as the Dean of Arundathi Institute of Medical Sciences (AIMS).",
        "He oversees academic operations, clinical training curricula, faculty governance, and tertiary healthcare delivery at AIMS, ensuring adherence to National Medical Commission (NMC) mandates.",
      ],
      messageTitle: "Dean’s Welcome",
      message: [
        "At Arundathi Institute of Medical Sciences, our mission is built upon three fundamental pillars: academic excellence, advanced clinical care, and compassionate community service. As Dean, it is my privilege to welcome you to an institution dedicated to shaping the future of healthcare through rigorous education, scientific inquiry, and ethical practice.",
        "Our medical curriculum is designed not only to deliver comprehensive theoretical knowledge and clinical skill, but also to instil empathy, integrity, and professionalism in every student. Supported by a highly qualified and experienced faculty, state-of-the-art teaching facilities, modern laboratories, and a modern hospital infrastructure, we ensure that our students receive well-rounded hands-on clinical exposure from the very beginning of their journey.",
        "We are committed to maintaining the highest standards set by national regulatory authorities, ensuring our academic programs, research initiatives, and patient care protocols remain at the forefront of modern medicine. Through continuous quality improvement, evidence-based training, and a vibrant research environment, we strive to empower our medical trainees to become competent, patient-centric healthcare leaders of tomorrow.",
        "To our prospective and current students, faculty, and healthcare professionals: we invite you to be part of a dynamic learning ecosystem where passion meets purpose. To our patients and community: we reaffirm our dedicated pledge to offer quality, accessible, and compassionate care to all.",
      ],
    },
  },
  {
    id: "dr-s-suma-preethi",
    name: "Dr. S. Suma Preethi",
    role: "Principal",
    category: "principal",
    hierarchyTier: "Institutional Leadership",
    hierarchyRank: 2,
    departmentOrWing: "Arundathi Institute of Medical Sciences",
    badges: ["Principal", "Academic Head"],
    photoUrl: sumaPreethiImg,
    profile: {
      fullName: "Dr. S. Suma Preethi",
      title: "Principal · Arundathi Institute of Medical Sciences (AIMS)",
      bio: [
        "Dr. S. Suma Preethi serves as the Principal of Arundathi Institute of Medical Sciences (AIMS). With extensive experience in medical education, curriculum execution, and academic leadership, she guides the academic ecosystem with steadfast dedication.",
        "Under her guidance, AIMS emphasizes holistic learning, evidence-based training, medical research, and compassionate patient care in strict alignment with National Medical Commission (NMC) standards.",
      ],
      messageTitle: "Principal’s Message",
      message: [
        "Welcome to Arundathi Institute of Medical Sciences (AIMS). As Principal, it is a privilege to lead an institution dedicated to academic distinction, innovative medical learning, and ethical clinical practice.",
        "Our educational philosophy centres on nurturing competent, compassionate healthcare leaders equipped with sound scientific knowledge, diagnostic acumen, and genuine empathy. Through our modern infrastructure, modern diagnostic laboratories, and experiential clinical training, our students receive comprehensive mentorship from day one.",
        "We foster an atmosphere of critical thinking, inquiry, and lifelong learning, inspiring our students to excel in medicine and make meaningful contributions to societal health.",
      ],
    },
  },
];

export const PRINCIPALS: ManagementMember[] = [
  DEAN_AND_PRINCIPAL[1],
];

export const ALL_LEADERSHIP_MEMBERS: ManagementMember[] = [
  ...EXECUTIVE_MEMBERS,
  ...DEAN_AND_PRINCIPAL,
];
