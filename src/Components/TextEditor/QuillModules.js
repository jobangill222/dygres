export const modules = {
  toolbar: [
    [{ header: [4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    // [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [
      "link",
      // "image"
    ],
    // ["clean"],
    [{ list: "ordered" }, { list: "bullet" }],

    ["user-list"], // Custom option for user list
  ],
  clipboard: {
    matchVisual: false,
    transformPaste: (content) => {
      return content.substr(0, 420);
    },
  },

  // Add custom blot for user list option'
};
