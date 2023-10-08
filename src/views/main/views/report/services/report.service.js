import { zergApi } from "@/service/zerg";

class CategoryService {
  async predictReserve(payload) {
    try {
      const data = await zergApi.post("/predict/reserves", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async reportReserveForMonths(payload) {
    try {
      const data = await zergApi.post("/report/reserves", payload, { responseType: "blob" });
      return data;
    } catch (error) {
      throw error;
    }
  }

}

export default new CategoryService();
