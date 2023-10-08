import { zergApi } from "@/service/zerg";

class BannerService {
  async register(body, headers) {
    try {
      const data = await zergApi.post("/banner/register", body, headers);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async list(payload) {
    try {
      const data = await zergApi.post("/banner/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async Last10() {
    try {
      const data = await zergApi.get("/banner/last-10");
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new BannerService();
