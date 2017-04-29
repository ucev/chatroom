class PageManager {
  constructor() {
    this.pages = [];
    this.state = {};
  }
  back() {
    this.pages.pop();
  }
  push(page, weight = undefined) {
    if (weight) {
      weight = weight < 1 ? 1 : weight;
      while (this.pages.length > 0) {
        if (this.pages[this.pages.length - 1].weight < weight) {
          break;
        }
        this.pages.pop();
      }
      this.pages.push({ page: page, weight: weight });
    } else {
      weight = 1;
      for (var p of this.pages) {
        weight = p.weight + 1;
      }
      this.pages.push({ page: page, weight: weight });
    }
  }
  replace(page) {
    if (this.pages.length > 0) {
      this.pages[this.pages.length - 1].page = page;
    } else {
      this.pages.push({ page: page, weight: 1 });
    }
  }
  setState(page, state) {
    this.state[page] = state;
  }
  getPage() {
    return this.pages[this.pages.length - 1].page;
  }
  getState(page) {
    return this.state[page];
  }
}

export default PageManager;
