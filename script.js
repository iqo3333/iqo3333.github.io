const lines = [
  "感谢您的访问。",
  "本域名仅用于 Lynn Che 的私人邮箱，不作为网站使用，也不对外提供任何服务。",
  "若您是因邮件往来访问此地址，请忽略本页面，感谢理解。",
  "祝一切顺利！",
  "——Lynn Che"
];

function typeWriter(elementId, text, delay = 40, callback) {
  const el = document.getElementById(elementId);
  el.textContent = ""; // 清空初始内容
  let i = 0;
  function typing() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(typing, delay);
    } else {
      el.classList.add("no-caret"); // 打字完成后再隐藏光标
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
        typeWriter("line4", lines[3], 40, () => {
          document.getElementById("line4").classList.add("no-caret");
          typeWriter("line5", lines[4], 40, () => {
            document.getElementById("line5").classList.add("no-caret");
          });
        });
      });
    });
  });
}, 600); // ✅ 多补一个右括号，这才是 setTimeout 的结尾


// ------------------ 爱心点击效果 ------------------
const colors = ['#e25555', '#ff69b4', '#ff9933', '#66ccff', '#9933ff', '#ff3399'];

// 点击时生成多个爱心
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
