// Função para processar o envio do formulário de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário
    
    // Capturar os valores do formulário
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    
    // Verificar se o username e a password estão preenchidos
    if (username.trim() === "" || password.trim() === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    // Verificar se o usuário existe no local storage e se a senha está correta
    var userData = localStorage.getItem(username);
    if (!userData) {
        alert("Usuário não encontrado. Por favor, verifique o nome de usuário.");
        return;
    }
    
    userData = JSON.parse(userData);
    if (userData.password !== password) {
        alert("Senha incorreta. Por favor, tente novamente.");
        return;
    }
    
    // Informar ao usuário que o login foi bem-sucedido
    alert("Login bem-sucedido! 🔒");
    
    // Redirecionar para a página do menu principal
    window.location.href = "MainMenu.html";
});
