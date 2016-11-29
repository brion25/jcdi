import Di from 'src/di';

const di = new Di();

di.addDependency({
  name : 'fetch',
  action : function(url, options = { method : 'GET' }) {
    return fetch(url, options)
      .then(response => response.json())
      .then(json => Promise.resolve(json))
  }
})

export default di;
