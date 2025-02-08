import axios from "axios";

export const deleteSeminar = async (id: any) => {
  return await axios.delete("http://localhost:5000/seminars/" + id);
};
