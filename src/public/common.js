Date.prototype.format = format => {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds(),
    'w+': Date.getWeek(this.getDay())
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
};
Date.getWeek = e => {
  this.aWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return this.aWeek[e];
}

if (!Array.isArray) {
  Array.isArray = arr => {
    return arr.__proto__ === Array.prototype
  }
}

if (!Array.from) {
  Array.from = arrayLike => {
    [].slice.call(arrayLike)
  }
  
}

const _ = {
  eventProxy:{
  },

  apiurl: location.href.indexOf('http://ty.qitouch.cn') > -1 ? 'http://ty.qitouch.cn:8081' : 'http://localhost:8081',

  debounce: function (func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    wait = Number(wait) || 0;
    if (options) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          result = wait - timeSinceLastCall;

      return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = new Date().getTime();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(new Date().getTime());
    }

    function debounced() {
      var time = new Date().getTime(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  },

  throttle: function (func, wait, options) {
    var leading = true,
        trailing = true;
    if (options) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return this.debounce(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  },

  ajax: function (options) {
    var ajaxSettings = {
      type: 'GET',
      url: '',
      success: function () {},
      complete: function () {},
      error: function () {},
      async: true,
      xhr: function () {
        return new window.XMLHttpRequest()
      },
      data: {},
      timeout: 0,
      cache: true,
      accepts: {
        script: 'text/javascript, application/javascript, application/x-javascript',
        json:   'application/json',
        xml:    'application/xml, text/xml',
        html:   'text/html',
        text:   'text/plain'
      }
    }
    function appendQuery(url, query) {
      if (query == '') return url
      return (url + '&' + query).replace(/[&?]{1,2}/, '?')
    }
   
    var settings = ajaxSettings;
    for (var key in ajaxSettings) {
      if (options[key] != undefined) {
        settings[key] = options[key];
      }
    }
    if(settings.data && settings.type == 'POST') {
      var obj = settings.data;
      var params = [];
      for(key in obj){
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      }
      settings.data = params.join('&').replace(/%20/g, '+')
    }
    // if (!settings.url) settings.url = window.location.toString()
    // if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
    if (settings.data && settings.type == 'GET'){
      if(typeof(settings.data) !== 'string'){
        var param = ''
        for(key in settings.data){
          param += '&'+ key + '=' + settings.data[key];
        }
        settings.data = param
      }
      settings.url = appendQuery(settings.url, settings.data)
    }
    if (settings.cache === false) {
      settings.url = appendQuery(settings.url, '_=' + new Date().getTime())
    }
    var headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout
    setHeader('Accept', '*/*')
    setHeader('X-Requested-With', 'XMLHttpRequest')
    if(settings.type == 'POST') {// post直接这样默认content-type了
      setHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    xhr.setRequestHeader = setHeader
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = function () {}
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ) {
          if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
            result = xhr.response
          else {
            result = xhr.responseText
          }
          settings.success(result);
        } else {
          settings.error([xhr.statusText, xhr.status ? 'error' : 'abort']);
        }
      }
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async)
    if(settings.type == 'POST') {
      for (name in headers) nativeSetHeader.apply(xhr, headers[name])
    }
    

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
      xhr.onreadystatechange = function(){}
      xhr.abort()
      settings.error('超时了');
    }, settings.timeout)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  },

  bindtouch: function (element_id, axis, start_callback, move_callback, end_callback) {
    let startIndex = 0,
        stopIndex = 0
    let w_element = document.querySelector('#' + element_id)
    let client_axis = 'Xx'.indexOf(axis) > -1 ? 'clientX' : 'clientY'
    this.bindEvent(w_element, 'touchstart', function (e) {
      startIndex = stopIndex = e.targetTouches[0][client_axis]
      if (start_callback) {
        start_callback(startIndex, stopIndex)
      }
    })
    this.bindEvent(w_element, 'touchmove', function (e) {
      stopIndex = e.targetTouches[0][client_axis]
      if (move_callback) {
        move_callback(startIndex, stopIndex)
      }
    })
    this.bindEvent(w_element, 'touchend', function (e) {
      if (end_callback) {
        end_callback(startIndex, stopIndex)
      }
    })
  },

  bindEvent: function (ele, e_name, func, useCapture = false) { // IE9+ 不支持addEventListener的浏览器需要使用attachEvent()
    let proxyName = ele.id + e_name
    this.eventProxy[proxyName] = func;
    if (Array.isArray(ele) || Array.isArray(Array.from(ele))) {
      for (i in ele) {
        ele[i].addEventListener(e_name, this.eventProxy[proxyName], useCapture)
      }
    } else {
      ele.addEventListener(e_name, this.eventProxy[proxyName], useCapture)
    }
  },

  unbindEvent: function (ele, e_name, useCapture = false) {
    if (Array.isArray(e_name)){
      for (let i in e_name) {
        if(this.eventProxy[ele.id+e_name[i]])
          ele.removeEventListener(e_name[i], this.eventProxy[ele.id + e_name[i]], useCapture);
      }
    } else {
      if (this.eventProxy[ele.id + e_name])
      ele.removeEventListener(e_name, this.eventProxy[ele.id + e_name], useCapture);
    }   
  }
}
export default _
