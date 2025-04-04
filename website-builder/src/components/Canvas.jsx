import { useDrop } from 'react-dnd'
import { CanvasElement } from './CanvasElement.jsx'
import { useBuilder } from './BuilderContext.jsx'

export function Canvas() {
  const { elements, addElement, selectedElement, selectElement } = useBuilder()
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset()
      const canvasRect = document.querySelector('.canvas-area').getBoundingClientRect()
      const position = {
        x: offset.x - canvasRect.left,
        y: offset.y - canvasRect.top
      }
      addElement(item.type, position)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      className={`canvas-area relative w-full min-h-[80vh] bg-white rounded-lg shadow-sm transition-colors ${
        isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : 'border border-gray-200'
      }`}
    >
      {elements.map((element) => (
        <CanvasElement
          key={element.id}
          element={element}
          isSelected={selectedElement?.id === element.id}
          onClick={() => selectElement(element.id)}
        />
      ))}
    </div>
  )
}