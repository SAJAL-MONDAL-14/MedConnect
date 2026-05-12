export type BedStatus = "free" | "low" | "full";

export interface Hospital {
  id: string;
  name: string;
  type: "Government" | "Private";
  verified: boolean;
  address: string;
  city: string;
  distanceKm: number;
  driveMin: number;
  rating: number;
  reviews: number;
  beds: { general: number; generalTotal: number; icu: number; icuTotal: number; ot: boolean; ambulance: boolean };
  updatedMinAgo: number;
  specialties: string[];
  phone: string;
  emergencyPhone: string;
  bloodBank: boolean;
  pin: { x: number; y: number };
}

export interface Doctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  experience: number;
  rating: number;
  fee: number;
  hospitalId: string;
  nextSlot: string;
  avatarColor: string;
}

export const hospitals: Hospital[] = [
  {
    id: "nbmc", name: "North Bengal Medical College", type: "Government", verified: true,
    address: "Hill Cart Road, Siliguri, WB", city: "Siliguri", distanceKm: 2.1, driveMin: 8,
    rating: 4.3, reviews: 128,
    beds: { general: 12, generalTotal: 30, icu: 3, icuTotal: 8, ot: true, ambulance: true },
    updatedMinAgo: 4,
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Emergency"],
    phone: "+91 353 256 5000", emergencyPhone: "+91 353 256 5100", bloodBank: true,
    pin: { x: 38, y: 42 },
  },
  {
    id: "siliguri-dh", name: "Siliguri District Hospital", type: "Government", verified: true,
    address: "Sevoke Road, Siliguri, WB", city: "Siliguri", distanceKm: 3.4, driveMin: 14,
    rating: 4.0, reviews: 86,
    beds: { general: 5, generalTotal: 24, icu: 0, icuTotal: 6, ot: true, ambulance: true },
    updatedMinAgo: 9,
    specialties: ["General Medicine", "Gynecology", "Pediatrics"],
    phone: "+91 353 251 1100", emergencyPhone: "+91 353 251 1199", bloodBank: false,
    pin: { x: 60, y: 30 },
  },
  {
    id: "citymed", name: "CityMed Multispeciality", type: "Private", verified: true,
    address: "Sevoke More, Siliguri, WB", city: "Siliguri", distanceKm: 4.2, driveMin: 18,
    rating: 4.7, reviews: 214,
    beds: { general: 18, generalTotal: 40, icu: 4, icuTotal: 10, ot: true, ambulance: true },
    updatedMinAgo: 2,
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology"],
    phone: "+91 353 270 8800", emergencyPhone: "+91 353 270 8888", bloodBank: true,
    pin: { x: 72, y: 58 },
  },
  {
    id: "neotia", name: "Neotia Getwel Hospital", type: "Private", verified: true,
    address: "Uttorayon Township, Siliguri", city: "Siliguri", distanceKm: 5.8, driveMin: 22,
    rating: 4.5, reviews: 312,
    beds: { general: 0, generalTotal: 60, icu: 0, icuTotal: 12, ot: false, ambulance: true },
    updatedMinAgo: 1,
    specialties: ["Cardiology", "Neurology", "Transplant"],
    phone: "+91 353 666 8888", emergencyPhone: "+91 353 666 8000", bloodBank: true,
    pin: { x: 25, y: 70 },
  },
];

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Rajesh Sharma", initials: "RS", specialty: "Cardiologist", experience: 18, rating: 4.8, fee: 500, hospitalId: "nbmc", nextSlot: "Today 10:00 AM", avatarColor: "primary" },
  { id: "d2", name: "Dr. Priya Das", initials: "PD", specialty: "Cardiologist", experience: 12, rating: 4.6, fee: 450, hospitalId: "nbmc", nextSlot: "Today 2:30 PM", avatarColor: "success" },
  { id: "d3", name: "Dr. Arjun Mehta", initials: "AM", specialty: "Neurologist", experience: 15, rating: 4.7, fee: 700, hospitalId: "nbmc", nextSlot: "Tomorrow 11:00 AM", avatarColor: "warning" },
  { id: "d4", name: "Dr. Sneha Roy", initials: "SR", specialty: "Pediatrician", experience: 9, rating: 4.9, fee: 400, hospitalId: "citymed", nextSlot: "Today 4:00 PM", avatarColor: "emergency" },
  { id: "d5", name: "Dr. Vikram Bose", initials: "VB", specialty: "Orthopedic", experience: 22, rating: 4.5, fee: 600, hospitalId: "citymed", nextSlot: "Today 6:00 PM", avatarColor: "primary" },
];

export interface ClinicDoctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  clinicName: string;
  address: string;
  city: string;
  phone: string;
  nextSlot: string;
  avatarColor: string;
  about: string;
  qualifications: string[];
  languages: string[];
  timings: string;
}

