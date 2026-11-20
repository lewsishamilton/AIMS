export interface PatientShort {
  id: string;
  title: string;
  category: string;
}

export const PATIENT_SHORTS: PatientShort[] = [
  { id: "Md7c5V-I2eo", title: "Free Hysterectomy (Uterus Surgery)", category: "Gynecology" },
  { id: "JbAUqSUn_3I", title: "Free Cataract & Eye Surgery", category: "Ophthalmology" },
  { id: "QdqFcMusIg4", title: "Free Normal Delivery & Maternity Care", category: "Obstetrics" },
  { id: "rmPA6cN3h48", title: "Free Ear (ENT) Surgery & Care", category: "ENT Care" },
  { id: "jd2M0Mjj6s0", title: "Free Kidney Stone Surgery & Treatment", category: "Urology" },
  { id: "2x4B0nUK4bk", title: "Free C-Section (Cesarean Delivery)", category: "Obstetrics" },
  { id: "YnMU-FxITc8", title: "Free MRI Scan & Advanced Diagnostics", category: "Radiology" },
  { id: "OoJlXIIsZKE", title: "Free Kidney Stone Removal Surgery", category: "Urology" },
  { id: "pa9HMYPHgOo", title: "Free Family Planning Procedure", category: "Gynecology" },
  { id: "5FjBBlS7My4", title: "Free Safe Childbirth & Delivery", category: "Obstetrics" },
  { id: "F5o-cFxnWmo", title: "Free Uterine Tumor & Womb Surgery", category: "Gynecology" },
  { id: "hiEA1ErS3H8", title: "Free Surgical Treatment & Care", category: "General Surgery" },
  { id: "lUbIrMPciC4", title: "Free Leg Fracture & Rodding Surgery", category: "Orthopedics" },
  { id: "ASU_dCt1bwo", title: "Free Inpatient Health Treatment & Recovery", category: "General Medicine" },
  { id: "qauwZNb9WqE", title: "Free Accident & Leg Fracture Surgery", category: "Orthopedics" },
  { id: "LXKahiMaPGE", title: "Free Hand & Bone Surgery", category: "Orthopedics" },
  { id: "hdzeHXDZhv4", title: "Free Maternity & Delivery Care", category: "Obstetrics" },
  { id: "30O3YO0Yu2w", title: "Free Infection & Liver Care Treatment", category: "General Medicine" },
  { id: "lSK45LJdn5g", title: "Free Family Planning Operation", category: "Gynecology" },
  { id: "WDfdpLjQn-M", title: "Free Nerve Weakness & Neuro Treatment", category: "Neurology" },
  { id: "S2JzaZhZPnQ", title: "Free Critical Care & Emergency Recovery", category: "Critical Care" },
  { id: "eYdU0P5906Y", title: "Free Cardiac Stent Surgery", category: "Cardiology" },
  { id: "rvil5oNF-vc", title: "Free L4–L5 Disc Surgery", category: "Spine Surgery" },
  { id: "mUShcbg0nWM", title: "Free Varicose Veins Surgery", category: "Vascular Surgery" },
  { id: "9Fsl39g26xg", title: "Free Arthroscopy Surgery", category: "Orthopedics" },
  { id: "rXMbY5ed3mI", title: "Free Spinal Surgery", category: "Spine Surgery" },
  { id: "m4BY3_vH0Ic", title: "Free Cardiac Stent Procedure", category: "Cardiology" },
  { id: "ZXy39cmIsG8", title: "Free Obstetric Surgery", category: "Obstetrics" },
  { id: "ys3LCvmtIDM", title: "Free Sciatica Surgery", category: "Spine Surgery" },
  { id: "17MLVT6zf4c", title: "Free Spinal Fixation Surgery", category: "Spine Surgery" },
  { id: "B98Tx-cxSig", title: "Free Pediatric Treatment", category: "Pediatrics" },
  { id: "oFPhsqmIg7U", title: "Free Appendicitis Surgery", category: "General Surgery" },
  { id: "1RPglU_NChQ", title: "Free Eye Surgery", category: "Ophthalmology" },
];

// Two scrolling rows, split as evenly as the list allows (first row takes the extra one).
const ROW_SPLIT = Math.ceil(PATIENT_SHORTS.length / 2);
export const ROW_1_SHORTS = PATIENT_SHORTS.slice(0, ROW_SPLIT);
export const ROW_2_SHORTS = PATIENT_SHORTS.slice(ROW_SPLIT);
