import postsRoutes from "../routes/post";
import profileRoutes from "../routes/profile";
import authRoutes from "../routes/auth";
import usersRoutes from "../routes/users";

export default app => {
  app.use("/api/post", postsRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/user", usersRoutes);
};
