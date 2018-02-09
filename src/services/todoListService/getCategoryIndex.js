export function getCategoryIndex(id, todoCategories) {
  // let props = this.state.todoProps;
  for (let i = 0; i < todoCategories.length; i++) {
    if (todoCategories[i].id === id) {
      return i;
    }
  }

  return -2;
}
