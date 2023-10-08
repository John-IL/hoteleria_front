import { zergApi } from "@/service/zerg";

class SectionsService {
  async getAreas() {
    try {
      const data = await zergApi.get(`/section/get-sections-available`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new SectionsService();
