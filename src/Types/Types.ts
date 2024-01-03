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
export type Transaction = { //TODO: Stub Type, should write the real one
  id: number
  name: string
  description: string
  amount: number
  createdAt: Date
  updatedAt: Date
}