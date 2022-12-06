const getThemeFromHour = ()=>{
    const hour = new Date().getHours();
    return (hour>=6 && hour<=18) ? "white-mode" : "dark-mode";
}

let onActive = true;
let darkMode = document.getElementById('modeControl');
darkMode.addEventListener('click', ()=> {
    onActive = !onActive;
    setThemePreference();
    updateTheme();
    console.log(onActive);
})

const updateTheme = ()=>{
    const theme = localStorage.getItem("theme") || getThemeFromHour();
    onActive = (theme === "white-mode") ? false : true;
    document.body.classList = [theme];
    document.querySelector('#modeControl i').classList = onActive ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

const setThemePreference = ()=>{
    localStorage.setItem("theme", onActive ? "dark-mode": "white-mode");
}

window.addEventListener("DOMContentLoaded",updateTheme);