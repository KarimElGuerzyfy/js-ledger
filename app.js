const themeToggle = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle('dark');
    iconSun.classList.toggle('hidden');
    iconMoon.classList.toggle('hidden');
});
