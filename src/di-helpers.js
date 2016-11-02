const TYPE_VALIDATION_STRATEGY = {
  'function' : (dependency) => {
    console.warn('This dependency is not going to be accesable if you minified your code');
    if(!dependency.name){
      console.error('Each dependency must have a name');
      return false;
    }
    return true;
  },
  'object' : (dependency) => {
    if(!dependency.name){
      console.error('Each dependency must have a name');
      return false;
    }else if(!dependency.action){
      console.error('Each object dependency must have an action: ', dependency.name);
      return false;
    }else if(typeof dependency.action !== 'function' && typeof dependency.action !== 'object'){
      console.error('This is not a valid dependency callback: ', dependency.action);
      return false;
    }
    return true;
  }
}

export function parseDependencies(params){
  if(typeof params === 'string') params = params.split(',');
  return params.map((param) => this.getDependency(param));
}
export function validateDependency(againstType, dependency){
  if(TYPE_VALIDATION_STRATEGY.hasOwnProperty(againstType)) return TYPE_VALIDATION_STRATEGY[againstType](dependency);
  else console.warn('The dependency you want to add is not valid: ', dependency);
}
