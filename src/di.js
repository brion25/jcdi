import * as functions from './di-functions';

const _apps = {};

class Di{
  constructor(){
    functions.initializeDependencies.call(this);

    this.addDependency = functions.addDependency.bind(this);
    this.addDependencies = functions.addDependencies.bind(this);
    this.getDependency = functions.getDependency.bind(this);
    this.invoke = functions.invoke.bind(this);
  }
}

export default new Di();

export function initialize(appName) {
  _apps[appName] = new Di();
  return _apps[appName];
}