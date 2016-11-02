import * as functions from './di-functions';

export default class Di{
  constructor(){
    functions.initializeDependencies.call(this);

    this.addDependency = functions.addDependency.bind(this);
    this.addDependencies = functions.addDependencies.bind(this);
    this.getDependency = functions.getDependency.bind(this);
    this.invoke = functions.invoke.bind(this);
  }
}
