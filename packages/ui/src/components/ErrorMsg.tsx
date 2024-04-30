
export default function ErrorMsg({message}:{message:string}){

  return (
    <div className="text-center border-2 border-destructive bg-destructive/50 p-2 text-primary max-sm:text-sm w-full rounded-xl">
      {message}
    </div>
  )

}