export const clinicDoctors: ClinicDoctor[] = [
  {
    id: "c1", name: "Dr. Anil Kapoor", initials: "AK", specialty: "Dermatologist",
    experience: 14, rating: 4.8, reviews: 184, fee: 600,
    clinicName: "SkinCare Clinic", address: "Hill Cart Road, Near City Centre", city: "Siliguri",
    phone: "+91 98765 11122", nextSlot: "Today 5:00 PM", avatarColor: "primary",
    about: "Board-certified dermatologist specializing in cosmetic and clinical skin care with 14+ years of experience.",
    qualifications: ["MBBS", "MD Dermatology", "Fellow IADVL"],
    languages: ["English", "Hindi", "Bengali"],
    timings: "Mon–Sat · 10am–1pm, 4pm–8pm",
  },
  {
    id: "c2", name: "Dr. Meera Iyer", initials: "MI", specialty: "Gynecologist",
    experience: 17, rating: 4.9, reviews: 312, fee: 700,
    clinicName: "Mother & Child Clinic", address: "Sevoke Road, Near Cosmos Mall", city: "Siliguri",
    phone: "+91 98765 22233", nextSlot: "Tomorrow 11:00 AM", avatarColor: "success",
    about: "Senior consultant gynecologist with expertise in high-risk pregnancy and laparoscopic surgery.",
    qualifications: ["MBBS", "MD Gynaecology", "DGO"],
    languages: ["English", "Hindi", "Tamil"],
    timings: "Mon–Fri · 9am–2pm",
  },
  {
    id: "c3", name: "Dr. Sandeep Roy", initials: "SR", specialty: "Dentist",
    experience: 10, rating: 4.7, reviews: 96, fee: 350,
    clinicName: "Smile Dental Studio", address: "Pradhan Nagar, Main Road", city: "Siliguri",
    phone: "+91 98765 33344", nextSlot: "Today 6:30 PM", avatarColor: "warning",
    about: "Cosmetic and implant dentist offering painless treatment using modern equipment.",
    qualifications: ["BDS", "MDS Prosthodontics"],
    languages: ["English", "Bengali", "Hindi"],
    timings: "Tue–Sun · 11am–8pm",
  },
  {
    id: "c4", name: "Dr. Kavita Sharma", initials: "KS", specialty: "Pediatrician",
    experience: 12, rating: 4.9, reviews: 220, fee: 500,
    clinicName: "Little Stars Child Clinic", address: "Ashrampara Lane", city: "Siliguri",
    phone: "+91 98765 44455", nextSlot: "Today 4:00 PM", avatarColor: "emergency",
    about: "Child specialist focused on newborn care, vaccinations, and developmental pediatrics.",
    qualifications: ["MBBS", "MD Pediatrics", "DCH"],
    languages: ["English", "Hindi"],
    timings: "Mon–Sat · 10am–1pm, 5pm–8pm",
  },
  {
    id: "c5", name: "Dr. Rohan Bose", initials: "RB", specialty: "Physiotherapist",
    experience: 8, rating: 4.6, reviews: 78, fee: 400,
    clinicName: "ActiveLife Physio", address: "Subhaspally", city: "Siliguri",
    phone: "+91 98765 55566", nextSlot: "Today 7:00 PM", avatarColor: "primary",
    about: "Sports and orthopedic physiotherapist with manual therapy and rehab specialization.",
    qualifications: ["BPT", "MPT Orthopedics"],
    languages: ["English", "Bengali"],
    timings: "Mon–Sat · 8am–8pm",
  },
  {
    id: "c6", name: "Dr. Neha Gupta", initials: "NG", specialty: "ENT Specialist",
    experience: 11, rating: 4.7, reviews: 142, fee: 450,
    clinicName: "ClearSound ENT Clinic", address: "Sevoke More", city: "Siliguri",
    phone: "+91 98765 66677", nextSlot: "Tomorrow 10:30 AM", avatarColor: "success",
    about: "ENT consultant with expertise in micro-ear surgery, sinus and voice disorders.",
    qualifications: ["MBBS", "MS ENT"],
    languages: ["English", "Hindi", "Bengali"],
    timings: "Mon–Sat · 11am–2pm, 5pm–8pm",
  },
];

export const reviews = [
  { id: "r1", name: "Anita Kumar", verified: true, rating: 5, date: "2 weeks ago", comment: "Doctors were attentive and the OPD was well organised. Bed availability matched what was shown on the app." },
  { id: "r2", name: "Rajiv Sen", verified: true, rating: 4, date: "1 month ago", comment: "Smooth booking. ICU staff were responsive during my father's admission." },
  { id: "r3", name: "Meera Pal", verified: false, rating: 4, date: "1 month ago", comment: "Clean facility, slightly long wait at registration but the cardiology team was excellent." },
];

