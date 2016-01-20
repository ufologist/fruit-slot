/**
 * 经典水果机抽奖 JS 组件
 *
 * 用于9宫格/12宫格等格子似的抽奖表现形式
 *
 * @version 2.0.0 2016/1/20
 * @author https://github.com/ufologist/fruit-slot
 * @author https://github.com/duowan/lottery
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
    // [UMD](https://github.com/umdjs/umd)
    if(typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define([], factory);
    } else if(typeof exports === 'object') {
        exports['FruitSlot'] = factory();
    } else {
        root['FruitSlot'] = factory();
    }
})(this, function() {
    var STATUS_STARTING = 1, STATUS_STOPPING = 2, STATUS_STOPPED = 3,
        SPEED_HIGH = 50, SPEED_LOW = 300;

    var defaults = {
        el: "body",
        lottoItem: "[data-lotto-item]",
        activeClass: "lotto__item--hover"
    };

    // utils
    // http://youmightnotneedjquery.com/#extend
    function extend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    }
    function _createCycleArr(lottoElements) {
        var arrSrc = [],arrOrder = [],arrDst = [],topMin = 9999,topMax = 0,leftMin = 9999,leftMax = 0,_arrTop = [],_arrBottom = [],_arrLeft = [], _arrRight = [];

        for (var i = 0, length = lottoElements.length; i < length; i++) {
            var lottoElement = lottoElements[i];
            var obj = lottoElement.getBoundingClientRect()
            obj.elem = lottoElement
            arrSrc.push(obj)
        }

        arrSrc.forEach(function(e) {
            topMin = e.top < topMin ? e.top : topMin;
            topMax = e.top > topMax ? e.top : topMax;
            leftMin = e.left < leftMin ? e.left : leftMin;
            leftMax = e.left > leftMax ? e.left : leftMax;
        })
        arrSrc.forEach(function(e) {
            e.top === topMin && _arrTop.push(e)
            e.top === topMax && _arrBottom.push(e)
            e.left === leftMin && _arrLeft.push(e)
            e.left === leftMax && _arrRight.push(e)
        })
        _arrTop.sort(function(a, b) {
            return a.left - b.left
        })
        _arrRight.sort(function(a, b) {
            return a.top - b.top
        })
        _arrBottom.sort(function(a, b) {
            return b.left - a.left
        })
        _arrLeft.sort(function(a, b) {
            return b.top - a.top
        })
        _arrTop = _arrTop.slice(0, _arrTop.length-1)
        _arrRight = _arrRight.slice(0, _arrRight.length-1)
        _arrBottom = _arrBottom.slice(0, _arrBottom.length-1)
        _arrLeft = _arrLeft.slice(0, _arrLeft.length-1)
        arrOrder = _arrTop.concat(_arrRight.concat(_arrBottom.concat(_arrLeft)))
        arrOrder.forEach(function(e) {
            arrDst.push(e.elem)
        })
        return arrDst
    }

    function FruitSlot(opts) {
        // 0. setup config
        var options = this.options = extend({}, defaults, opts)
        var arr = document.querySelector(options.el).querySelectorAll(options.lottoItem),
            lottoArr = _createCycleArr(arr), //格子们顺时针排好队
            activeClass = options.activeClass,
            finished = false, //一轮游戏结束转动标志 
            step = 0, //一轮游戏的计步数
            cycle = 0, //当前转动圈数   
            cycleTotal = 10, //一轮游戏的总转动圈数
            index = 0, //当前格
            indexPrev, //前一格
            indexStop = 0, //决定在哪一格停止
            indexSpeedUp = 5, //决定在哪一格加速
            indexSpeedDown = 0, //决定在哪一格减速
            timerId1, //定时器对象，开始
            timerId2, //定时器对象，结束
            that = this;
        that.status = STATUS_STOPPED

        // 1. reset config
        this._resetStart = function () {
            that.status = STATUS_STARTING
            lottoArr.forEach(function(el) {
                el.classList.remove(activeClass)  
            })
            indexSpeedUp = 5
        }
        this._resetStop = function () {
            that.status = STATUS_STOPPING
            finished = false
            cycle = 0
            cycleTotal = 3
            indexSpeedUp = 0
        }

        // 2. exec animation && callback
        this._start = function () {
            timerId1 = setInterval(move1, SPEED_LOW);
            function move1() {
                //走N格开始加速
                if (step == indexSpeedUp) {
                    clearInterval(timerId1);
                    timerId1 = setInterval(move1, SPEED_HIGH);
                }

                if (that.status === STATUS_STOPPING){
                    clearInterval(timerId1);
                }

                if (index >= lottoArr.length) {
                    index = 0
                }

                indexPrev = index > 0 ? index - 1 : lottoArr.length - 1
                lottoArr[indexPrev].classList.remove(activeClass)
                lottoArr[index].classList.add(activeClass)

                index++
                step++
            }
        } 
        this._stop = function (stopIndex, cb, cbCtx) {
            stopIndex = stopIndex || 0
            cb = cb || function(){}

            timerId2 = setInterval(move2, SPEED_HIGH);
            function move2() {   
                //跑马灯变速
                if (finished == false) {
                    //跑N圈减速
                    if (cycle > cycleTotal && index == 4) {
                        clearInterval(timerId2);
                        finished = true; //触发结束  
                        timerId2 = setInterval(move2, SPEED_LOW);
                    }
                }

                if (index >= lottoArr.length) {
                    index = 0;
                    cycle++;
                }

                indexPrev = index > 0 ? index - 1 : lottoArr.length - 1;
                lottoArr[index].classList.add(activeClass)
                lottoArr[indexPrev].classList.remove(activeClass)

                //结束转动并选中号码
                if (finished == true && index == stopIndex) {
                    clearInterval(timerId2)
                    step = 0
                    that.status = STATUS_STOPPED
                    cb.call(cbCtx)
                }

                index++
                step++
            }
        }
    }

    FruitSlot.prototype = {
        constructor: FruitSlot,
        /**
         * 开始抽奖
         */
        start: function(){
            if(this.status !== STATUS_STOPPED){
                return;
            }
            this._resetStart()
            this._start()
        },
        /**
         * 停止抽奖
         * 
         * @param  {number}   index 表示动画停在哪个奖品序号，奖品序号按从0开始左上角顺时针排列
         * @param  {Function} cb    动画停止后执行的回调函数
         * @param  {*}        ctx   回调函数的上下文
         */
        stop: function(index, cb, ctx){
            if(this.status !== STATUS_STARTING){
                return;
            }
            this._resetStop()
            this._stop(index, cb, ctx)
        }
    };

    return FruitSlot;
});