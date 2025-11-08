    const sidebar = document.getElementById('sidebarMenu');
    const toggleBtn = document.getElementById('sidebarToggle');
    const navbar = document.getElementById('mainNavbar');

    // Toggle sidebar
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('translate-x-full');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      const isInsideSidebar = sidebar.contains(e.target);
      const isToggleBtn = toggleBtn.contains(e.target);
      if (!isInsideSidebar && !isToggleBtn && !sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('translate-x-full');
      }
    });

    // Transparent navbar on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('bg-black/30', 'backdrop-blur');
      } else {
        navbar.classList.remove('bg-black/30', 'backdrop-blur');
      }
    });








function openEditModal(id, name, type, category, description, deadline, notes, assignedTo) {
  document.getElementById("editModal").classList.remove("hidden");

  // Fill form
  document.getElementById("editProjectId").value = id;
  document.getElementById("editProjectName").value = name;
  document.getElementById("editProjectType").value = type;
  document.getElementById("editCategory").value = category;
  document.getElementById("editDescription").value = description;
  document.getElementById("editDeadline").value = deadline;
  document.getElementById("editNotes").value = notes;

  let assignedSelect = document.getElementById("editAssignedTo");
  for (let option of assignedSelect.options) {
    if (option.value == assignedTo) {
      option.selected = true;
    }
  }

  // Set form action dynamically
  document.getElementById("editForm").action = `/edit_assigned_project/${id}/`;
}

function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
}

document.getElementById("editDepartment").addEventListener("change", function() {
    let deptId = this.value;
    let assignedToSelect = document.getElementById("editAssignedTo");
    assignedToSelect.innerHTML = "<option value=''>Loading...</option>";

    if (deptId) {
        fetch(`/ajax/get-team-members/?department_id=${deptId}`)
        .then(response => response.json())
        .then(data => {
            assignedToSelect.innerHTML = "";
            if (data.members.length > 0) {
                data.members.forEach(member => {
                    let opt = document.createElement("option");
                    opt.value = member.id;
                    opt.textContent = member.name;
                    assignedToSelect.appendChild(opt);
                });
            } else {
                assignedToSelect.innerHTML = "<option value=''>No members found</option>";
            }
        });
    } else {
        assignedToSelect.innerHTML = "<option value=''>Select department first</option>";
    }
});



function openDescriptionModal(description) {
    document.getElementById('descriptionContent').innerText = description;
    document.getElementById('descriptionModal').classList.remove('hidden');
    document.getElementById('descriptionModal').classList.add('flex');
  }

  function closeDescriptionModal() {
    document.getElementById('descriptionModal').classList.add('hidden');
    document.getElementById('descriptionModal').classList.remove('flex');
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



   // Hide messages after 4 seconds (4000ms)
    setTimeout(() => {
      const messages = document.querySelectorAll('#messages-container .message');
      messages.forEach(msg => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 500); // remove after fade-out
      });
    }, 1000);