export const timeSlots = [
  { time: "9:00 AM", state: "taken" as const },
  { time: "9:30 AM", state: "taken" as const },
  { time: "10:00 AM", state: "next" as const },
  { time: "10:30 AM", state: "free" as const },
  { time: "11:00 AM", state: "free" as const },
  { time: "11:30 AM", state: "taken" as const },
  { time: "12:00 PM", state: "free" as const },
  { time: "2:00 PM", state: "free" as const },
  { time: "2:30 PM", state: "free" as const },
  { time: "3:00 PM", state: "taken" as const },
];

export const myBookings = [
  { id: "MED-8824", doctor: "Dr. Rajesh Sharma", specialty: "Cardiologist", hospital: "North Bengal Medical College", date: "Fri, 2 May", time: "10:00 AM", status: "Confirmed" as const, fee: 500 },
  { id: "MED-8801", doctor: "Dr. Sneha Roy", specialty: "Pediatrician", hospital: "CityMed Multispeciality", date: "Sat, 12 Apr", time: "4:00 PM", status: "Completed" as const, fee: 400 },
  { id: "MED-8788", doctor: "Dr. Vikram Bose", specialty: "Orthopedic", hospital: "CityMed Multispeciality", date: "Mon, 7 Apr", time: "6:30 PM", status: "Completed" as const, fee: 600 },
];

export interface Lab {
  id: string;
  name: string;
  certified: string;
  address: string;
  rating: number;
  homeCollection: boolean;
  testsCount: number;
}

export interface LabTest {
  id: string;
  name: string;
  category: "Blood" | "Urine" | "Scan" | "Culture";
  sample: string;
  reportHrs: number;
  fasting: string;
  price: number;
  homeCollection: boolean;
  walkIn: boolean;
  labId: string;
}

export const labs: Lab[] = [
  { id: "pathlab", name: "PathLab Diagnostics", certified: "NABL accredited", address: "Sevoke Road, Siliguri", rating: 4.6, homeCollection: true, testsCount: 120 },
  { id: "metropolis", name: "Metropolis Labs", certified: "NABL · CAP", address: "Hill Cart Road, Siliguri", rating: 4.7, homeCollection: true, testsCount: 240 },
  { id: "thyrocare", name: "Thyrocare Centre", certified: "NABL accredited", address: "Sevoke More, Siliguri", rating: 4.4, homeCollection: false, testsCount: 90 },
];

export const labTests: LabTest[] = [
  { id: "cbc", name: "Complete Blood Count (CBC)", category: "Blood", sample: "Blood", reportHrs: 4, fasting: "Not required", price: 180, homeCollection: true, walkIn: true, labId: "pathlab" },
  { id: "thyroid", name: "Thyroid Profile (T3, T4, TSH)", category: "Blood", sample: "Blood", reportHrs: 6, fasting: "Required", price: 320, homeCollection: true, walkIn: false, labId: "pathlab" },
  { id: "lipid", name: "Lipid Profile", category: "Blood", sample: "Blood", reportHrs: 4, fasting: "12hr fasting required", price: 250, homeCollection: true, walkIn: true, labId: "pathlab" },
  { id: "urine-r", name: "Urine Routine", category: "Urine", sample: "Urine", reportHrs: 3, fasting: "Not required", price: 120, homeCollection: true, walkIn: true, labId: "pathlab" },
  { id: "vit-d", name: "Vitamin D3", category: "Blood", sample: "Blood", reportHrs: 24, fasting: "Not required", price: 850, homeCollection: true, walkIn: true, labId: "pathlab" },
  { id: "covid", name: "COVID-19 RT-PCR", category: "Culture", sample: "Swab", reportHrs: 12, fasting: "Not required", price: 500, homeCollection: false, walkIn: true, labId: "pathlab" },
  { id: "usg", name: "Ultrasound — Abdomen", category: "Scan", sample: "Imaging", reportHrs: 2, fasting: "6hr fasting", price: 1200, homeCollection: false, walkIn: true, labId: "pathlab" },
  { id: "hba1c", name: "HbA1c (Diabetes)", category: "Blood", sample: "Blood", reportHrs: 6, fasting: "Not required", price: 420, homeCollection: true, walkIn: true, labId: "pathlab" },
];

export const sosContacts = [
  { id: 1, name: "Sanjana Das", relation: "Wife", phone: "+91 98765 12345", whatsapp: true },
  { id: 2, name: "Anil Das", relation: "Father", phone: "+91 98220 54321", whatsapp: true },
  { id: 3, name: "Dr. Family Physician", relation: "Doctor", phone: "+91 99110 88002", whatsapp: false },
];
