# N宫格抽奖

实现9宫格/12宫格等类似格子抽奖的 JS 组件 - 无依赖([UMD](https://github.com/umdjs/umd))版, 适用于全局使用或者作为 AMD 模块使用.

## Usage


## Api

### 构造参数
```javascript
var lottery = new Lottery({
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
lottery.start();

/**
 * 停止抽奖
 * 
 * @param  {number}   index 表示动画停在哪个奖品序号，奖品序号按从0开始左上角顺时针排列
 * @param  {Function} cb    动画停止后执行的回调函数
 * @param  {*}        ctx   回调函数的上下文
 */
lottery.stop(stopIndex, cb, ctx);
```
