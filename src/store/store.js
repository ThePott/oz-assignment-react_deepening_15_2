import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

// Fold Level 4
const useBoardStore = create(
    persist(
        (set) => ({
            data: [],
            setData(data) { set({ data }) },
            addBoard(boardItem) {
                set((state) => {
                    return { data: [...state.data, boardItem] }
                })
            },
            removeBoard(boardItemId) {
                set((state) => {
                    const filteredData = state.data.filter((item) => item.id !== boardItemId)
                    return { data: filteredData }
                })
            },
            updateBoard(boardItem) {
                set((state) => {
                    const copiedData = [...state.data]
                    const targetItem = copiedData.find((item) => item.id === boardItem.id)
                    for (const key in boardItem) {
                        targetItem[key] = boardItem[key]
                    }
                    return { data: copiedData }
                })
            },
        }),
        {
            name: "kanban-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useBoardStore