// 进度环元素
const progressCircle = document.querySelector(".progress-ring .progress");
const progressText = document.getElementById("progress-text");
const circumference = 2 * Math.PI * 54; // r=54

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

// 获取隐藏 input 用来存储真实选中值
let selectedDomain = "";

// 自定义下拉菜单
document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".select-selected");
  const items = document.querySelector(".select-items");

  // 点击显示/隐藏选项
  select.addEventListener("click", (e) => {
    e.stopPropagation();
    select.classList.toggle("active");
    items.style.display = items.style.display === "block" ? "none" : "block";
  });

  // 选项点击事件
  items.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
      select.textContent = option.textContent;
      select.classList.remove("active");
      items.style.display = "none";

      selectedDomain = option.getAttribute("data-value");
      console.log("选中域名:", selectedDomain);
    });
  });

  // 点击外部关闭下拉
  document.addEventListener("click", () => {
    select.classList.remove("active");
    items.style.display = "none";
  });
});

// 点击开始测试
document.getElementById("start-test").addEventListener("click", async () => {
    const loopInput = document.getElementById("loop-count");
    const loopCount = parseInt(loopInput.value) || 5;

    if (!selectedDomain) {
        alert("请选择要测试的域名！");
        return;
    }

    setProgress(0);
    progressText.innerText = "测试延迟...";
    document.getElementById("ping-result").innerText = "-";
    document.getElementById("download-result").innerText = "-";

    try {
        // 测试5次延迟
        let pingTimes = [];
        for (let i = 0; i < 5; i++) {
            const start = performance.now();
            await fetch(`${selectedDomain}/testfile.bin?nocache=${Math.random()}`, { method: "HEAD" });
            const end = performance.now();
            const thisPing = (end - start).toFixed(2);
            pingTimes.push(parseFloat(thisPing));
            document.getElementById("ping-result").innerText = `${thisPing} ms (第${i+1}次)`;
        }
        const avgPing = (pingTimes.reduce((a,b) => a+b,0)/pingTimes.length).toFixed(2);
        document.getElementById("ping-result").innerText = `${avgPing} ms`;
        setProgress(50);

        // 循环下载测速
        progressText.innerText = "测试下载...";
        const totalSizePerFile = 25 * 1024 * 1024; // 25MB
        let totalLoaded = 0;
        const downloadStart = performance.now();

        for (let loop = 0; loop < loopCount; loop++) {
            let loaded = 0;
            const res = await fetch(`${selectedDomain}/testfile.bin?nocache=${Math.random()}`);
            const reader = res.body.getReader();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                loaded += value.length;
                totalLoaded += value.length;

                const now = performance.now();
                const timeSec = (now - downloadStart)/1000;
                if(timeSec>0){
                    const speed = ((totalLoaded*8)/(timeSec*1024*1024)).toFixed(2);
                    document.getElementById("download-result").innerText = `${speed} Mbps`;
                    let percent = 50 + Math.min((totalLoaded/(totalSizePerFile*loopCount))*50,50);
                    setProgress(percent);
                }
            }
        }

        setProgress(100);
        progressText.innerText = "完成";
    } catch(e){
        console.error(e);
        alert("测速失败，请检查域名是否可访问或是否支持跨域请求(CORS)。");
    }
});
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