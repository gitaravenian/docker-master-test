import prisma from "../prisma/client.js";

export const userRepository = {
  async loginUser(loginDTO) {
    console.log(1);

    try {
      const user = await prisma.user.findUnique({
        where: { email: loginDTO.email },
      });

      if (!user) {
        return { error: "User not found" };
      }

      return {
        user,
        storedHashedPassword: user.password,
      };
    } catch (error) {
      console.error("Error in loginUser:", error);
      throw error;
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    } catch (error) {
      console.error("Error in getUserByEmail:", error);
      throw error;
    }
  },
};
