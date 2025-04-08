let qrcode = null;

function generateQR() {
    const text = document.getElementById("text").value.trim();
    const qrCodeDiv = document.getElementById("qrCode");
    const saveButton = document.getElementById("saveButton");
    
    qrCodeDiv.innerHTML = "";
    
    if (!text) {
        qrCodeDiv.innerHTML = "<p style='color: #ff6b6b'>Please enter some text or URL!</p>";
        saveButton.style.display = "none";
        return;
    }

    qrcode = new QRCode(qrCodeDiv, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#ff6b6b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show save button after QR code is generated
    setTimeout(() => {
        saveButton.style.display = "block";
    }, 100); // Small delay to ensure QR code is rendered
}

function saveQR() {
    const qrCodeDiv = document.getElementById("qrCode");
    const qrCanvas = qrCodeDiv.querySelector("canvas");
    
    if (qrCanvas) {
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = qrCanvas.toDataURL("image/png");
        link.click();
    } else {
        alert("Please generate a QR code first!");
    }
}

document.getElementById("text").addEventListener("keypress", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        generateQR();
    }
});