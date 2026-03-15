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

function getBattleSummaries() {
  return Object.entries(card_categories).map(([id, category]) => {
    return { id: id, name: category.name, year: category.year };
  });
}

function getBattle(battle_id) {
  if (card_categories.hasOwnProperty(battle_id)) {
    return card_categories[battle_id];
  } else {
    return null;
  }
}

function addBattle(id, battle) {
  card_categories[id] = battle;
}

export default {
  getBattleSummaries,
  getBattle,
  addBattle
};