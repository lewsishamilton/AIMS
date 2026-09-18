const imagesRecord = import.meta.glob<{ default: string }>("./aims-campus-*.jpeg", {
  eager: true,
});

export const allStockImages: string[] = Object.keys(imagesRecord)
  .sort()
  .map((key) => imagesRecord[key].default);

// Curated selection of real AIMS medical campus facilities, labs, libraries, auditorium & outreach
export const IMAGES_1: string[] = [
  imagesRecord["./aims-campus-07.jpeg"]?.default, // Main AIMS Entrance with Faculty & Medical Students
  imagesRecord["./aims-campus-47.jpeg"]?.default, // Advanced Microscopy Laboratory
  imagesRecord["./aims-campus-41.jpeg"]?.default, // Anatomy Osteology & Dissection Lab
  imagesRecord["./aims-campus-19.jpeg"]?.default, // Central Digital Library & Study Complex
].filter(Boolean) as string[];

export const IMAGES_2: string[] = [
  imagesRecord["./aims-campus-15.jpeg"]?.default, // Grand Medical Auditorium
  imagesRecord["./aims-campus-38.jpeg"]?.default, // Clinical Pathology & Lab Practical Session
  imagesRecord["./aims-campus-37.jpeg"]?.default, // Biochemistry Research Laboratory
  imagesRecord["./aims-campus-03.jpeg"]?.default, // AIMS Main Campus Building & Healthcare Campaign
].filter(Boolean) as string[];

export const IMAGES_3: string[] = [
  imagesRecord["./aims-campus-29.jpeg"]?.default, // Clinical Diagnostic Laboratory
  imagesRecord["./aims-campus-50.jpeg"]?.default, // Medical Library Book Stacks
  imagesRecord["./aims-campus-31.jpeg"]?.default, // Academic Poster Exhibition & Health Day
  imagesRecord["./aims-campus-48.jpeg"]?.default, // Community Medicine & Rural Healthcare Outreach
].filter(Boolean) as string[];

export default allStockImages;
