import Items from '../models/items';

export default {
  render(Item: Items) {
    return {
      id: Item.id,
      name: Item.name,
    };
  },

  renderMany(items: Items[]) {
    return items.map(item => this.render(item));
  }
}