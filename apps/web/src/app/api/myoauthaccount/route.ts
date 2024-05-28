import db from "@repo/database/client";

export async function POST(request: Request) {
  const { userId }: { userId: string } = await request.json();
  const userDetails = await db.account.findFirst({
   where:{
    userId:userId
   }
  });

//   console.log(userDetails);

  return Response.json({
    status: "success",
    data:{provider:userDetails?.provider}
  });
}
