



  document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu-toggle"); 
  const sidebar = document.getElementById("sidebar");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
    });
  });
});



function openProjectModal(button) {
    const modal = document.getElementById("assignProjectModal");
    modal.classList.remove("hidden");

    // Scope all selectors to modal only
    modal.querySelector("input[name='work_name']").value = button.dataset.work_name || "";
    modal.querySelector("input[name='work_type']").value = button.dataset.work_type || "";
    modal.querySelector("input[name='category']").value = button.dataset.category || "";
    modal.querySelector("textarea[name='description']").value = button.dataset.description || "";
    modal.querySelector("input[name='deadline']").value = button.dataset.deadline || "";
    modal.querySelector("textarea[name='additional_notes']").value = button.dataset.additional_notes || "";
    modal.querySelector("input[name='color_preference']").value = button.dataset.color_preference || "";
    modal.querySelector("input[name='priority']").value = button.dataset.priority || "";
    modal.querySelector("textarea[name='content_example']").value = button.dataset.content_example || "";

    // Handle multiple files
    let filesContainer = modal.querySelector("#existing-files-list");
    filesContainer.innerHTML = "";
    if (button.dataset.files) {
        let files = button.dataset.files.split(",");
        files.forEach(url => {
            if (url.trim() !== "") {
                let link = document.createElement("a");
                link.href = url;
                link.target = "_blank";
                link.className = "text-blue-400 hover:underline block";
                link.textContent = "📄 View File";
                filesContainer.appendChild(link);
            }
        });
    }

    // Handle multiple images
    let imagesContainer = modal.querySelector("#existing-images-list");
    imagesContainer.innerHTML = "";
    if (button.dataset.images) {
        let images = button.dataset.images.split(",");
        images.forEach(url => {
            if (url.trim() !== "") {
                let img = document.createElement("img");
                img.src = url;
                img.className = "w-32 h-32 object-cover rounded border";
                imagesContainer.appendChild(img);
            }
        });
    }
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





// static/js/messages.js

(function () {
  // Wait for DOM to be ready
  function hideMessagesAfter(delayMs = 4000, fadeMs = 500) {
    const container = document.getElementById('messages-container');
    if (!container) return;

    // Query messages inside container
    const messages = container.querySelectorAll('.message');
    if (!messages.length) return;

    setTimeout(() => {
      messages.forEach(msg => {
        // Prefer class-based fade if you're using Tailwind; fallback to style
        // Add utility class if available
        if (msg.classList) {
          // Tailwind opacity utility and transition classes should be present on element
          // We'll add the opacity-0 class if your project has it, otherwise set style
          msg.classList.add('opacity-0');
        } else {
          msg.style.transition = `opacity ${fadeMs}ms`;
          msg.style.opacity = '0';
        }

        // Remove element after fade completes
        setTimeout(() => {
          if (msg.parentNode) msg.parentNode.removeChild(msg);
          // If container becomes empty, remove it too
          if (container.childElementCount === 0 && container.parentNode) {
            container.parentNode.removeChild(container);
          }
        }, fadeMs + 20);
      });
    }, delayMs);
  }

  // If DOM already loaded, run immediately; otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => hideMessagesAfter(4000, 500));
  } else {
    hideMessagesAfter(4000, 500);
  }
})();
