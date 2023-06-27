console.log("서비스워커 로드됨...");

self.addEventListener("push", (e) => {
    const data = e.data.json();
    console.log("push 받음");
    self.registration.showNotification(data.title, {
        image:"/jesusdream.png",
        tag: "welcome message",
        body: data.message,
        icon: "/jesusdream.png",
        renotify: true,
        dir: "ltr"
    });
});
