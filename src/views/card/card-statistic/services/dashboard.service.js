import { zergApi } from "@/service/zerg";

class DashboardService {
  async getIndicators() {
    try {
      const data = await zergApi.get(`dashboard/indicators`);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getCalendarReserves(payload) {
    try {
      const data = await zergApi.post(`dashboard/calendar-reserves`, payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new DashboardService();
