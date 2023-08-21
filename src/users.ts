import { NextFunction, Request, Response, Router } from "express";
import protectApiRoute from "@/src/utils/protectApiRoute";
import User, { IUser } from "@/src/models/User";

export default function usersHandler() {
  const router = Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protectApiRoute(req, res);

      const users = await User.find();
      res.status(200).send(users);
    } catch (err) {
      next(err);
    }
  });

  // TODO: Does Not Exist error
  router.get("/current", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);

      const user = await User.findById(id);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:userId/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callerId = (await protectApiRoute(req, res)).id;
      const id = req.params.userId === "current" ? callerId : req.params.userId;

      const user = await User.findById(id);

      res.status(200).send({ status: user.status });
    } catch (err) {
      next(err);
    }
  });

  router.get("/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);
      res.redirect(`${id}/status`);
    } catch (err) {
      next(err);
    }
  });

  router.post("/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);

      const updated = await User.findByIdAndUpdate(id, { status: req.body.status }, { new: true });

      res.status(200).send({ status: updated.status });
    } catch (err) {
      next(err);
    }
  });

  router.get("/friends", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);

      const friends: IUser[] = [];
      const user = await User.findById(id);
      for (const friendId of user.friends) {
        const friend = await User.findById(friendId, "_id username pronouns tag status bio");
        if (friend)
          friends.push(friend);
      }

      res.status(200).send(friends);
    } catch (err) {
      next(err);
    }
  });

  router.post("/friends", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);

      const friend = await User.findById(req.body.friendId);
      const updated = await User.findByIdAndUpdate(id, {
        $push: { friends: friend._id }
      }, { new: true });

      res.status(200).send(updated);
    } catch (err) {
      next(err);
    }
  });

  // onboard
  router.post("/onboard", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await protectApiRoute(req, res);
      const data = req.body as Partial<IUser>;

      const updated = await User.findByIdAndUpdate(id, {
        pronouns: data.pronouns,
        username: data.username,
        avatarColor: data.avatarColor,
        birthday: data.birthday,
        language: data.language,
        timezone: data.timezone,
        games: data.games,
        onboarded: true
      });

      res.status(200).send(updated);
    } catch (err) {
      next(err);
    }
  });

  // this modifies a user_old without any checking
  if (process.env.NODE_ENV === "development") {
    router.post("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = await protectApiRoute(req, res);

        const updated = await User.findByIdAndUpdate(id,
          req.body, {
            new: true
          });

        res.status(200).send(updated);
      } catch (err) {
        next(err);
      }
    });
  }

  return router;
}