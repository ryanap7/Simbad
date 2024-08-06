interface LoadingInstance {
  show: () => void;
  hide: () => void;
}

class LoadingHelper {
  instance?: LoadingInstance;

  constructor() {
    this.setInstance = this.setInstance.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  setInstance(instances: LoadingInstance) {
    this.instance = instances;
  }

  show() {
    if (this.instance) {
      this.instance.show();
    }
  }

  hide() {
    if (this.instance) {
      this.instance.hide();
    }
  }
}

export default new LoadingHelper();
