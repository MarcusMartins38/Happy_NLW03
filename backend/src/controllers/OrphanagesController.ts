import { Request, Response } from "express";
import { getRepository } from "typeorm";
import orphanageView from "../views/orphanages_view";
import * as Yup from "yup";

import Orphanage from "../models/Orphanage";
import User from "../models/User";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images", "user", "items"],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images", "user", "items"],
    });

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      institute_type,
      items,
    } = request.body;

    const user_id = request.user.id;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      return response.status(500).json({ Message: "This user not exists" });
    }

    const formatItems = items.map((item: any) => ({name: item}))

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      institute_type,
      user,
      images,
      items: formatItems,
    };
    console.log(data)

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      institute_type: Yup.string().required(),
      items: Yup.array(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    delete orphanage.user.password;

    return response.status(201).json(orphanage);
  },
};
