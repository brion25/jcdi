const helpers = require('./utils/helpers');
const regex = require('./utils/regex');

class Di {
  constructor() {
    this.dependencies = new Map();

    this.addDependency = helpers.addDependency.bind(this, this.dependencies);
    this.addDependencies = helpers.addDependencies.bind(this, this.dependencies);
    this.getDependency = this.getDependency.bind(this);
    this.invoke = this.invoke.bind(this);
  }

  getDependency(dependencyName) {
    let dependency = helpers.getDependency(this.dependencies, dependencyName);

    if (!dependency) {
      dependency = helpers.getDependency(Di.globalDependencies, dependencyName);
    }

    return dependency;
  }

  invoke(callback, context) {
    let dependencies = null;

    if (Array.isArray(callback)) {
      dependencies = callback;
      callback = dependencies.pop();
    } else if (typeof callback === 'function') {
      const cbStringify = callback.toString();
      const params = regex.EXTRACT_FUNC_PARAMS_REGEX.exec(cbStringify)[1];

      if (!params) {
        return callback;
      }

      dependencies = params.split(',');
    }

    return () => callback.apply(context || callback, dependencies.map(dependencyName => {
      const dependency = this.getDependency(dependencyName);

      if (typeof dependency === 'function') {
        return dependency.bind(context || callback)
      }

      return dependency
    }))
  }
}

Di.globalDependencies = new Map();
Di.addGlobalDependency = helpers.addDependency.bind(Di, Di.globalDependencies);
Di.addGlobalDependencies = helpers.addDependencies.bind(Di, Di.globalDependencies);
Di.getGlobalDependency = helpers.getDependency.bind(Di, Di.globalDependencies);

module.exports = Di;
