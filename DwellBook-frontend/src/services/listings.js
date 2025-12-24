import api from "./api";

export const fetchListings = () => {
  return api.get("/listings");
};
