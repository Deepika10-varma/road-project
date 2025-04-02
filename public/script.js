async function startCamera() {
    try {
      const videoElement = document.getElementById('video');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
      // Set camera stream to video element
      videoElement.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera. Please check your permissions.");
    }
  }
  
  // Call startCamera when the page loads
  window.onload = startCamera;
  
  async function simulateDetection() {
    const statusElement = document.getElementById("status");
    const alertBox = document.getElementById("alert-box");
  
    // Simulate accident detection
    const accidentDetected = Math.random() < 0.5; // 50% chance
  
    if (accidentDetected) {
      statusElement.innerText = "Status: Accident Detected!";
      statusElement.style.color = "red";
      alertBox.innerHTML = "<strong>Alert:</strong> Accident Detected! Authorities have been notified.";
  
      // Send SMS notification
      const phoneNumber = '+918977821086'; // Replace with the recipient's phone number
      const message = 'Alert: Accident Detected! Authorities have been notified.';
  
      try {
        const response = await fetch('http://localhost:3000/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, to: phoneNumber }),
        });
  
        if (response.ok) {
          console.log('SMS sent successfully');
        } else {
          console.error('Failed to send SMS');
        }
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    } else {
      statusElement.innerText = "Status: No Accident Detected";
      statusElement.style.color = "green";
      alertBox.innerHTML = "No Alerts";
    }
  }