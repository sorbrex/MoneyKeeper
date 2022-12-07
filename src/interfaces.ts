export type AlertType = "success" | "info" | "warning" | "error";

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