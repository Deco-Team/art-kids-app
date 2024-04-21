import { ICourse } from '@/src/business/course/course'
import { create } from 'zustand'

interface State {
  course: ICourse | null
  isCompleted: boolean
  isSuccess: boolean
  error?: string
}

interface Actions {
  checkout: (course: ICourse) => void
  orderSuccess: () => void
  orderFail: () => void
}

const initialState: State = {
  course: null,
  isCompleted: false,
  isSuccess: false
} as const

export const useCheckoutStore = create<State & Actions>()((set) => ({
  ...initialState,
  checkout: (course) => set(() => ({ ...initialState, course })),
  orderSuccess: () => set(() => ({ isCompleted: true, isSuccess: true })),
  orderFail: () => set(() => ({ isCompleted: true, isSuccess: false }))
}))
