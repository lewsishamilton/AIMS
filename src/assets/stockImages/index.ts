const imagesRecord = import.meta.glob<{ default: string }>("./aims-campus-*.webp", {
  eager: true,
});

export const allStockImages: string[] = Object.keys(imagesRecord)
  .sort()
  .map((key) => imagesRecord[key].default);

// Curated selection of real AIMS medical campus facilities, labs, libraries, auditorium & outreach
export const IMAGES_1: string[] = [
  imagesRecord["./aims-campus-07.webp"]?.default, // Main AIMS Entrance with Faculty & Medical Students
  imagesRecord["./aims-campus-47.webp"]?.default, // Advanced Microscopy Laboratory
  imagesRecord["./aims-campus-41.webp"]?.default, // Anatomy Osteology & Dissection Lab
  imagesRecord["./aims-campus-19.webp"]?.default, // Central Digital Library & Study Complex
].filter(Boolean) as string[];

export const IMAGES_2: string[] = [
  imagesRecord["./aims-campus-15.webp"]?.default, // Grand Medical Auditorium
  imagesRecord["./aims-campus-38.webp"]?.default, // Clinical Pathology & Lab Practical Session
  imagesRecord["./aims-campus-37.webp"]?.default, // Biochemistry Research Laboratory
  imagesRecord["./aims-campus-03.webp"]?.default, // AIMS Main Campus Building & Healthcare Campaign
].filter(Boolean) as string[];

export const IMAGES_3: string[] = [
  imagesRecord["./aims-campus-29.webp"]?.default, // Clinical Diagnostic Laboratory
  imagesRecord["./aims-campus-50.webp"]?.default, // Medical Library Book Stacks
  imagesRecord["./aims-campus-31.webp"]?.default, // Academic Poster Exhibition & Health Day
  imagesRecord["./aims-campus-48.webp"]?.default, // Community Medicine & Rural Healthcare Outreach
].filter(Boolean) as string[];

export default allStockImages;
