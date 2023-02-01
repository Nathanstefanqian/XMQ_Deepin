var carousel = document.getElementsByClassName("my-banner-layout");
var carousel_image_container = document.getElementsByClassName("my-banner");
var carousel_controller_left = document.getElementsByClassName("my-banner-leftarrow");
var carousel_controller_right = document.getElementsByClassName("my-banner-rightarrow");

var picIndex = 0;
var picwid = carousel.offsetWidth;

window.onresize = () => {
  picwid = carousel.offsetWidth;
}//function onresize(){picwid = carousel.offsetWidth;}

function Event() {
  if (picwid == carousel_image_container.children.length - 2) {  //判断是否为最后一张
    picIndex = 0;
    carousel_image_container.style.left = "0px";
  }
  picIndex++;
  animate(carousel_image_container, -picIndex * picwid)
}

// 右边按钮单机事件
carousel_controller_right.onclick = Event;

// 左边按钮单击事件
carousel_controller_left.onclick = function () {
  if (picIndex == 0) {// 判断当前是否是第一张
    picIndex = carousel_image_container.children.length - 2;
    carousel_image_container.style.left = (-picIndex * picWidth) + "px";
  }
  picIndex--;  // 将索引切换到前一张图片
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