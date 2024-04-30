
import {z} from "zod";

export const SignUpSchema = z.object({
  fullname: z.string().min(2,"Too Short!"),
  phonenumber: z.string().regex(/^[789][0-9]{9}$/,"Invalid Number!"),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,"Password requirement not met"),
})


export const SignInSchema = z.object({
  phonenumber:z.string().regex(/^[789][0-9]{9}$/,"Invalid number!"),
  password:z.string().min(2,"Invalid password"),
})