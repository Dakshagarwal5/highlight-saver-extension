document.addEventListener('DOMContentLoaded', () => {
    loadHighlights();
  });
  
  function loadHighlights() {
    chrome.storage.local.get({ highlights: [] }, (result) => {
      const container = document.getElementById('highlights-container');
      container.innerHTML = '';
  
      result.highlights.forEach((highlight, index) => {
        const div = document.createElement('div');
        div.className = 'highlight';
        div.innerHTML = `
          <p>${highlight.text}</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        container.appendChild(div);
      });
  
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          deleteHighlight(index);
        });
      });
    });
  }
  
  function deleteHighlight(index) {
    chrome.storage.local.get({ highlights: [] }, (result) => {
      const highlights = result.highlights;
      highlights.splice(index, 1);
      chrome.storage.local.set({ highlights }, loadHighlights);
    });
  }
  