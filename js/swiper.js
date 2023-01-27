var carousel = document.getElementById("carousel");
var carousel_image_container = document.getElementById("my_banner_image");
var carousel_controller_left = document.getElementById("my_banner_leftarrow");
var carousel_controller_right = document.getElementById("my_banner_rightarrow");
// 设置全局变量
var picIndex = 0;
var picWidth = carousel.offsetWidth;

// 拷贝第一张图片到最后
carousel_image_container.appendChild(carousel_image_container.children[0].cloneNode(true));
// 该方法将复制并返回调用它的节点的副本。如果传递给它的参数是 true，它还将递归复制当前节点的所有子孙节点。否则，它只复制当前节点。

function Event() {
  // 判断当前图片是否为最后一张
  if (picIndex == carousel_image_container.children.length - 1) {
    // 0是第一张还是1是第一张？？？
    picIndex = 0;
    carousel_image_container.style.left = "0px"
  }
  // 将索引切换到下一张图片
  picIndex++;
  animate(carousel_image_container, -picIndex * picWidth)
}

// 右边按钮单机事件
carousel_controller_right.onclick = Event;

// 左边按钮单击事件
carousel_controller_left.onclick = function () {
  // 判断当前是否是第一张
  if (picIndex == 0) {
    picIndex = carousel_image_container.children.length - 1;
    carousel_image_container.style.left = (-picIndex * picWidth) + "px";
  }
  // 将索引切换到前一张图片
  picIndex--;
  animate(carousel_image_container, -picIndex * picWidth);
};


// 封装动画函数
function animate(element, target) {
  // 先清理定时器
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
    // 获取对象当前的位置
    var current = element.offsetLeft;
    // 每次移动多少像素
    var step = 15;
    // 判断是往正方向走还是往相反方向走
    step = current < target ? step : -step;
    // 每次移动后的距离
    current += step;
    // 判断当前移动后的位置是否到达目标位置
    if (Math.abs(target - current) > Math.abs(step)) {
      element.style.left = current + "px";
    } else {
      // 清理定时器
      clearInterval(element.timeId);
      element.style.left = target + "px";//直接赋值
    }
  }, 0.48);
}
// 设置自动播放
var timeId = setInterval(function () {
  Event();
}, 3000);

// 鼠标放上停止播放
carousel.onmouseover = function () {
  clearInterval(timeId);
};
// 鼠标离开开始播放
carousel.onmouseout = function () {
  timeId = setInterval(Event, 3000);
};