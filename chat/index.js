const socket = io("http://localhost:3001/");

const $ = document.getElementById.bind(document);

const printMessage = (messageObj) => {
  const { text, userName } = messageObj;
  const newMessage = document.createElement("li");
  newMessage.innerText = `${userName}: ${text}`;
  $("messages").appendChild(newMessage);
};

socket.on("mensagensAnteriores", (message) => {
  message.forEach((m) => printMessage(m));
});

const sendMessage = (event) => {
  event.preventDefault();
  const userName = $("username").value;
  const text = $("message").value;
  if (text.trim() && userName.trim()) {
    const messageObj = { userName, text };
    socket.emit("novaMensagem", messageObj);
    messageObj.userName = "eu";
    printMessage(messageObj);
    $("message").value = "";
  }
};

socket.on("chegouMensagem", (messageObj) => {
  console.log(messageObj);
  printMessage(messageObj);
});
