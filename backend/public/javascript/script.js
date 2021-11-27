const toggle=document.querySelector("input[type=checkbox]")
console.log(toggle);
toggle.addEventListener("change",changetheme);
function changetheme(event){
  console.log(event.target.checked);
  if(event.target.checked)
  {document.documentElement.setAttribute("data-theme","dark");
    darkmode();
    localStorage.setItem("theme","dark")
  }
  else
  {document.documentElement.setAttribute("data-theme","light");
  lightmode();
  localStorage.setItem("theme","light");
}

}
function darkmode(){
  document.querySelector("#toggle-icon .toggle-text").textContent="Dark Mode";
  document.querySelector("#toggle-icon i").classList.replace("fa-sun","fa-moon");
}
function lightmode(){
  document.querySelector("#toggle-icon .toggle-text").textContent="Light Mode";
  document.querySelector("#toggle-icon i").classList.replace("fa-moon","fa-sun");
}
