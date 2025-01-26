let imgBox = document.querySelector(".imgBox");
let generate = document.querySelector(".generate");
let output = document.querySelector(".outputImg");
output.style.display = "none";
let inputBox = document.querySelector(".inputBox");
let message = document.querySelector(".message");
const saveBtn = document.querySelector(".saveBtn");
saveBtn.style.display = "none";
message.style.display = "none";

function generateQR() {
  let usrInput = inputBox.value.trim();

  if (usrInput === "") {
    output.style.display = "none";
    message.style.display = "block";
    saveBtn.style.display = "none";
    message.innerText = "Please enter a text or url before clicking Button!";
  } else {
    output.style.display = "block";
    message.style.display = "none";
    output.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${usrInput}`;
    saveBtn.style.display = "block";
  }
}

generate.addEventListener("click", generateQR);

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    generateQR();
  }
});

saveBtn.addEventListener("click", async function () {
    try {
      const response = await fetch(output.src);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "generatedQR.png";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      alert("Failed to download the QR :(");
    }
  });
  