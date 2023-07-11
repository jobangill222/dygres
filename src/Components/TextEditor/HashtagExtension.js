import { MenuBar } from "./Menubar/Menubar";
import { useEditor, Extension, Mark } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const HashtagExtension = () => {
  return {
    addKeyboardShortcuts() {
      return {
        "#": () => this.editor.commands.showHashtagPopup(),
      };
    },

    addCommands() {
      return {
        showHashtagPopup:
          () =>
          ({ editor }) => {
            const hashtagList = ["tag1", "tag2", "tag3"]; // Replace with your own hashtag list
            const popupContent = document.createElement("div");
            popupContent.className = "hashtag-popup-content";

            const ulElement = document.createElement("ul");

            hashtagList.forEach((hashtag) => {
              const liElement = document.createElement("li");
              liElement.textContent = hashtag;
              ulElement.appendChild(liElement);
            });

            popupContent.appendChild(ulElement);

            const popupContainer = document.querySelector(
              ".hashtag-popup-container"
            );

            if (popupContainer) {
              popupContainer.innerHTML = "";
              popupContainer.appendChild(popupContent);

              // Position the popup below the cursor
              const { top, left } = editor.view.coordsAtPos(
                editor.state.selection.$cursor.pos
              );
              popupContainer.style.top = `${top + 20}px`; // Adjust the vertical position as needed
              popupContainer.style.left = `${left}px`;

              // Show the popup
              popupContainer.style.display = "block";
            }
          },
      };
    },
  };
};

export const MyEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, HashtagExtension],
    // Other configuration options...
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <>
        <div className="hashtag-popup" style={{ display: "none" }}></div>
      </>
      <EditorContent editor={editor} />
    </div>
  );
};

const EditorContent = ({ editor }) => {
  if (!editor) {
    return null; // Return null or a loading state if editor is not available
  }

  return (
    <div
      contentEditable="true"
      ref={editor.chain().setContent("<p>Start typing here...</p>").focus().ref}
      onBlur={() => {
        console.log(editor.getJSON());
      }}
    />
  );
};
