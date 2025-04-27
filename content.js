document.addEventListener('mouseup', function (e) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      const popup = document.createElement('div');
      popup.innerText = "Save Highlight?";
      popup.style.position = "absolute";
      popup.style.top = `${e.pageY + 10}px`;
      popup.style.left = `${e.pageX + 10}px`;
      popup.style.background = "#333";
      popup.style.color = "white";
      popup.style.padding = "6px 10px";
      popup.style.borderRadius = "6px";
      popup.style.cursor = "pointer";
      popup.style.zIndex = 9999;
      popup.style.fontSize = "14px";
      popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      popup.className = "highlight-popup";
  
      popup.addEventListener('click', function () {
        saveHighlight(selectedText);
        document.body.removeChild(popup);
      });
  
      document.body.appendChild(popup);
  
      setTimeout(() => {
        if (document.body.contains(popup)) {
          document.body.removeChild(popup);
        }
      }, 3000);
    }
  });
  
  function saveHighlight(text) {
    chrome.storage.local.get({ highlights: [] }, (result) => {
      const highlights = result.highlights;
      highlights.push({ text, timestamp: Date.now() });
      chrome.storage.local.set({ highlights });
    });
  }
  