import db from "@repo/database/client";
import { auth } from "@repo/web/auth";

export async function POST(request: Request) {
  const session = await auth();

  const { numberOfContacts }: { numberOfContacts: string } =
    await request.json();

  const totalP2PTransfers = await db.p2pTransfers.findMany({
    where: {
      OR:[
        {
          fromUserId: session?.userId,
        },
        {
          toUserId:session?.userId
        }
      ]
    },
    distinct: ["toUserId","fromUserId"],
    take: Number(numberOfContacts),
  });

  const contactDetails = totalP2PTransfers.map(async (transferDetails) => {
    const contact = await db.user.findFirst({
      where: {
        OR:[
          {
            id: transferDetails.toUserId,
          },
          {
            id: transferDetails.fromUserId
          }
        ],
        NOT:{
          id:session?.userId
        }
      },
    });

    return {
      name: contact?.name,
      phoneNumber: contact?.phonenumber,
      image: contact?.image,
    };
  });

  const latestTransfersContacts = await Promise.all(contactDetails);

  // console.log(latestTransfersContacts);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });

  return Response.json({
    status: "success",
    data: latestTransfersContacts,
  });
}
