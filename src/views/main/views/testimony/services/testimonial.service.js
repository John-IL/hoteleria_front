import { zergApi } from "@/service/zerg";

class TestimonialService {
  async register(payload) {
    try {
      const data = await zergApi.post("/testimonial/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(payload) {
    try {
      const data = await zergApi.post("/testimonial/update", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async list(payload) {
    try {
      const data = await zergApi.post("/testimonial/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new TestimonialService();
