import { z } from "zod";

const orderFormSchema = z.object({
  name: z.string().min(1, { message: "Bu alan boş bırakılamaz" }),
  tel: z
    .string()
    .min(10, { message: "Lütfen geçerli bir telefon numarası giriniz." }),
  address: z.string().min(1, { message: "Bu alan boş bırakılamaz" }),
});

export default orderFormSchema;
