import shortid from "shortid";
import db from "../../../../db";
import { sleep } from "../../../../utils";
import { NextApiRequest, NextApiResponse } from "next";

const failureRate = 0;

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
    } else if (req.method === "POST") {
      return await POST(req, res);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ message: "An unknown error occurred!" });
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse<any>) {
  const {
    query: { pageOffset, pageSize },
  } = req;

  const users = (await db.get()).users.map((d: any) => ({
    ...d,
  }));

  if (Number(pageSize)) {
    const start = Number(pageSize) * Number(pageOffset);
    const end = start + Number(pageSize);
    const page = users.slice(start, end);

    return res.json({
      items: page,
      nextPageOffset: users.length > end ? Number(pageOffset) + 1 : undefined,
    });
  }

  res.json(users);
}

async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  if (Math.random() < failureRate) {
    res.status(500);
    res.json({ message: "An unknown error occurred!" });
    return;
  }

  const users: User[] = (await db.get()).users;

  if (users.filter((user) => user.email === req.body.email)) {
    res.status(400);
    res.json({ message: "User with that email already registered" });
    return;
  }
  const row: User = {
    id: shortid.generate(),
    ...req.body,
  };

  await db.set((old: any) => {
    return {
      ...old,
      users: [...old.users, row],
    };
  });

  res.json(row);
}
