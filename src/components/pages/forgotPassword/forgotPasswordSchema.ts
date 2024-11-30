import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz."),
});
