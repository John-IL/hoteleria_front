import { zergApi } from "@/service/zerg";

class ClientService {
  async register(payload) {
    try {
      const data = await zergApi.post("/client/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(payload) {
    try {
      const data = await zergApi.post("/client/update", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async list(payload) {
    try {
      const data = await zergApi.post("/client/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async listSelect() {
    try {
      const data = await zergApi.get("/client/list-select");
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ClientService();
