import { Button } from "@repo/ui/button";
import { Avatar, AvatarImage } from "@repo/ui/avatar";
import SignUpForm from "@repo/ui/signupform";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@repo/ui/separator";
import { signUp } from "../../../actions/authentication";
import { signIn } from "../../../../auth";

export default function SignUpPage() {
  return (
    <main className="p-12 max-md:p-6 max-sm:p-4  flex justify-center items-center min-h-screen ">
      <div className="max-w-[1400px] w-full flex flex-col gap-12  ">
      <Link href="/" className="bg-primary text-background py-2 px-4 w-fit rounded-lg max-sm:w-full max-sm:text-center" >
        Back to home
        </Link>
        <div className=" max-w-[1200px] w-full mx-auto flex max-md:flex-col-reverse  gap-6 max-lg:gap-12 bg-muted rounded-3xl drop-shadow-2xl">
      
          <div className="w-[500px] max-md:w-full min-w-[260px]  flex flex-col justify-center items-center gap-12  p-6 ">
            <h1 className="text-4xl max-md:text-3xl  font-bold text-center">
              New Era of Global Payments
            </h1>
            <Image src="/signup.svg" alt="Signup" width={400} height={400} />
          </div>
          <div className="flex-1 bg-white rounded-3xl  p-12 max-lg:p-6 max-sm:p-2 space-y-8">
            <h2 className="text-2xl text-center font-semibold ">
              Create Account
            </h2>
            <SignUpForm action={signUp} />
            <div className="flex flex-col items-center justify-center gap-4 relative ">
              <Separator />
              <p>Or continue with</p>
              <div className="flex ">
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <Button
                    variant="outline"
                    className="flex gap-2 max-sm:gap-4 min-w-36"
                    type="submit"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/icons/google.png" />
                    </Avatar>
                    <p>Google</p>
                  </Button>
                </form>
              </div>
              <p className="font-normal text-sm">
                Already have an account? <Link href="/auth/signin">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
