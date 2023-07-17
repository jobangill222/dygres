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

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export const searchQuery = async (
  type,
  suggestionWhilePostingDContext,
  query,
  setLoading,
  setCachedList,
  cachedList,
  setList
) => {
  try {
    setLoading(true);
    // setQuery(query);

    // Check if the results are already cached
    if (cachedList[query]) {
      setList(cachedList[query]);
    } else {
      const results = await suggestionWhilePostingDContext(query && query);
      const newArray = results.list.map((item) => {
        return {
          id: item._id,
          profileImage: item?.profileImage
            ? item.profileImage
            : "/images/user.png",
          display: `${type === "@" ? `@${item.username}` : item.name}`,
        };
      });
      // Cache the results
      setCachedList((prevState) => ({
        ...prevState,
        [query]: newArray,
      }));

      setList(newArray);
    }
  } catch (error) {
    console.log(error, "error user List ");
  } finally {
    setLoading(false);
  }
};

export const modifyString = (str) => {
  let modifiedStr = str;
  console.log(str, "str");
  if (str.startsWith("@")) {
    modifiedStr = str.substring(1); // Remove '@' symbol from the beginning
  } else if (str.startsWith("#")) {
    modifiedStr = str.substring(1); // Remove '#' symbol from the beginning
  }

  return modifiedStr;
};
