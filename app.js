function escapeHTML(text) {
    let div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
function getCurrentTime() {
    return new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
function addBotMessage(message) {
    let chat = document.getElementById("chat");
    if (!chat) return;
    chat.innerHTML +=
        "<div class='bot'>" +
        message +
        "<div class='message-time'>" +
        getCurrentTime() +
        "</div>" +
        "</div>";
    chat.scrollTop = chat.scrollHeight;
}
function addUserMessage(message) {
    let chat = document.getElementById("chat");
    if (!chat) return;
    chat.innerHTML +=
        "<div class='user'>" +
        escapeHTML(message) +
        "<div class='message-time'>" +
        getCurrentTime() +
        "</div>" +
        "</div>";
    chat.scrollTop = chat.scrollHeight;
}
function notices() {
    addBotMessage(
        "📄 <b>College Notices</b><br><br>" +
        "• Mid-Term Examination<br>" +
        "• Assignment Submission<br>" +
        "• College Events<br>" +
        "• Important Announcements<br><br>" +
        "📢 Please check the college notice board regularly."
    );
}
// ---------- COMPLAINT ----------
function complaint() {
    let problem = prompt(
        "Please enter your complaint:"
    );
    if (problem && problem.trim() !== "") {
        submitRequest(
            "Complaint",
            problem.trim()
        );
    }
}
// ---------- NAVIGATION ----------
function navigation() {
    addBotMessage(
        "📍 <b>Campus Navigation</b><br><br>" +
        "📚 <b>Library</b> - Block B<br>" +
        "💻 <b>Computer Lab</b> - Block A<br>" +
        "🍔 <b>Canteen</b> - Main Building<br>" +
        "🏢 <b>Office</b> - Ground Floor<br><br>" +
        "If you need directions to another place, type its name."
    );
}
// ---------- LOST & FOUND ----------
function lostFound() {
    let item = prompt(
        "What did you lose or find?"
    );
    if (item && item.trim() !== "") {
        submitRequest(
            "Lost & Found",
            item.trim()
        );
    }
}
// ---------- STUDY HELP ----------
function study() {
    addBotMessage(
        "🧠 <b>AI Study Help</b><br><br>" +
        "You can type your study question directly.<br><br>" +
        "<b>Examples:</b><br>" +
        "• Explain inheritance in C++<br>" +
        "• What is Hamming Code?<br>" +
        "• Explain Fayol's principles<br>" +
        "• What is an operating system?<br>" +
        "• Explain SDLC"
    );
}
// ---------- EMERGENCY ----------
function emergency() {
    addBotMessage(
        "📞 <b>Emergency Contacts</b><br><br>" +
        "🛡️ Security: 1002<br>" +
        "🚑 Medical: 108<br>" +
        "🏢 Emergency Desk: 1001<br><br>" +
        "⚠️ For immediate danger, contact the appropriate emergency service."
    );
}
// ---------- FACULTY ----------
function faculty() {
    addBotMessage(
        "👥 <b>Faculty Information</b><br><br>" +
        "💻 Computer Department<br>" +
        "📐 Mathematics Department<br>" +
        "📊 Management Department<br>" +
        "🖨️ DTP Department<br><br>" +
        "For specific faculty details, please contact the college office."
    );
}
// ======================================================
// GENERAL REQUEST
// ======================================================
function newRequest() {
    let request = prompt(
        "Please enter your request or problem:"
    );
    if (request && request.trim() !== "") {
        submitRequest(
            "General Request",
            request.trim()
        );
    }
}
// ======================================================
// SUBMIT REQUEST
// ======================================================
function submitRequest(type, message) {
    // Generate ticket ID
    let ticket =
        "REQ" +
        Math.floor(
            10000 + Math.random() * 90000
        );
    // Get previous requests
    let requests;
    try {
        requests =
            JSON.parse(
                localStorage.getItem("requests") || "[]"
            );
        if (!Array.isArray(requests)) {
            requests = [];
        }
    } catch (error) {
        requests = [];
    }
    // Create request object
    let newRequestData = {
        ticket: ticket,
        type: type,
        message: message,
        status: "Pending",
        date: new Date().toLocaleString()
    };
    // Save request
    requests.push(newRequestData);
    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );
    // Confirmation message
    addBotMessage(
        "✅ <b>Request Submitted Successfully!</b><br><br>" +
        "Request Type: <b>" +
        escapeHTML(type) +
        "</b><br>" +
        "Ticket ID: <b>" +
        escapeHTML(ticket) +
        "</b><br>" +
        "Status: <b>Pending</b><br><br>" +
        "Please keep your Ticket ID for future reference. 🎫"
    );
}
// ======================================================
// MAIN CHAT
// ======================================================
function sendMessage() {
    let input =
        document.getElementById("message");
    if (!input) {
        console.error(
            "Input element with id='message' was not found."
        );
        return;
    }
    let message =
        input.value.trim();
    // Empty message
    if (message === "") {
        return;
    }
    // Display user message
    addUserMessage(message);
    // Clear input
    input.value = "";
    // Convert to lowercase
    let text =
        message.toLowerCase();
    // ==================================================
    // GREETING
    // ==================================================
    if (
        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text.includes("hello gian") ||
        text.includes("hi gian")
    ) {
        addBotMessage(
            "Hello 👋 <b>I am Gian Verse.</b><br><br>" +
            "I'm your Smart Campus Assistant. 🤖<br><br>" +
            "I can help you with:<br>" +
            "📄 Notices<br>" +
            "📍 Campus Navigation<br>" +
            "📝 Complaints<br>" +
            "🔎 Lost & Found<br>" +
            "🧠 Study Help<br>" +
            "📞 Emergency Information<br>" +
            "👥 Faculty Information"
        );
        return;
    }
    // ==================================================
    // THANK YOU
    // ==================================================
    if (
        text.includes("thank you") ||
        text.includes("thanks") ||
        text === "thank"
    ) {
        addBotMessage(
            "You're welcome! 😊<br><br>" +
            "I'm always here to help with campus information."
        );
        return;
    }
    // ==================================================
    // NOTICES
    // ==================================================
    if (
        text.includes("notice") ||
        text.includes("announcement") ||
        text.includes("notification")
    ) {
        notices();
        return;
    }
    // ==================================================
    // COMPLAINT
    // ==================================================
    if (
        text.includes("complaint") ||
        text.includes("problem") ||
        text.includes("issue") ||
        text.includes("not working") ||
        text.includes("broken")
    ) {
        submitRequest(
            "Complaint",
            message
        );
        return;
    }
    // ==================================================
    // LOST & FOUND
    // ==================================================
    if (
        text.includes("lost") ||
        text.includes("found") ||
        text.includes("id card") ||
        text.includes("missing")
    ) {
        submitRequest(
            "Lost & Found",
            message
        );
        return;
    }
    // ==================================================
    // NAVIGATION
    // ==================================================
    if (
        text.includes("library") ||
        text.includes("canteen") ||
        text.includes("computer lab") ||
        text.includes("lab") ||
        text.includes("office") ||
        text.includes("where is")
    ) {
        navigation();
        return;
    }
    // ==================================================
    // EMERGENCY
    // ==================================================
    if (
        text.includes("emergency") ||
        text.includes("medical") ||
        text.includes("security") ||
        text.includes("ambulance")
    ) {
        emergency();
        return;
    }
    // ==================================================
    // STUDY
    // ==================================================
    if (
        text.includes("study") ||
        text.includes("exam") ||
        text.includes("cpp") ||
        text.includes("c++") ||
        text.includes("math") ||
        text.includes("maths") ||
        text.includes("assignment") ||
        text.includes("sdlc") ||
        text.includes("operating system")
    ) {
        study();
        return;
    }
    // ==================================================
    // FACULTY
    // ==================================================
    if (
        text.includes("teacher") ||
        text.includes("faculty") ||
        text.includes("professor") ||
        text.includes("sir") ||
        text.includes("madam") ||
        text.includes("department")
    ) {
        faculty();
        return;
    }
    // ==================================================
    // GOODBYE
    // ==================================================
    if (
        text.includes("bye") ||
        text.includes("goodbye")
    ) {
        addBotMessage(
            "Goodbye! 👋<br><br>" +
            "Have a great day at Gian Jyoti College! 🎓"
        );
        return;
    }
    // ==================================================
    // UNKNOWN REQUEST
    // ==================================================
    addBotMessage(
        "🤔 <b>I could not understand your request completely.</b><br><br>" +
        "No problem! You can still submit your request.<br><br>" +
        "<button onclick='newRequest()'>" +
        "📝 Submit Your Request" +
        "</button>"
    );
}
// ======================================================
// ENTER KEY
// ======================================================
function enterMessage(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
}
// ======================================================
// PAGE LOAD
// ======================================================
document.addEventListener(
    "DOMContentLoaded",
    function () {
        console.log(
            "✅ Gian Verse Smart Campus Assistant loaded successfully."
        );
    }
);