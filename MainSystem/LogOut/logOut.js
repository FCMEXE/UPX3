document.getElementById("yes").addEventListener("click", function () {
  
  localStorage.removeItem('email');
  localStorage.removeItem('senha');
  
  window.location.href = "/Landing-Page/index.html";
  
 
  alert("Você foi desconectado!");
});

document.getElementById("cancel").addEventListener("click", function () {
  window.history.back;
  // window.location.href = "../Home/home.html";
});
