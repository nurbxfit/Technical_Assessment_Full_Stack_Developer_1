import { ItemType } from "shared";
import { AxiosHttpClient, IHttpClient } from "./httpClient.service";

class ItemService {
  constructor(protected httpClient: IHttpClient) {}

  async getItems() {
    const result = await this.httpClient.get("/items/");
    return result;
  }

  async createItem(item: ItemType) {
    try {
      const result = await this.httpClient.post("/items/", item);
      return result;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  updateItem() {}

  deleteItem() {}
}

const axiosHttpClient = new AxiosHttpClient("http://localhost:3000/api");
export const itemService = new ItemService(axiosHttpClient);
