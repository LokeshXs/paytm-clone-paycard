import db from "@repo/database/client";

export async function POST(request: Request) {
  const { userId }: { userId: string } = await request.json();
  const userDetails = await db.user.findUnique({
   where:{
    id:userId
   }
  });

  // console.log(userDetails);

  return Response.json({
    status: "success",
    data:{name:userDetails?.name,email:userDetails?.email,phoneNumber:userDetails?.phonenumber}
  });
}
