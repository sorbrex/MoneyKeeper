export type AlertType = "success" | "info" | "warning" | "error";
export type RequestStatus = "idle"|"good"|"error"|"running"
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
  id?: string
  name: string
  description?: string
  amount: string
  categoryId: string
  type: string
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
  id: string
  name: string
  description?: string
  amount: number
  type: "expense" | "income"
  ownerId: string
  categoryId: string
  createdAt: Date
}

//==========================
//===== Category Type ======
//==========================
export type Category = {
  id: string
  name: string
  description?: string
}

export type CategoryWithAmount = {
  category: string
  amount: number
}

export type NormalizedCategoryForChart = Array<CategoryWithAmount>