const progressCircle = document.querySelector(".progress-ring .progress");
const progressText = document.getElementById("progress-text");
const circumference = 2 * Math.PI * 54; // r=54

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

document.getElementById("start-test").addEventListener("click", async () => {
    const domainSelect = document.getElementById("domain-select");
    const loopInput = document.getElementById("loop-count");
    const currentDomain = domainSelect.value;
    const loopCount = parseInt(loopInput.value) || 5;

    if (!currentDomain) {
        alert("请选择要测试的域名！");
        return;
    }

    setProgress(0);
    progressText.innerText = "测试延迟...";
    document.getElementById("ping-result").innerText = "-";
    document.getElementById("download-result").innerText = "-";

    // 测试5次延迟
    let pingTimes = [];
    for (let i = 0; i < 5; i++) {
        const start = performance.now();
        await fetch(`${currentDomain}/testfile.bin?nocache=${Math.random()}`, { method: "HEAD" });
        const end = performance.now();
        const thisPing = (end - start).toFixed(2);
        pingTimes.push(parseFloat(thisPing));
        document.getElementById("ping-result").innerText = `${thisPing} ms (第${i+1}次)`;
    }
    const avgPing = (pingTimes.reduce((a,b) => a + b) / pingTimes.length).toFixed(2);
    document.getElementById("ping-result").innerText = `${avgPing} ms`;
    setProgress(50);

    // 循环下载测速
    progressText.innerText = "测试下载...";
    const totalSizePerFile = 25 * 1024 * 1024; // 25MB
    let totalLoaded = 0;
    const downloadStart = performance.now();

    for (let loop = 0; loop < loopCount; loop++) {
        let loaded = 0;
        const res = await fetch(`${currentDomain}/testfile.bin?nocache=${Math.random()}`);
        const reader = res.body.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            loaded += value.length;
            totalLoaded += value.length;

            const now = performance.now();
            const timeSec = (now - downloadStart) / 1000;
            if (timeSec > 0) {
                const speed = ((totalLoaded * 8) / (timeSec * 1024 * 1024)).toFixed(2);
                document.getElementById("download-result").innerText = `${speed} Mbps`;
                let percent = 50 + Math.min((totalLoaded / (totalSizePerFile * loopCount)) * 50, 50);
                setProgress(percent);
            }
        }
    }

    setProgress(100);
    progressText.innerText = "完成";
});
