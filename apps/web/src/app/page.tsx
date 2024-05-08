import { Button } from "@repo/ui/button";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { AnimatedTooltip } from "@repo/ui/animatedtooltip";
import { FEEDBACK_DATA } from "../lib/data";
import NavBar from "@repo/ui/navbar";

export default async function Page() {
  return (
    <main className="px-12 max-md:p-4 ">
      <div className="max-w-[1400px] mx-auto ">
        <NavBar />
        <section className="flex items-center gap-12 min-h-screen  bg-background max-lg:flex-col max-lg:pt-20 max-sm:pt-12  max-lg:gap-20 max-sm:gap-6">
          <div className="flex-[1.5] space-y-6">
            <h1 className="text-7xl max-xl:text-6xl max-sm:text-5xl font-bold text-primary leading-tight">
              The New Era of Gloabl Payments 
            </h1>
            <p className="text-lg max-sm:text-base text-muted-foreground leading-normal">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Corrupti, reiciendis quas libero omnis rerum corporis mollitia
              consequatur neque suscipit incidunt? ?New change Lokesh
            </p>
            <Button className="bg-secondary text-primary hover:bg-secondary">
              Read More
            </Button>

            <div className="flex gap-6 pt-12 max-sm:pt-6  max-sm:flex-col-reverse">
              <div className="bg-primary w-fit max-sm:w-full max-sm:max-w-full max-w-[200px] flex flex-col px-2 py-4  items-center rounded-lg  rounded-br-3xl justify-between">
                <p className="text-primary-foreground text-xl max-sm:text-lg ">
                  Global Reach
                </p>
                <p className=" text-4xl font-medium text-secondary ">72+</p>
                <p className="text-primary-foreground text-sm text-center max-w-40 ">
                  Countries with Excellence
                </p>
              </div>
              <div className="bg-secondary w-fit  flex flex-col px-2 py-4  items-center rounded-lg gap-4  rounded-tl-3xl justify-between max-w-[380px] max-sm:w-full max-sm:max-w-full">
                <div className="space-y-2">
                  <div className="flex flex-row items-center justify-center w-full">
                    <AnimatedTooltip items={FEEDBACK_DATA} />
                  </div>
                  <p className="text-primary text-xl max-sm:text-base font-semibold text-center ">
                    Trusted 12,000+ Businesses World wide
                  </p>
                </div>

                <p className="text-primary font-medium text-sm text-center  ">
                  Our client's feedback is valuable to us!
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative max-lg:w-full max-lg:flex max-lg:justify-center ">
            <div className="bg-primary w-fit max-w-[360px] flex px-2 min-h-[140px] items-center rounded-lg  rounded-tr-3xl justify-between absolute z-10 right-0 max-lg:top-2 max-sm:top-0  shadow-lg  ">
              <p className="text-primary-foreground text-lg max-sm:text-base ">
                Easy payment for anyone. No rush, stress, or high costs.
              </p>
              <div className="bg-secondary px-2 py-6 max-sm:px-1 max-sm:py-4 rounded">
                <Volume2 />
              </div>
            </div>
            <Image
              src="/hero-img.png"
              alt="Lady"
              width={400}
              height={400}
              className="relative z-20"
            />
          </div>
        </section>

        <section className="mb-20 mt-20">
          <h2 className="text-center text-4xl max-sm:text-3xl font-semibold leading-normal text-primary">
            Get to know more about <br /> "PayCard"
          </h2>
          <div className="flex justify-center gap-12 mt-14 max-sm:mt-8 max-lg:flex-col max-lg:items-center">
            <div className="flex gap-12 max-sm:flex-col">
              <div className=" max-w-60 max-sm:max-w-full  min-h-40 bg-muted rounded-lg rounded-tl-3xl flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-4xl font-bold text-primary">
                  150 <span className="text-secondary">M</span>
                </p>
                <p className="text-muted-foreground text-center">
                  PayCard's user till 2023
                </p>
              </div>
              <div className=" max-w-60 max-sm:max-w-full  min-h-40 bg-secondary rounded-lg rounded-tr-3xl flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-4xl font-bold text-primary">
                  500 <span className="text-background">M</span>
                </p>
                <p className="text-muted-foreground text-center">
                  PayCard's revenue in 2023 first quarter
                </p>
              </div>
            </div>
            <div className="flex gap-12 max-sm:flex-col">
              <div className=" max-w-60 max-sm:max-w-full min-h-40 bg-muted rounded-lg rounded-bl-3xl flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-4xl font-bold text-primary">
                  92 <span className="text-secondary">%</span>
                </p>
                <p className="text-muted-foreground text-center">
                  PayCard's investment growth in 2023
                </p>
              </div>
              <div className=" max-w-60 max-sm:max-w-full  min-h-40 bg-muted rounded-lg rounded-br-3xl flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-4xl font-bold text-primary">
                  9.1 <span className="text-secondary">M</span>
                </p>
                <p className="text-muted-foreground text-center">
                  PayCard's user's from over the globe
                </p>
              </div>
            </div>
          </div>

          <div className=" bg-secondary px-20 max-lg:px-12 max-md:px-6 py-8 max-md:py-4  mt-14 max-sm:mt-8  rounded-3xl rounded-tr-[400px] max-lg:rounded-tr-[200px] max-sm:rounded-tr-[100px] space-y-8 max-sm:space-y-6">
            <p className="px-6 py-2 bg-background w-fit rounded-full text-lg max-sm:text-base text-primary font-medium">
              Our Features
            </p>
            <p className="text-3xl max-sm:text-2xl font-medium text-primary">
              All of the cool features you <br /> need are here
            </p>

            <div className=" flex gap-6 max-sm:flex-col">
              <div className="max-w-[300px] max-sm:max-w-full bg-background p-4 rounded-2xl space-y-4  ">
                <h4 className="text-xl font-medium text-primary" >Secure Payments</h4>
                <Image
                  src="/illustrations/payment.svg"
                  alt="payment illustration"
                  width={400}
                  height={400}
                />
              </div>
              <div className="max-w-[300px] max-sm:max-w-full bg-background p-4 rounded-2xl space-y-4  ">
                <h4 className="text-xl font-medium text-primary">Global Currencies</h4>
                <Image
                  src="/illustrations/currencies.svg"
                  alt="payment illustration"
                  width={400}
                  height={400}
                />
              </div>
              <div className="max-w-[300px] max-sm:max-w-full bg-background p-4 rounded-2xl space-y-4  ">
                <h4 className="text-xl font-medium text-primary" >Seamless money Transfers</h4>
                <Image
                  src="/illustrations/transfer.svg"
                  alt="payment illustration"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
