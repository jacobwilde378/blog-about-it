function logout() {
    fetch("/api/users/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
        document.location.replace("/login");
      })
      .catch(err => console.log(err));
  }
  
  document.querySelector("#logout-button").addEventListener("click", logout);
  