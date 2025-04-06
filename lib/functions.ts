import { PasswordStrength } from "@/types/type";

export const getPasswordStrength = (password: string): PasswordStrength => {
  const lengthScore = password.length >= 12 ? 2 : password.length >= 8 ? 1 : 0;
  const hasUppercase = /[A-Z]/.test(password) ? 1 : 0;
  const hasLowercase = /[a-z]/.test(password) ? 1 : 0;
  const hasNumber = /\d/.test(password) ? 1 : 0;
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password) ? 1 : 0;

  const totalScore = lengthScore + hasUppercase + hasLowercase + hasNumber + hasSpecialChar;

  if (totalScore >= 5) {
    return {
      label: "Strong",
      color: "bg-green-500",
      width: "w-full",
    };
  } else if (totalScore >= 3) {
    return {
      label: "Medium",
      color: "bg-yellow-500",
      width: "w-2/3",
    };
  } else {
    return {
      label: "Weak",
      color: "bg-red-500",
      width: "w-1/3",
    };
  }
};
