import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Bu alan boş bırakılamaz."),
  category: z.string().min(1, "Bu alan boş bırakılamaz."),
  description: z.string().min(1, "Bu alan boş bırakılamaz."),
  price: z
    .string()
    .min(1, "Bu alan boş bırakılamaz.")
    .transform((val) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error("Geçerli bir sayı giriniz");
      }
      return num;
    }),
  image: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0, {
      message: "Bir görsel seçiniz",
    })
    .transform((fileList) => fileList[0]),
});
