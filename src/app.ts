const handleLightColor = (lightSelect: string) => {
    const light: any = document.querySelector(lightSelect);
    const colors: string[] = [
        "rgba(75, 0, 130, 0.9)",
        "rgba(102, 51, 153, 0.9)",
        "rgba(138, 43, 226, 0.9)",
        "rgba(147, 112, 219, 0.9)",
        "rgba(186, 85, 211, 0.9)",
        "rgba(44, 153, 255, 0.9)"
    ];
    const randomColor: string = colors[Math.floor(Math.random() * colors.length)];
    light.style.background = `radial-gradient(circle, ${randomColor} 60%, rgba(255, 255, 255, 0.2) 30%, rgba(0, 0, 0, 0) 60%)`;
}

setTimeout(() => {
    handleLightColor('.light1');
    handleLightColor('.light2');
})

setInterval(() => {
    handleLightColor('.light1');
}, 8000)

setInterval(() => {
    handleLightColor('.light2');
}, 9000)