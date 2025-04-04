import React, { useState } from "react";
import { Rnd } from "react-rnd";

const DraggableElement = ({ element, onUpdate, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(element.content);

  const handleSaveEdit = () => {
    onUpdate(element.id, { content: newContent });
    setIsEditing(false);
  };

  return (
    <>
      <Rnd
        default={{
          x: element.left,
          y: element.top,
          width: element.width,
          height: element.height,
        }}
        bounds="parent"
        enableResizing={element.type === "image"}
        onDragStop={(e, d) => onUpdate(element.id, { left: d.x, top: d.y })}
        onResizeStop={(e, dir, ref, delta, position) =>
          onUpdate(element.id, {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            left: position.x,
            top: position.y,
          })
        }
        className="absolute cursor-move transition-all"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {element.type === "image" ? (
          <img
            src={element.content}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        ) : element.type === "button" ? (
          <button
            className="px-4 py-2 font-semibold rounded-lg border-none"
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {element.content}
          </button>
        ) : (
          <p
            className="text-gray-900 text-lg font-semibold"
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "transparent",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }}
          >
            {element.content}
          </p>
        )}

        {hovered && (
          <button
            onClick={() => onDelete(element.id)}
            className="absolute -top-6 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg hover:scale-110"
          >
            ✕
          </button>
        )}
      </Rnd>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-3 text-black">Edit Content</h2>
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 text-black"
            />
            <div className="flex justify-end mt-3 space-x-2">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DraggableElement;
