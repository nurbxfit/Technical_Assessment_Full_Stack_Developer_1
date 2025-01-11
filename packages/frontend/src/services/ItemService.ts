import { ItemType } from "shared";
import { AxiosHttpClient, IHttpClient } from "./httpClient.service";

class ItemService {
  constructor(protected httpClient: IHttpClient) {}

  async getItems() {
    const result = await this.httpClient.get("/items/");
    return result;
  }

  async createItem(item: ItemType) {
    const result = await this.httpClient.post("/items/", item);
    return result;
  }

  async updateItem(id: number, item: ItemType) {
    const result = await this.httpClient.put(`/items/${id}`, item);
    return result;
  }

  async deleteItem(id: number) {
    const result = await this.httpClient.delete(`/items/${id}`);
    return result;
  }
}

const axiosHttpClient = new AxiosHttpClient("http://localhost:3000/api");
export const itemService = new ItemService(axiosHttpClient);
