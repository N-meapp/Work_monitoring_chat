document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu-toggle"); 
  const sidebar = document.getElementById("sidebar");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
    });
  });
});








// admin side user details edit modal






const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');

if (passwordInput && toggleBtn && eyeIcon) {
  toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.964 9.964 0 012.489-4.043M6.62 6.62l10.76 10.76M12 5c4.477 0 8.268 2.943 9.542 7a9.964 9.964 0 01-1.536 2.823M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`;
    } else {
      passwordInput.type = 'password';
      eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`;
    }
  });
}





  function openModal() {
    const modal = document.getElementById("addContactModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closeModal() {
    const modal = document.getElementById("addContactModal");
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }



let socket = null;
  let currentChatId = null;

  function openChat(userId, username, phone, avatar) {
    // Show chat window
    document.getElementById("empty-chat").classList.add("hidden");
    document.getElementById("chat-window").classList.remove("hidden");

    // Update chat header
    document.getElementById("chat-username").innerText = username;
    document.getElementById("chat-userphone").innerText = phone;
    document.getElementById("chat-avatar").src = avatar || "{% static 'images/default.png' %}";

    currentChatId = userId;

    // Close old socket if exists
    if (socket) socket.close();

    // Open new WebSocket
    socket = new WebSocket(`ws://${window.location.host}/ws/chat/${userId}/`);

    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      displayMessage(data.message, data.sender);
    };
  }

  function sendMessage() {
    const input = document.getElementById("chat-input");
    const msg = input.value.trim();
    if (msg && socket) {
      socket.send(JSON.stringify({
        message: msg,
        sender: "{{ current_user.name }}",
        chat_id: currentChatId
      }));
      input.value = "";
    }
  }

  function displayMessage(message, sender) {
    const container = document.getElementById("chat-messages");
    const div = document.createElement("div");
    div.classList.add("p-2", "rounded-lg", "max-w-xs");

    if (sender === "{{ current_user.name }}") {
      div.classList.add("bg-green-500", "text-white", "ml-auto");
    } else {
      div.classList.add("bg-gray-700", "text-white", "mr-auto");
    }

    div.innerText = message;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight; // auto scroll
  }