const singinBtn = document.getElementById("singinBtn");
singinBtn.addEventListener("click", function () {
  const userName = document.getElementById("userName").value.trim();
  const password = document.getElementById("password").value.trim();
  if (userName === "admin" && password === "admin123") {
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    window.location.href = "main.html";
  } else {
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    const my_modal_3 = document.getElementById("my_modal_3");
    my_modal_3.showModal();
  }
});
