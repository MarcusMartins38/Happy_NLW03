import Orphanage from "../models/Orphanage";
import imagesView from "./images_view";
import itemsView from "./items_view";

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      user_id: orphanage.user.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      institute_type: orphanage.institute_type,
      phone_number: orphanage.phone_number,
      pix_keys: orphanage.pix_keys,
      items: itemsView.renderMany(orphanage.items),
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};
