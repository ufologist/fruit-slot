# 经典水果机抽奖

用于9宫格/12宫格等格子似的抽奖表现形式.

fork 版主要是去除了[@twlk28 的版本](https://github.com/duowan/lottery)中依赖的一些第三方库(例如: jQuery), 实现成无依赖([UMD](https://github.com/umdjs/umd))版, 适合作为一个很小的功能模块快速集成到项目中全局使用或作为 AMD 模块使用.

## Usage


## Api

### 构造参数
```javascript
var fruitSlot = new FruitSlot({
    el: '#J_lottery1', // 抽奖容器元素，默认值`body`，页面有多个抽奖动画时，需指定
    lottoItem: '[data-lotto-item]', // 用来指定抽奖容器内的奖品元素，默认值`[data-lotto-item]`
    activeClass: 'lotto__item--hover' // 执行抽奖动画时切换的样式名，默认值`lotto__item--hover`
});
```

### 方法
```javascript
/**
 * 开始抽奖
 */
fruitSlot.start();

/**
 * 停止抽奖
 * 
 * @param  {number}   index 表示动画停在哪个奖品序号，奖品序号按从0开始左上角顺时针排列
 * @param  {Function} cb    动画停止后执行的回调函数
 * @param  {*}        ctx   回调函数的上下文
 */
fruitSlot.stop(index, cb, ctx);
```

## 浏览器兼容性
要使用该组件需要浏览器支持以下特性
* Array.forEach ES5(IE9+才支持)
* querySelector / querySelectorAll
* classList
* getBoundingClientRect

如果你需要兼容老版本的浏览器, 请使用 [@twlk28 的版本](https://github.com/duowan/lottery)