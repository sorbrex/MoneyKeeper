export type AlertType = "success" | "info" | "warning" | "error";

//====================
//==== Form Types ====
//====================
export type ContactFormValues = {
  name: string
  email: string
  message: string
}

export type SignUpFormValues = {
  name: string
  surname: string
  email: string
  password: string
  password_confirmation: string
}

export type PasswordChangeFormValues = {
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export type CreateTransactionFormValues = {
  name: string
  description?: string
  amount: string
  categoryId: string
}

export type LogInFormValues = {
  email: string
  password: string
}

export type RecoveryFormValues = {
  email: string
}

//====================
//==== User Type ====
//====================

export type User = {
  id: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  remoteImageUrl: string
}

//==========================
//==== Transaction Type ====
//==========================
export type Transaction = {
  id: number
  name: string
  description?: string
  amount: number
  type: "expense" | "income"
  ownerId: string
  categoryId: string
  createdAt: Date
}

export type DailyTransaction = {
  date: string,
  expense: {[key: string]: number},   // {category: amount} => {food: 100, transport: 50} => daily.expense.food = 100
  income: {[key: string]: number},   // {category: amount} => {work: 100, transport: 50} => daily.income.food = 100
}

export type NormalizedTransactionForChart = Array<DailyTransaction>


//==========================
//===== Category Type ======
//==========================
export type Category = {
  id: string
  name: string
  description?: string
}