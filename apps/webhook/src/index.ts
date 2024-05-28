import express from "express";
import db from "@repo/database/client"
import {BASE_URL} from "@repo/web/baseurl";
import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors({
  origin:BASE_URL
}))


app.post("/webhook", async (req, res) => {
  const { token, userId, amount } = req.body;

  // transactions
  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId,
        },
        data: {
          amount: {
            increment: Number(amount),
          },
        },
      }),

      db.onRampTransactions.update({
        where: {
          token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Captured",
    });
  } catch (error) {
    // console.log(error);

    res.status(411).json({
      message: "Error while processing the webhook",
    });
  }
});

app.listen(3001, () => {
  console.log("Bank Webhook server is running at: ", 3001);
});
