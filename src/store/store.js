import { create } from "zustand";

// Fold Level 3
const useBoardStore = create((set) => ({
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
    }
}))

export default useBoardStore