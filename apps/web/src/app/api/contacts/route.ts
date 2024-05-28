import db from "@repo/database/client";
import { auth } from "@repo/web/auth";

export async function POST(request: Request) {
  const session = await auth();

  const { searchedContact } = await request.json();

  const data = await db.user.findMany({
    where: {
      phonenumber: {
        contains: searchedContact,
      },
      NOT: {
        id: session?.userId,
      },
    },
  });

  // console.log(data);
  const filteredData = data.map((contact) => {
    return {
      name: contact.name,
      phoneNumber: contact.phonenumber,
      image: contact.image,
    };
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });

  return Response.json({
    status: "success",
    data: filteredData,
  });
}
