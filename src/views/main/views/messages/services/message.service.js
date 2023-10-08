import { zergApi } from "@/service/zerg";

class MessageService {


  async List(payload) {
    try {
      const data = await zergApi.post("/message/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(payload) {
    try {
      const data = await zergApi.post("/message/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async UpdateStatus(payload) {
    try {
      const data = await zergApi.post("/message/update-status", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async NotReaded() {
    try {
      const data = await zergApi.get("/message/not-readed");
      return data;
    } catch (error) {
      throw error;
    }
  }

}

export default new MessageService();
