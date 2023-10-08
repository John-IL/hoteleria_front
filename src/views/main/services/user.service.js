import { zergApi } from "@/service/zerg";

class UserService {
  async getProfileInfo(userId) {
    try {
      const data = await zergApi.get(`/users/get-profile-info/${userId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
