import React, { FC } from 'react'
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface PropsType {
  children: JSX.Element | JSX.Element[],
  items: Array<{ id: string; [key: string]: any }>,
  onDragEnd: (oldIndex: number, newIndex: number) => void,
}


const SortableContainer: FC<PropsType> = (props) => {

  const { children, items, onDragEnd } = props

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
  )

  // 拖拽结束时触发, 获取拖拽前的索引和拖拽后的索引，然后进行重新排序
  const handleHandleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }


  return (
    <DndContext sensors={sensors} onDragEnd={handleHandleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer