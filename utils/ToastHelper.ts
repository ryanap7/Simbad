export interface ToastInstance {
  show: (type: ToastState["type"], message: string) => void;
  hide: () => void;
}

export interface ShowToastProps {
  type: ToastState["type"];
  message: string;
}

export interface ToastState {
  visible: boolean;
  message: string;
  type: "success" | "danger" | "warning";
}

class ToastHelper {
  instance?: ToastInstance;
  constructor() {
    this.setInstance = this.setInstance.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  setInstance(instances: ToastInstance) {
    this.instance = instances;
  }

  show({ type, message }: ShowToastProps) {
    if (this.instance) {
      this.instance.show(type, message);
    }
  }
  hide() {
    if (this.instance) {
      this.instance.hide();
    }
  }
}
export default new ToastHelper();
