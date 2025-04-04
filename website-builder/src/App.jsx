import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableElement from "./components/DraggableElement";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [elements, setElements] = useState([]);

  const addElement = (type, content) => {
    const newElement = {
      id: Date.now(),
      type,
      content,
      left: 100,
      top: 100,
      width: type === "image" ? 200 : 150,
      height: type === "image" ? 150 : 50,
    };
    setElements([...elements, newElement]);
  };

  const updateElement = (id, newProps) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...newProps } : el)));
  };

  const deleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => addElement("image", reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-screen bg-gray-100">
        <Sidebar addElement={addElement} handleImageUpload={handleImageUpload} />
        <div className="flex-1 relative bg-white border border-gray-300 rounded-lg overflow-hidden">
          {elements.map((element) => (
            <DraggableElement key={element.id} element={element} onUpdate={updateElement} onDelete={deleteElement} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
