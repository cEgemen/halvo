import z from "zod";

const registerSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z
    .string()
    .min(8, "Parola en az 8 karakter olmalıdır.")
    .regex(/[a-z]/, "Parola en az bir küçük harf içermelidir.")
    .regex(/[A-Z]/, "Parola en az bir büyük harf içermelidir.")
    .regex(/\d/, "Parola en az bir rakam içermelidir.")
    .regex(/[^\w\s]/, "Parola en az bir özel karakter içermelidir."),
});

export type RegisterRequest = z.infer<typeof registerSchema>;
