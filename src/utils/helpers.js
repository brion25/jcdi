function addDependency (dependenciesMap, dependencyName, dependency) {
  dependenciesMap.set(dependencyName, dependency);
}

function addDependencies (dependenciesMap, dependenciesObj) {
  Object.keys(dependenciesObj).forEach(dependencyName => {
    dependenciesMap.set(dependencyName, dependenciesObj[dependencyName]);
  })
}

function getDependency (dependenciesMap, dependencyName) {
  return dependenciesMap.get(dependencyName);
}

module.exports = {
  addDependency: addDependency,
  addDependencies: addDependencies,
  getDependency: getDependency
};
