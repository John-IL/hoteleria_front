import { zergApi } from "@/service/zerg";

class RoomService {
  async getRoomCategories() {
    try {
      const data = await zergApi.get("/room-categories/list");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRoomFloors() {
    try {
      const data = await zergApi.get("/room-floors/list");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRoomPromotions() {
    try {
      const data = await zergApi.get("/room-promotions/list");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async storeRoom(payload) {
    try {
      const data = await zergApi.post("/room/store", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async list(payload) {
    try {
      const data = await zergApi.post("/room/list", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(payload) {
    try {
      const data = await zergApi.post("/room/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async update(payload) {
    try {
      const data = await zergApi.post("/room/update", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async listSelect() {
    try {
      const data = await zergApi.get("/room/list-select");
      return data;
    } catch (error) {
      throw error;
    }
  }

  
  async methodSelect() {
    try {
      const data = await zergApi.get("/method/list-select");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAvailableRooms(payload) {
    try {
      const data = await zergApi.post("/room/availables", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async validateUniqueRoom(payload) {
    try {
      const data = await zergApi.post("/room/validate-unique", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new RoomService();
