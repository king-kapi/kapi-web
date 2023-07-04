import { NextFunction, Request, Response, Router } from "express";
import protectApiRoute from "@/src/utils/protectApiRoute";
import Tag from "@/src/models/Tag";

export default function tagsHandler() {
  const router = Router();

  // get all games
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const tags = await Tag.find();
      res.status(200).send(tags);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const created = await Tag.create({ ...req.body });
      res.status(201).send(created);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:tagId", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      await Tag.deleteOne({
        _id: req.params.tagId
      });
      res.status(200).send("Successful");
    } catch (err) {
      next(err);
    }
  });

  return router;
}