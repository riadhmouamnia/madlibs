
    var confettiSettings = { target: "my-canvas" };
    var confetti = new ConfettiGenerator(confettiSettings);
    const endBtn = document.querySelector("#endBtn");
    const canvas = document.querySelector("#my-canvas");
    
    endBtn.addEventListener("click", () => {
    canvas.classList.remove("close");
    canvas.classList.add("open");

    setTimeout(()=> {
        canvas.classList.remove("open");
        canvas.classList.add("close");
    }, 3000);
    
})

confetti.render();

