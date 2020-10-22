import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import { hash } from "bcryptjs";

import User from "../models/User";
import orphanageView from "../views/orphanages_view";
import Orphanage from "../models/Orphanage";

export default {
  async deleteOrphanage(request: Request, response: Response) {
    const { id } = request.params;

    const user_id = request.user.id;

    const orphanagesRepository = getRepository(Orphanage);
    const findId = await orphanagesRepository.findOne({
      relations: ["images", "user"],
      where: { id },
    });

    if (!findId) {
      return response
        .status(500)
        .json({ Message: "This Orphanage Id note exists" });
    }

    if (String(findId.user.id) !== user_id) {
      return response
        .status(500)
        .json({ Message: "You are not the creator of this orphanage " });
    }

    await orphanagesRepository.delete(id);

    return response.status(200).json({ Message: "Item was deleted" });
  },

  async indexUserOrphanages(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const user_id = request.user.id;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      return response.status(500).json({ Message: "This user not exists" });
    }

    const orphanages = await orphanagesRepository.find({
      relations: ["images", "user"],
      where: { user },
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

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
