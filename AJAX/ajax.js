~function () {
  class ajaxClass {
    // => send ajax
    init () {
      // => this: example
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && /^[23]\d{2}/.test(xhr.status)) {
          let result = xhr.responseText;
          // => dataType
          try {
            switch (this.dataType.toUpperCase()) {
              case 'TEXT':
              case 'HTML':
                result = result;
                break;
              case 'JSON':
                result = JSON.parse(result);
                break;
              case 'XML':
                result = xhr.responseXML;
            }
          } catch (error) {
            
          }
          this.success(result);
        }
      };

      // => data
      if (this.data !== null) {
        this.formatData();

        if (this.isGet) {
          this.url += this.querySymbol() + this.data;
          this.data = null;
        }
      }

      // => CACHE
      this.isGet ? this.cacheFn() : null;

      xhr.open(this.method, this.url, this.async);
      xhr.send(this.data);
    }

    // => convert the passed object data to string data
    formatData () {
      // => this: example
      if (Object.prototype.toString.call(this.data) === '[object Object]') {
        let obj = this.data,
            str = ``;
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            str += `${key}=${obj[key]}&`;
          }
        }
        str.replace(/&$/g, '');
        this.data = str;
      }
    }

    cacheFn () {
      // => this: example
      this.cache ? null : this.url += `${this.querySymbol()}_=${Math.random()}`;
    }

    querySymbol () {
      // => this: example
      return this.url.indexOf('?') > -1 ? '&' : '?';
    }
  }

  // => init parameters
  window.ajax = function ({
    url = null,
    method = 'GET', 
    type = null, 
    data = null, 
    dataType = 'JSON', 
    cache = true, 
    async = true, 
    success = null
  } = {}) {
    // let example = new ajaxClass();
    let _this = new ajaxClass();
    ['url', 'method', 'data', 'dataType', 'cache', 'async', 'success'].forEach(item => {
      if (item === 'method') {
        _this.method = type === null ? method : type;
        return;
      }
      if (item === 'success') {
        _this.success = typeof success === 'function' ? success : new Function();
        return;
      }
      _this[item] = eval(item);
    });
    // example.url = url;
    // example.method = type === null ? method : type;
    // example.dataType = dataType;
    // example.data = data;
    // example.cache = cache;
    // example.async = async;
    // example.success = success || new Function();
    _this.isGet = /^(GET|DELETE|HEAD)$/i.test(_this.method);
    _this.init();
    return _this;
  };
}();