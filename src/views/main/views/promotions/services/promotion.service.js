import { zergApi } from "@/service/zerg";

class PromotionService {
  async list(payload) {
    try {
      const data = await zergApi.post("/promotion/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(payload,headers) {
    try {
      const data = await zergApi.post("/promotion/register", payload,headers);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(payload,headers) {
    try {
      const data = await zergApi.post("/promotion/update", payload,headers);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PromotionService();
