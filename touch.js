;
(function() {

    // var FN = function() {
    //   this.box = document.querySelectorAll('.box')

    // }
    // FN.prototype = {

    // }
    // new FN()

    // 1. 选择元素  2. 调用方法
    var Myjquery = function(ele) {
        return new Myjquery.fn.init(ele);
    }
    Myjquery.fn = Myjquery.prototype = {
        init: function(ele) {
            if (!ele) return this;
            if (typeof ele === 'string') {
                var doms = document.querySelectorAll(ele);
                for (var i = 0; i < doms.length; i++) {
                    this.push(doms[i])
                }
            }
            //  链式调用的
            return this;
        },
        push: [].push,
        swipeLeft: function(fn) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchstart', touchfn)
                this[i].addEventListener('touchend', touchfn)
            }
            let startx, starty, endx, endy;

            function touchfn(e) {
                var firstTouch = e.changedTouches[0];

                switch (e.type) {
                    case 'touchstart':
                        startx = firstTouch.pageX;
                        starty = firstTouch.pageY;
                        break;
                    case 'touchend':
                        endx = firstTouch.pageX;
                        endy = firstTouch.pageY;
                        if (Math.abs(endx - startx) >= Math.abs(endy - starty) && endx - startx < 0) {
                            fn.call(this, e)
                        }
                        break;
                }
            }
        },
        tap: function(fn) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchstart', touchfn)
                this[i].addEventListener('touchend', touchfn)
            }
            let startTime, endTime;

            function touchfn(e) {
                switch (e.type) {
                    case 'touchstart':
                        startTime = new Date * 1;
                        break;
                    case 'touchend':
                        endTime = new Date * 1;
                        if (endTime - startTime >= 300) {
                            fn.call(this, e)
                        }
                        break;
                }
            }
        }
    }

    //   打通作用域链
    Myjquery.fn.init.prototype = Myjquery.fn
    window._$ = window.Myjquery = Myjquery

})()