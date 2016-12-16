import Di from 'di';

Di.addDependency({
  name : 'fetch',
  action : function(url, options = { method : 'GET' }) {
    return fetch(url, options)
      .then(response => response.json())
      .then(json => Promise.resolve(json))
  }
})
