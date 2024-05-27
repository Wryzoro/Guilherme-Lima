// Função para processar o envio do formulário de registro
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário
    
    // Capturar os valores do formulário
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;
    var age = document.getElementById("register-age").value;
    var gender = document.getElementById("register-gender").value;
    
    // Verificar se todos os campos estão preenchidos
    if (username.trim() === "" || password.trim() === "" || age.trim() === "" || gender.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    // Verificar se já existe um usuário com o mesmo nome
    if (localStorage.getItem(username)) {
        alert("Este nome de usuário já está em uso. Por favor, escolha outro.");
        return;
    }
    
    // Criar um objeto com os dados do usuário
    var user = {
        username: username,
        password: password,
        age: age,
        gender: gender
    };
    
    // Armazenar os dados do usuário no local storage
    localStorage.setItem(username, JSON.stringify(user));
    
    // Limpar os campos do formulário
    document.getElementById("register-username").value = "";
    document.getElementById("register-password").value = "";
    document.getElementById("register-age").value = "";
    document.getElementById("register-gender").value = "";
    
    // Informar ao usuário que a conta foi criada com sucesso
    alert("Conta criada com sucesso!");
    
    // Redirecionar para a página de login com o username e password preenchidos
    window.location.href = "Login.html?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
});
