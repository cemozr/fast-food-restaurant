import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Lütfen geçerli bir isim giriniz." }),
  tel: z
    .string()
    .min(10, { message: "Lütfen geçerli bir telefon numarası giriniz." }),
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz."),
  count: z.coerce.number().min(1, { message: "Bu alan boş bırakılamaz" }),
  date: z
    .string()
    .min(8, { message: "Lütfen geçerli bir tarih giriniz." })
    .max(10, { message: "Lütfen geçerli bir tarih giriniz." }),
});

export default formSchema;
