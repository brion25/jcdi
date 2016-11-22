import * as helpers from './di-helpers';

const _appDependencies = Symbol('dependencies');
const EXTRACT_FUNC_PARAMS_REGEX = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
const WHITE_SPACE_REGEX = /\s/g;

export function initializeDependencies(){
  this[_appDependencies] = new Map();
}

export function addDependency(dependency){
  if(helpers.validateDependency(typeof dependency, dependency)){
    this[_appDependencies].set(dependency.name, (dependency.hasOwnProperty('action')) ? dependency.action : dependency);
  }
}

export function addDependencies(dependencies){
  dependencies.forEach((dependency) => this.addDependency(dependency));
}

export function getDependency(name){
  return this[_appDependencies].get(name);
}

export function invoke(callback, context){
  let dependencies = null;
  if(Array.isArray(callback)){
    dependencies = callback;
    callback = callback.pop();
    return () => callback.apply(context || callback,helpers.parseDependencies.call(this,dependencies));
  }else{
    let cbStringify = callback.toString(),
        params = EXTRACT_FUNC_PARAMS_REGEX.exec(cbStringify);

    if(!params || !params[1]) return callback.bind(context || callback);
    else params = params[1].replace(WHITE_SPACE_REGEX,'');

    dependencies = helpers.parseDependencies.call(this,params);
    return () => callback.apply(context || callback,dependencies);
  }
}
