import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Lütfen geçerli bir isim giriniz."),
    email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz."),
    password: z
      .string()
      .min(6, "Şifre en az 6 haneli olmalıdır")
      .max(15, "Şifre çok uzun"),
    confirmPassword: z.string(),
    confirmTerms: z.boolean().refine((val) => val, {
      message: "Onay kutusunu işaretleyiniz.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Girdiğiniz şifreler uyuşmuyor.",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz."),
  password: z
    .string()
    .min(6, "Şifre en az 6 haneli olmalıdır.")
    .max(15, "Şifre çok uzun."),
});
