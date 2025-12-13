function openTab(tabId, btn) {
    document.querySelectorAll(".tab-content")
        .forEach(tab => tab.classList.remove("active"));

    document.querySelectorAll(".tab-btn")
        .forEach(button => button.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    btn.classList.add("active");
}

/* Dark Mode Toggle */
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

