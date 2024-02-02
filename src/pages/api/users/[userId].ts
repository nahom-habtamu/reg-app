import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../db";
import { sleep } from "../../../../utils";

const deleteFailureRate = 0;

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  region: string;
  streetAddress: string;
  postalCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await sleep(1000);

  try {
    if (req.method === "GET") {
      return await GET(req, res);
    } else if (req.method === "PATCH") {
      return await PATCH(req, res);
    } else if (req.method === "DELETE") {
      return await DELETE(req, res);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ message: "An unknown error occurred!" });
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse<any>) {
  const {
    query: { userId },
  } = req;

  const row = (await db.get()).users.find((d: User) => d.id == userId);

  if (!row) {
    res.status(404);
    return res.send("Not found");
  }

  res.json(row);
}

async function PATCH(req: NextApiRequest, res: NextApiResponse<any>) {
  const {
    query: { userId },
    body,
  } = req;

  if (body.body.includes("fail")) {
    res.status(500);
    res.json({ message: "An unknown error occurred!" });
    return;
  }

  const row = (await db.get()).users.find((d: User) => d.id == userId);

  if (!row) {
    res.status(404);
    return res.send("Not found");
  }

  delete body.id;

  const newRow = {
    ...row,
    ...body,
  };

  await db.set((old: { users: User[] }) => {
    return {
      ...old,
      users: old.users.map((d) => (d.id == userId ? newRow : d)),
    };
  });

  res.json(newRow);
}

async function DELETE(req: NextApiRequest, res: NextApiResponse<any>) {
  const {
    query: { userId },
  } = req;

  if (Math.random() < deleteFailureRate) {
    res.status(500);
    res.json({ message: "An unknown error occurred!" });
    return;
  }

  const row = (await db.get()).users.find((d: User) => d.id == userId);

  if (!row) {
    res.status(404);
    return res.send("Not found");
  }

  await db.set((old: { users: User[] }) => {
    return {
      ...old,
      users: old.users.filter((d) => d.id != userId),
    };
  });

  res.status(200);
  res.send("Resource Deleted");
}
