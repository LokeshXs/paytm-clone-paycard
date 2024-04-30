
export default function SuccessMsg({message}:{message:string}){

  return (
    <div className="text-center border-2 border-green-500 bg-green-500/50 p-2 text-primary-foreground max-sm:text-sm  w-full rounded-xl">
      {message}
    </div>
  )

}