/**
 * College bus routes. Stop names are keys into `STOP_COORDS`
 * (busStopCoords.ts); road geometry is precomputed into busRouteGeometry.json
 * by scripts/build-bus-routes.mjs — re-run it after editing stops.
 */

export interface Contact {
  name: string;
  phone: string;
}

export interface BusRoute {
  no: number;
  stops: string[];
  incharge: Contact;
  driver: Contact;
}

export const BUS_ROUTES: BusRoute[] = [
  {
    no: 1,
    stops: ["L.B. Nagar Ring Road", "Kothapet", "Fruit Market", "Dilsukhnagar", "TV Tower", "Amberpet", "Shivam Road", "Vidyanagar", "RTC X Roads", "Musheerabad", "Chilkalguda X Roads", "JBS", "Diamond Point", "Sowjanya Colony", "MMR Gardens", "Dhulapally", "Suchitra", "MLRIT"],
    incharge: { name: "Mr. O. Venkanna", phone: "9177323882" },
    driver: { name: "Laxma Reddy", phone: "9701788665" },
  },
  {
    no: 2,
    stops: ["BN Reddy Nagar", "NGOs Colony", "Vanasthalipuram (Panama)", "L.B. Nagar", "Nagole", "Uppal X Roads", "Habsiguda", "Tarnaka", "NIN", "Sangeeth", "JBS", "Vikrampuri", "Tirumalgiri", "Dairy Farm", "Suchitra", "Pet Basheerabad", "Kompally", "MLRIT"],
    incharge: { name: "Dr. P. Yakaiah", phone: "9885010188" },
    driver: { name: "Venkatesh", phone: "9951926864" },
  },
  {
    no: 3,
    stops: ["Sangareddy Old Bus Stop", "Sangareddy New Bus Stop", "Collector Office", "Kowlampet", "Rudraram", "Isnapur", "Muthangi", "MLRIT"],
    incharge: { name: "Mr. Shivaraj", phone: "9951781050" },
    driver: { name: "Md. Ghouse", phone: "9866130703" },
  },
  {
    no: 4,
    stops: ["Attapur", "Attapur Ring Road", "Rethibowli", "Mehdipatnam", "NMDC", "Mahavir", "Lakdikapul", "Khairatabad", "Panjagutta", "Ameerpet", "Mythrivanam", "SR Nagar", "Erragadda", "Bharath Nagar", "JNTU", "HMT Hills", "Pragathi Nagar", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mr. B. Varija", phone: "9603367599" },
    driver: { name: "Md. Maqbul", phone: "9177410056" },
  },
  {
    no: 5,
    stops: ["Zoo Park", "City College", "Goshamahal", "Moazzam Jahi Market", "Public Gardens", "Tank Bund", "Ranigunj", "Begumpet", "HPS", "Greenlands", "Dharam Karan Road", "Balkampet", "Fatehnagar", "Balanagar X Roads", "Chintal", "Shapur", "Suraram", "MLRIT"],
    incharge: { name: "Mr. Narendar Rao", phone: "7981499483" },
    driver: { name: "Rehmath", phone: "9704209280" },
  },
  {
    no: 6,
    stops: ["Borabanda", "Motinagar", "Rahmath Nagar", "Yousufguda Check Post", "Krishnakanth Park", "AG Quarters", "ESI", "Moosapet", "Y Junction", "KPHB", "Pragathi Nagar", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mrs. Lakshmi", phone: "9550433259" },
    driver: { name: "Baba Fakruddin", phone: "9603968020" },
  },
  {
    no: 7,
    stops: ["Malkajgiri", "Anutex", "Anandbagh", "Neredmet", "CDMA", "Alwal", "Suchitra", "Kompally", "Gundlapochampally", "MLRIT"],
    incharge: { name: "Mr. Barath", phone: "7799647909" },
    driver: { name: "Shekar", phone: "9989867433" },
  },
  {
    no: 8,
    stops: ["Sagar Ring Road", "IS Sadan", "Govt Press", "Malakpet", "Chaderghat", "Kachiguda", "YMCA", "Narayanaguda X Roads", "Chikkadpally", "RTC X Roads", "Indira Park", "Lower Tank Bund", "Ranigunj", "Paradise", "Tadbund", "Bowenpally", "Dairy Farm", "Suchitra", "Pet Basheerabad", "Dhulapally", "Kompally", "Gundlapochampally", "MLRIT"],
    incharge: { name: "Mrs. Zohanna", phone: "7842793307" },
    driver: { name: "Shankar Naik", phone: "9603710075" },
  },
  {
    no: 9,
    stops: ["Image Hospital", "Shilparamam", "Hitech City", "Malaysian Township", "KPHB Temple Bus Stop", "KPHB Main Road (Remedy)", "JNTU", "HMT Hills", "Pragathi Nagar", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mrs. Vineashaa", phone: "9493581102" },
    driver: { name: "Parameshwar Rao", phone: "7382821303" },
  },
  {
    no: 10,
    stops: ["Kukatpally", "Vivekananda Nagar", "Allwyn Colony", "Jagadgirigutta", "Gajularamaram", "Shapur X Roads", "Jeedimetla", "Suraram", "Gandimaisamma", "MLRIT"],
    incharge: { name: "A. Shilpa", phone: "9160767550" },
    driver: { name: "Krishna", phone: "6303268173" },
  },
  {
    no: 11,
    stops: ["BHEL Old LIG", "BHEL New MIG", "BHEL Kaman", "Madinaguda", "Allwyn X Roads", "Miyapur", "Miyapur X Roads", "Bollaram", "Bachupally", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mr. M. Thirupalaiah", phone: "9959910282" },
    driver: { name: "Srishialam", phone: "8247598910" },
  },
  {
    no: 12,
    stops: ["Rampally X Roads", "Nagaram", "Dammaiguda", "Saket", "Kapra", "Radhika Theatre", "Neredmet X Roads", "Lal Bazar", "Lothkunta", "Lakdawala", "Risala Bazar", "Bolarum", "Kompally", "MLRIT"],
    incharge: { name: "Mr. A. Sai Kumar", phone: "7893974728" },
    driver: { name: "Mosinuddin", phone: "9502193525" },
  },
  {
    no: 13,
    stops: ["Kukatpally Metro", "KPHB", "JNTU", "Pragathi Nagar", "MLRIT"],
    incharge: { name: "Mrs. Vijaya Sree", phone: "6300807575" },
    driver: { name: "Saidulu", phone: "8886871545" },
  },
  {
    no: 14,
    stops: ["Kukatpally", "Vivekananda Nagar", "Reliance", "Park", "Nizampet X Roads", "Sangamithra", "Nizampet Village", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mr. Pradeep Kumar", phone: "9703995722" },
    driver: { name: "Sridhar Goud", phone: "7671812530" },
  },
  {
    no: 15,
    stops: ["Gachibowli", "AMB Mall", "Kondapur", "Allwyn X Roads", "Miyapur", "Miyapur X Roads", "Miyapur HDFC", "Bollaram", "Chaitanya College", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Ms. Alankruthi", phone: "9704855040" },
    driver: { name: "Raghu", phone: "9959279700" },
  },
  {
    no: 16,
    stops: ["Kukatpally Metro", "Kukatpally", "Vivekananda Nagar Main Road", "KPHB Road No. 1", "Sri Chaitanya College KPHB", "JNTU", "Nizampet X Roads", "Sangamithra", "Nizampet Village", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mrs. Durga Bhavani", phone: "9912965806" },
    driver: { name: "Rama Krishna", phone: "9550584271" },
  },
  {
    no: 17,
    stops: ["Boduppal", "Uppal", "Habsiguda", "Tarnaka", "NIN", "Chilkalguda X Roads", "Sangeeth", "Patny", "Tadbund", "New Bowenpally", "Ferozguda", "Balanagar BBR Hospital", "HAL", "IDPL", "Ganesh Nagar (Sha Theatre)", "Jeedimetla", "MLRIT"],
    incharge: { name: "Mr. Parsha Ramu", phone: "9000444614" },
    driver: { name: "Sudhakar", phone: "9640113978" },
  },
  {
    no: 18,
    stops: ["Beeramguda Kaman", "Lingampally", "Chandanagar", "Gangaram", "Madinaguda", "Miyapur", "Hydernagar", "JNTU", "HMT Hills", "Pragathi Nagar", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mrs. Nagamani", phone: "9676837194" },
    driver: { name: "Mahendar", phone: "9948382042" },
  },
  {
    no: 19,
    stops: ["KPHB Temple Bus Stop", "KPHB Main Road (Remedy)", "South India Shopping Mall", "Mahadevpuram", "Gajularamaram", "Shapur", "Suraram", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Dr. Jyothi", phone: "8106256781" },
    driver: { name: "Suresh", phone: "7032122001" },
  },
  {
    no: 20,
    stops: ["Lingampally", "Chandanagar", "Gangaram", "HUDA Colony", "Miyapur HDFC", "Bollaram", "Chaitanya College", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mr. P. Srinivas Reddy", phone: "9570412588" },
    driver: { name: "Shankar", phone: "7801068145" },
  },
  {
    no: 21,
    stops: ["AG Quarters", "ESI", "Bharath Nagar", "Moosapet", "Kukatpally", "Vivekananda Nagar Main Road", "JNTU", "HMT Hills", "Pragathi Nagar", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mrs. Shruthi Patel", phone: "9886338486" },
    driver: { name: "Lakki Ram", phone: "9912939397" },
  },
  {
    no: 22,
    stops: ["IDPL", "Ganesh Nagar (Sha Theatre)", "Jeedimetla", "Suraram", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mr. CH. Babaiah", phone: "9705631211" },
    driver: { name: "Chakrapani", phone: "9010323344" },
  },
  {
    no: 23,
    stops: ["Vivekananda Nagar", "Allwyn Colony", "Jagadgirigutta", "Asbestos Colony Kaman", "Gandhi Nagar", "Chintal", "Shapur", "Suraram", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mr. Hanmandulu", phone: "9160404652" },
    driver: { name: "Chari", phone: "9640042748" },
  },
  {
    no: 24,
    stops: ["Patancheru", "RC Puram", "Beeramguda Kaman", "Ashok Nagar", "Lingampally", "Chandanagar", "Gangaram", "HUDA Colony", "Miyapur HDFC", "Bollaram", "Chaitanya College", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mr. Gopal Krishna", phone: "9390025850" },
    driver: { name: "Krishna Reddy", phone: "9849104426" },
  },
  {
    no: 25,
    stops: ["New Bowenpally", "Ferozguda", "Balanagar BBR Hospital", "HAL", "IDPL", "Ganesh Nagar (Sha Theatre)", "Jeedimetla", "Suraram", "Gandimaisamma", "MLRIT"],
    incharge: { name: "Mrs. Usharani", phone: "9063226274" },
    driver: { name: "Mallesh", phone: "7382817336" },
  },
  {
    no: 26,
    stops: ["Sangareddy X Roads", "Rudraram", "Isnapur", "Muthangi", "Beeramguda Market", "Vijetha Super Market", "Raghavendra Colony", "BSR Colony", "Krishna Reddy Pet", "Sultanpur Ring Road", "Shambipur", "MLRIT"],
    incharge: { name: "Mr. Krishnudu", phone: "9701140893" },
    driver: { name: "Vittal", phone: "7661020931" },
  },
  {
    no: 27,
    stops: ["Lothkunta", "Alwal", "Suchitra", "Pet Basheerabad", "Dhulapally", "Kompally", "Gundlapochampally", "MLRIT"],
    incharge: { name: "Mrs. Nirisha", phone: "8019191471" },
    driver: { name: "Chandram", phone: "9000494401" },
  },
];
