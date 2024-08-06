import { useRouter, useSegments } from "expo-router";

class NavigationService {
  private router: ReturnType<typeof useRouter> | null = null;

  constructor() {
    this.setRouter = this.setRouter.bind(this);
    this.navigate = this.navigate.bind(this);
    this.replace = this.replace.bind(this);
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getCurrentRoute = this.getCurrentRoute.bind(this);
  }

  setRouter(router: ReturnType<typeof useRouter>) {
    this.router = router;
  }

  navigate(path: string) {
    if (this.router) {
      this.router.push(path);
    }
  }

  replace(path: string) {
    if (this.router) {
      this.router.replace(path);
    }
  }

  push(path: string) {
    if (this.router) {
      this.router.push(path);
    }
  }

  goBack() {
    if (this.router) {
      this.router.back();
    }
  }

  getCurrentRoute() {
    const segments = useSegments();
    return segments;
  }
}

export default new NavigationService();
