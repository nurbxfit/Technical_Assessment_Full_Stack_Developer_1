import { AxiosHttpClient, IHttpClient } from "./httpClient.service";

class ItemService {
  constructor(protected httpClient: IHttpClient) {}

  async getItems() {
    const result = await this.httpClient.get("/items/");
    return result;
  }

  createItem() {}

  updateItem() {}

  deleteItem() {}
}

const axiosHttpClient = new AxiosHttpClient("http://localhost:3000/api");
export const itemService = new ItemService(axiosHttpClient);
