import { zergApi } from "@/service/zerg";

class CategoryService {
  async register(payload, headers) {
    try {
      const data = await zergApi.post("/category/register", payload, headers);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(payload, headers) {
    try {
      const data = await zergApi.post("/category/update", payload, headers);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async list(payload) {
    try {
      const data = await zergApi.post("/category/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
