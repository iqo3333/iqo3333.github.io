const lines = [
  "欢迎使用林澈.LYC-CDN服务",
  "你可以联系我将你的文件存放在我这里，以帮助你随时随地访问下载",
  "——林澈.LYC"
];

function typeWriter(elementId, text, delay = 40, callback) {
  const el = document.getElementById(elementId);
  let i = 0;
  function typing() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(typing, delay);
    } else {
      if (callback) callback();
    }
  }
  typing();
}

setTimeout(() => {
  typeWriter("line1", lines[0], 40, () => {
    document.getElementById("line1").classList.add("no-caret");
    typeWriter("line2", lines[1], 40, () => {
      document.getElementById("line2").classList.add("no-caret");
      typeWriter("line3", lines[2], 40, () => {
        document.getElementById("line3").classList.add("no-caret");
      });
    });
  });
}, 600);


// 🌈 爱心颜色数组
const colors = ['#e25555', '#ff69b4', '#ff9933', '#66ccff', '#9933ff', '#ff3399'];

// 🎉 点击时生成多个爱心
document.addEventListener("click", function(e) {
  for (let i = 0; i < 6; i++) {
    createHeart(e.clientX + Math.random() * 1 - 1, e.clientY + Math.random() * 1 - 1);
  }
});

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}


// 阻止触摸拖动选中（防止移动端长按选中文字）
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) {  // 多指操作
    e.preventDefault();
  }
}, { passive: false });

// 阻止双指缩放（手势缩放）
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// 阻止Ctrl + 鼠标滚轮缩放（桌面端）
window.addEventListener('wheel', function(e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

// 阻止Ctrl + 加号或减号缩放（键盘缩放）
window.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
    e.preventDefault();
  }
});

