document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const response = document.getElementById('responseMessage');
  
    if(name && email && message) {
      response.textContent = `Thank you, ${name}! Your message has been sent.`;
      this.reset();
    } else {
      response.textContent = 'Please fill out all fields.';
    }
  });
  