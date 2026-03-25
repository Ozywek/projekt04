import user from "../models/user.js";
import battles from "../models/battles.js";
const card_categories = {
  "bitwa1": {
    name: "Bitwa pod Azincourt",
    year: 1415,
    description: "Bitwa stoczona 25 października 1415 roku podczas wojny stuletniej.",
  },
  "bitwa2": {
    name: "Bitwa pod Waterloo",
    year: 1815,
    description: "Bitwa stoczona 18 czerwca 1815 roku, która zakończyła wojny napoleońskie.",
  },

  "bitwa3": {
    name: "Bitwa pod Grunwaldem",
    year: 1410,
    description: "Jedna z największych bitew średniowiecznej Europy, zwycięstwo wojsk polsko-litewskich nad zakonem krzyżackim.",
  },
  "bitwa4": {
    name: "Bitwa pod Hastings",
    year: 1066,
    description: "Decydująca bitwa podboju Anglii przez Normanów.",
  },
  "bitwa5": {
    name: "Bitwa pod Kannami",
    year: -216,
    description: "Jedno z największych zwycięstw Hannibala nad armią rzymską.",
  },
  "bitwa6": {
    name: "Bitwa pod Termopilami",
    year: -480,
    description: "Heroiczna obrona wąwozu przez Spartan przeciwko Persom.",
  },
  "bitwa7": {
    name: "Bitwa pod Salaminą",
    year: -480,
    description: "Decydująca morska bitwa Greków przeciwko Persji.",
  },
  "bitwa8": {
    name: "Bitwa pod Maratonem",
    year: -490,
    description: "Zwycięstwo Ateńczyków nad Persami.",
  },
  "bitwa9": {
    name: "Bitwa pod Stalingradem",
    year: 1942,
    description: "Jedna z najkrwawszych bitew II wojny światowej, punkt zwrotny na froncie wschodnim.",
  },
  "bitwa10": {
    name: "Bitwa pod Kurskiem",
    year: 1943,
    description: "Największa bitwa pancerna w historii.",
  },
  "bitwa11": {
    name: "Bitwa o Anglię",
    year: 1940,
    description: "Powietrzna kampania między Niemcami a Wielką Brytanią.",
  },
  "bitwa12": {
    name: "Bitwa pod Midway",
    year: 1942,
    description: "Przełomowa bitwa morska na Pacyfiku.",
  },
  "bitwa13": {
    name: "Bitwa pod Somme",
    year: 1916,
    description: "Jedna z najkrwawszych bitew I wojny światowej.",
  },
  "bitwa14": {
    name: "Bitwa pod Verdun",
    year: 1916,
    description: "Długotrwała bitwa wyniszczająca między Francją a Niemcami.",
  },
  "bitwa15": {
    name: "Bitwa pod Austerlitz",
    year: 1805,
    description: "Jedno z największych zwycięstw Napoleona.",
  },
  "bitwa16": {
    name: "Bitwa pod Lipskiem",
    year: 1813,
    description: "Bitwa Narodów, największa bitwa epoki napoleońskiej.",
  },
  "bitwa17": {
    name: "Bitwa pod Borodino",
    year: 1812,
    description: "Krwawe starcie podczas wyprawy Napoleona na Rosję.",
  },
  "bitwa18": {
    name: "Bitwa pod Gettysburgiem",
    year: 1863,
    description: "Punkt zwrotny wojny secesyjnej w USA.",
  },
  "bitwa19": {
    name: "Bitwa pod Yorktown",
    year: 1781,
    description: "Decydująca bitwa wojny o niepodległość USA.",
  },
  "bitwa20": {
    name: "Bitwa pod Poitiers",
    year: 1356,
    description: "Zwycięstwo Anglików nad Francją w wojnie stuletniej.",
  },
  "bitwa21": {
    name: "Bitwa pod Crecy",
    year: 1346,
    description: "Jedna z pierwszych wielkich bitew wojny stuletniej.",
  },
  "bitwa22": {
    name: "Bitwa pod Bannockburn",
    year: 1314,
    description: "Szkockie zwycięstwo nad Anglikami.",
  },
  "bitwa23": {
    name: "Bitwa pod Tannenbergiem",
    year: 1914,
    description: "Zwycięstwo Niemiec nad Rosją w I wojnie światowej.",
  },
  "bitwa24": {
    name: "Bitwa pod Moskwą",
    year: 1941,
    description: "Zatrzymanie niemieckiej ofensywy na ZSRR.",
  },
  "bitwa25": {
    name: "Bitwa pod El Alamein",
    year: 1942,
    description: "Zwycięstwo aliantów w Afryce Północnej.",
  },
  "bitwa26": {
    name: "Bitwa o Ardeny",
    year: 1944,
    description: "Ostatnia duża ofensywa Niemiec na froncie zachodnim.",
  },
  "bitwa27": {
    name: "Bitwa pod Sedanem",
    year: 1870,
    description: "Decydująca bitwa wojny francusko-pruskiej.",
  },
  "bitwa28": {
    name: "Bitwa pod Inkermanem",
    year: 1854,
    description: "Bitwa wojny krymskiej.",
  },
  "bitwa29": {
    name: "Bitwa pod Trafalgarem",
    year: 1805,
    description: "Decydujące zwycięstwo brytyjskiej floty nad Francją i Hiszpanią.",
  },
  "bitwa30": {
    name: "Bitwa pod Lepanto",
    year: 1571,
    description: "Wielka bitwa morska między flotą chrześcijańską a Imperium Osmańskim.",
  },
  "bitwa31": {
    name: "Bitwa pod Wiedniem",
    year: 1683,
    description: "Zwycięstwo wojsk Jana III Sobieskiego nad Turkami.",
  },
  "bitwa32": {
    name: "Bitwa pod Culloden",
    year: 1746,
    description: "Ostatnia bitwa na ziemi brytyjskiej.",
  }
};

console.log("Populating db...");

// Create admin user first
let admin = await user.createUser("admin", "changeme");
if (admin) {
  let errMsg = user.addAttribute(admin.id, "is_admin", true);
  if (errMsg) {
    console.error(errMsg);
  }
  console.log("Admin user created");
}

// Create student user
let student = await user.createUser("student", "changeme");
if (student) {
  console.log("Student user created");
}

// Now insert battles with admin as author
Object.entries(card_categories).forEach(([id, data]) => {
  console.log(`Inserting battle: ${data.name}`);
  
  battles.Insert_Battle(
    data.name,
    data.year,
    data.description,
    admin.id
  );
});