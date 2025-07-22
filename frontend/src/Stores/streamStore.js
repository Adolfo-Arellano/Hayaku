import { create } from 'zustand'

export const useStreamStore = create((set) => ({
  // Estado
  activeStream: null,
  isStreamViewOpen: false,
  
  // Acciones
  openStreamView: (streamData) => set({ 
    activeStream: streamData, 
    isStreamViewOpen: true 
  }),
  
  closeStreamView: () => set({ 
    activeStream: null, 
    isStreamViewOpen: false 
  }),
}))