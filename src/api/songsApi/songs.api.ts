import axios from "../index";
import { TSong } from "../../features/main/songs/Songs.types";

export const songsApi = {
  getSongs: () => axios.get<TSong[]>("songs"),
};
