let btn = document.getElementById("yes");
document.getElementById("yes").addEventListener("click", function () {
  alert("Você foi desconectado!");
});

document.getElementById("cancel").addEventListener("click", function () {
  window.history.back;
  // window.location.href = "../Home/home.html";
});
