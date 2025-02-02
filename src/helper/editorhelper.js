export const createMarkup = (postContent) => {
  const highlightedContent = postContent.replace(
    /<p>((?:https?:\/\/)?(?:[a-z0-9\-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)<\/p>|<a\s+href="([^"]+)">([^<]+)<\/a>|(@\w+)|(#\w+)/g,
    (match, url, href, anchorText, atMention, hashtag) => {
      if (url) {
        // console.log(url, "url")

        if (url.startsWith("http")) {
          return `<a href="${url}" target="_blank">${url}</a>`;
        } else {
          return `<a href="http://${url}" target="_blank">${url}</a>`;
        }
        // return `<a href="${url}" target="_blank">${url}</a>`;
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
// export const createMarkup = (postContent) => {
//   const plainTextUrlRegex = /(?:(?:https?:\/\/)?(?:[a-z0-9\-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)/ig;

//   const highlightedContent = postContent.replace(
//     /<a\s+href="([^"]+)">([^<]+)<\/a>|(@\w+)|(#\w+)/gi,
//     (match, href, anchorText, atMention, hashtag) => {
//       if (href && anchorText) {
//         return `<a href="${href}" target="_blank">${anchorText}</a>`;
//       } else if (atMention || hashtag) {
//         return `<span class="highlighted" onClick="handleClick(event)">${match}</span>`;
//       } else {
//         return match;
//       }
//     }
//   ).replace(plainTextUrlRegex, (url) => {
//     if (url.startsWith("http")) {
//       return `<a href="${url}" target="_blank">${url}</a>`;
//     } else {
//       return `<a href="http://${url}" target="_blank">${url}</a>`;
//     }
//   }).replace(/<p[^>]*><a\s+href="([^"]+)"[^>]*>(.*?)<\/a><\/p\s*>/gi, '<p><a href="$1" target="_blank">$2</a></p>');

//   return { __html: highlightedContent };
// };

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

// export const searchQuery = async (
//   type,
//   suggestionWhilePostingDContext,
//   query,
//   setLoading,
//   setCachedList,
//   cachedList,
//   setList
// ) => {
//   try {
//     setLoading(true);
//     // setQuery(query);

//     // Check if the results are already cached
//     if (cachedList[query]) {
//       setList(cachedList[query]);
//     } else {
//       const results = await suggestionWhilePostingDContext(query && query);
//       const newArray = results.list.map((item) => {
//         return {
//           id: item._id,
//           profileImage: item?.profileImage
//             ? item.profileImage
//             : "/images/user.png",
//           display: `${type === "@" ? `@${item.username}` : item.name}`,
//         };
//       });
//       // Cache the results
//       setCachedList((prevState) => ({
//         ...prevState,
//         [query]: newArray,
//       }));

//       setList(newArray);
//     }
//   } catch (error) {
//     console.log(error, "error user List ");
//   } finally {
//     setLoading(false);
//   }
// };

export const searchQuery = async (
  type,
  suggestionWhilePostingDContext,
  query,
  setCachedList,
  cachedList,
  setList
) => {
  try {
    // setQuery(query);

    // Check if the results are already cached
    if (cachedList[query]) {
      setList(cachedList[query]);

      return cachedList[query]; // Return the cached results
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

      return newArray; // Return the new results obtained from the API
    }
  } catch (error) {
    console.log(error, "error user List ");

    return null; // Return null in case of an error
  }
};

export const modifyString = (str) => {
  let modifiedStr = str;
  console.log(str, "str");
  if (str.startsWith("@")) {
    modifiedStr = str.substring(1) + " "; // Remove '@' symbol from the beginning
  } else if (str.startsWith("#")) {
    modifiedStr = str.substring(1) + " "; // Remove '#' symbol from the beginning
  }

  return modifiedStr;
};
