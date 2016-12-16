import * as helpers from './di-helpers';

const _appDependencies = new Map();


const EXTRACT_FUNC_PARAMS_REGEX = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
const WHITE_SPACE_REGEX = /\s/g;

export function getDependencies(){
  return _appDependencies
}

export function addDependency(dependency){
  const dependencyAction = dependency.hasOwnProperty('action') ? dependency.action : dependency

  if(helpers.validateDependency(typeof dependency, dependency)){
    _appDependencies.set(dependency.name, dependencyAction);
  }
}

export function addDependencies(dependencies){
  dependencies.forEach((dependency) => addDependency(dependency));
}

export function getDependency(name){
  return _appDependencies.get(name);
}

export function invoke(callback, context){
  let dependencies = null;

  if(!context) {
    context = callback;
  }

  if(Array.isArray(callback)){
    dependencies = callback;
    callback = callback.pop();
    return () => callback.apply(context, helpers.parseDependencies(dependencies, getDependency, context));
  }else{
    let cbStringify = callback.toString(),
      params = EXTRACT_FUNC_PARAMS_REGEX.exec(cbStringify);

    if(!params || !params[1]) return callback.bind(context || callback);
    else params = params[1].replace(WHITE_SPACE_REGEX,'');

    dependencies = helpers.parseDependencies(params, getDependency, context);
    return () => callback.apply(context || callback,dependencies);
  }
}

export function size() {
  return _appDependencies.size
}
