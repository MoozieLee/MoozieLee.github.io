document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle');
    const icon = themeToggleButton.querySelector('i');
    const themeText = themeToggleButton.querySelector('span');
  
    // 检查 localStorage 中的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
      if (savedTheme === 'dark') {
        icon.classList.remove('bi-moon');
        icon.classList.add('bi-sun');
        // themeText.textContent = '切换为亮色';
      }
    }
  
    themeToggleButton.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', newTheme);
  
      if (newTheme === 'dark') {
        icon.classList.remove('bi-moon');
        icon.classList.add('bi-sun');
        // themeText.textContent = '切换为亮色';
      } else {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon');
        // themeText.textContent = '切换为深色';
      }
  
      // 保存用户的主题偏好
      localStorage.setItem('theme', newTheme);
    });
  });