import { revalidatePath } from "next/cache";
import db from "../../../../lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // console.log(params);

  const transaction = await db.onRampTransactions.findUnique({
    where: {
      id: params.id,
    },
  });

 

  return Response.json({
  
    status: transaction?.status,
  });
}
