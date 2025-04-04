import React from "react";

const Sidebar = ({ addElement, handleImageUpload }) => {
  return (
    <div className="w-1/5 bg-gray-900 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Elements</h2>
      <button className="bg-blue-600 px-4 py-2 w-full mb-2" onClick={() => addElement("text", "New Text")}>
        Add Text
      </button>
      <button className="bg-green-600 px-4 py-2 w-full mb-2" onClick={() => addElement("button", "Click Me")}>
        Add Button
      </button>
      <label className="bg-gray-700 px-4 py-2 w-full text-white cursor-pointer block text-center">
        Upload Image
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>
    </div>
  );
};

export default Sidebar;
