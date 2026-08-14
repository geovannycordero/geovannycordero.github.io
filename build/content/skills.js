const skillsData = require('../data/skills.json');

function getSkillCategories() {
  return skillsData;
}

module.exports = { getSkillCategories };
