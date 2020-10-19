import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import User from "../models/User";

export default {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      return response
        .status(400)
        .json({ Message: "Incorrect email/password combination." });
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      return response
        .status(400)
        .json({ Message: "Incorrect email/password combination." });
    }

    const token = sign({}, "d377ac48d8261f59d032f91db5d49968", {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return response.status(200).json({ user, token });
  },
};
