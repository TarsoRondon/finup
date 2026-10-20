export interface Goal {
  id: string
  userId: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  categoryIcon?: string
  color?: string
}
