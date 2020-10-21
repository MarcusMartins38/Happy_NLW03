import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import { hash } from "bcryptjs";

import User from "../models/User";

export default {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersRepository = getRepository(User);

    const findEmail = await usersRepository.findOne({ where: { email } });

    if (findEmail) {
      return response
        .status(500)
        .json({ message: "This email is already in use" });
    }

    const data = { name, email, password };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    schema.validate(data, {
      abortEarly: false,
    });

    const hashedPassword = await hash(password, 8);

    const formattedData = {
      name,
      email,
      password: hashedPassword,
    };

    const user = usersRepository.create(formattedData);

    await usersRepository.save(user);

    delete user.password;

    return response.status(201).json(user);
  },
};
