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
  id: number
  name: string
  surname: string
  email: string
  password: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}