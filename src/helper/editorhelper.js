export const createMarkup = (postContent) => {
  const highlightedContent = postContent.replace(
    /<p>(https?:\/\/[^\s<]+)<\/p>|<a\s+href="([^"]+)">([^<]+)<\/a>|(@\w+)|(#\w+)/g,
    (match, url, href, anchorText, atMention, hashtag) => {
      if (url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
      } else if (href && anchorText) {
        return `<a href="${href}">${anchorText}</a>`;
      } else if (atMention || hashtag) {
        return `<span class="highlighted" onClick="handleClick(event)">${match}</span>`;
      } else {
        return match;
      }
    }
  );
  return { __html: highlightedContent };
};

export const handleDropdown = (
  editor,
  currentCursorPosition,
  char,
  dropdownId,
  charToMatch
) => {
  const dropdown = document.getElementById(dropdownId);

  if (char === charToMatch) {
    // Show the select dropdown at the cursor position
    if (dropdown) {
      const { top, left } = editor.getBounds(currentCursorPosition);
      dropdown.style.top = `${top + 20}px`;
      dropdown.style.left = `${left}px`;
      dropdown.style.display = "block";
    }
  } else {
    // Hide the select dropdown
    if (dropdown) {
      dropdown.style.display = "none";
    }
  }
};
