# 经典水果机抽奖
[fruit-slot.js](https://github.com/ufologist/fruit-slot/blob/master/src/fruit-slot.js)@[2.1.0](https://github.com/ufologist/fruit-slot/blob/master/CHANGELOG.md)

![fruit-slot-classic](http://ufologist.github.io/fruit-slot/fruit-slot-classic.png)

用于9宫格/12宫格等格子似的抽奖表现形式.

fork 后去除了[@twlk28 版本](https://github.com/duowan/lottery)中依赖的第三方库(例如: jQuery). 现在是无依赖([UMD](https://github.com/umdjs/umd))版, 适合作为一个很小的功能模块集成到项目中全局使用或作为 AMD/CMD 模块使用.

## Usage
组件本身只提供了抽奖的逻辑处理, 具体的抽奖样式, 可以自己任意发挥, 具体使用方法请参考[演示示例](http://ufologist.github.io/fruit-slot)

## Api

### 构造参数
```javascript
var fruitSlot = new FruitSlot({
    el: '#J_lottery1', // 抽奖容器元素，默认值 body，页面有多个抽奖动画时，需指定
    lottoItem: '[data-lotto-item]', // 用来指定抽奖容器内的奖品元素，默认值 [data-lotto-item]
    activeClass: 'lotto__item--hover', // 执行抽奖动画时切换的样式名，默认值 lotto__item--hover
    lottoArr: lottoArr // 手工指定奖品元素的顺序, 例如想将默认的顺时针元素排列改为逆时针排列, 只要你控制了元素的顺序就控制了抽奖动画执行的顺序
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
 * @param  {number}   index 表示动画停在哪个奖品序号，奖品序号从0开始以左上角顺时针排列
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