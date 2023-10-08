import { zergApi } from "@/service/zerg";

class ReserveService {
  async list(payload) {
    try {
      const data = await zergApi.post("/reserve/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async register(payload) {
    try {
      const data = await zergApi.post("/reserve/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async listReservesByClient(payload) {
    try {
      const data = await zergApi.post("/reserve/list-select",payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReserveService();
