import { zergApi } from "@/service/zerg";

class UserServices {
  async register(payload) {
    try {
      const data = await zergApi.post("/user/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(payload) {
    try {
      const data = await zergApi.post("/user/update", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRoles() {
    try {
      const data = await zergApi.get("/roles/list");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDocumentTypes() {
    try {
      const data = await zergApi.get("/document-types/list");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getCountries() {
    try {
      const data = await zergApi.get("/countries/list");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(payload) {
    try {
      const data = await zergApi.post("/user/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserServices();
