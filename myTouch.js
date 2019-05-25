; (function () {
  const myJquery = function (ele) {
    return myJquery.prototype.init(ele);
  }
  myJquery.fn = myJquery.prototype = {
    init(selector) {
      if (typeof selector == 'string') {
        // 查找id class
        var dom = document.querySelectorAll(selector);
        for (var i = 0; i < dom.length; i++) {
          this.push(dom[i])
        }
      }
      return this; // 链式调用 
    },
    push: [].push,
    splice: [].splice, // 强化对象方法
    swipeLeft(fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('touchstart', touchfn);
        this[i].addEventListener('touchend', touchfn);
      }
      let startX, startY, endX, endY;
      function touchfn(e) {
        let firstTouch = e.changedTouches[0];
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;

            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;

            if (Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25 && endX- startX <=0) {
              fn.call(this, e);
            }
            break;
        }
      }
    },
    swipeRight(fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('touchstart', touchfn);
        this[i].addEventListener('touchend', touchfn);
      }
      let startX, startY, endX, endY;
      function touchfn(e) {
        let firstTouch = e.changedTouches[0];
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;

            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;

            if (Math.abs(endX - startX) >= Math.abs(endY - startY) && endX - startX >= 25 && endX- startX >0) {
              fn.call(this, e);
            }
            break;
        }
      }
    },
    /**
     * @function [移动端click事件存在300ms延迟]
     * @param {*} fn tap回调函数
     */
    tap(fn) {
      this.ele.addEventListener('touchstart', touchfn);
      this.ele.addEventListener('touchend', touchfn);
      let startTime, endTime;
      function touchfn(e) {
        e.preventDefault();
        switch (e.type) {
          case 'touchstart':
            startTime = new Date() * 1;
            break;
          case 'touchend':
            endTime = new Date() * 1;
            if (endTime - startTime >= 300) {
              fn.call(this, e)
            }
            break;
        }
      }
    }
  }

  myJquery.fn.init.prototype = myJquery.fn
  window._$ = window.myJquery = myJquery;

})()