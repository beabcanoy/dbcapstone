const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click",() =>{
    document.querySelector("#sidebar").classList.toggle("collapsed");
}) 