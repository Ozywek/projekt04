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
};





console.log("Populating db...");

Object.entries(card_categories).forEach(([id, data]) => { 
  battles.Insert_Battle(
    data.name,
    data.year,
    data.description
  );
});