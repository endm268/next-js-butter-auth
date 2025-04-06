export type User = {
  id?: string ;
  name?: string;
  email: string;
  password: string;
};

export type PasswordStrength = {
  label: "Weak" | "Medium" | "Strong";
  color: string;
  width: string;
};
