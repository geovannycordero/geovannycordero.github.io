const experienceData = require('../data/experience.json');

// ponytail: no sorting — the JSON is already in display order.
function getExperience() {
  return experienceData;
}

module.exports = { getExperience };
