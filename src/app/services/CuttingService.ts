import apiClient from "./apiClient";
import { Service, ServiceInquiry } from "../../lib/types/service";

class CuttingService {
  public async getServices(input: ServiceInquiry): Promise<Service[]> {
    try {
      const { data } = await apiClient.get<Service[]>("/services/all", {
        params: {
          booking: input.booking,
          page: input.page,
          limit: input.limit,
          serviceCollection: input.serviceCollection || undefined,
          search: input.search || undefined,
        },
      });
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("CuttingService.getServices:", err);
      throw err;
    }
  }

  public async getService(serviceId: string): Promise<Service | null> {
    try {
      const { data } = await apiClient.get<Service | null>(
        `/services/${serviceId}`
      );
      return data ?? null;
    } catch (err) {
      console.error("CuttingService.getService:", err);
      throw err;
    }
  }
}

export default CuttingService;
