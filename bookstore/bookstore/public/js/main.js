// Image preview on upload
function previewImage(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById('uploadPreview');
      preview.innerHTML = `
        <img src="${e.target.result}" 
             style="width:100%;height:100%;object-fit:cover;border-radius:8px;" 
             alt="Preview">
        <div class="upload-overlay"><span>🔄 Click to replace</span></div>`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

// Auto-dismiss alerts after 4 seconds
document.addEventListener('DOMContentLoaded', () => {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 4000);
  });
});
