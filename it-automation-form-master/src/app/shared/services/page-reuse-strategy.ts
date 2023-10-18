import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router'

export class PageReuseService implements RouteReuseStrategy {
  static cacheRouters = new Map<string, DetachedRouteHandle>();

  public static deleteRouteCache(url: string): void {
      if (PageReuseService.cacheRouters.has(url)) {
          const handle: any = PageReuseService.cacheRouters.get(url);
          try {
              handle.componentRef.destory();
          } catch (e) { }
          PageReuseService.cacheRouters.delete(url);
      }
  }

  public static deleteAllRouteCache(): void {
    PageReuseService.cacheRouters.forEach((handle: any, key) => {
      PageReuseService.deleteRouteCache(key);
      });
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
      return future.routeConfig === curr.routeConfig &&
          JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | any {
      const url = this.getFullRouteURL(route);
      if (route.data['keep'] && PageReuseService.cacheRouters.has( url) ) {
          return PageReuseService.cacheRouters.get(url);
      } else {
          return null;
      }
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
      return Boolean(route.data['keep']);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      const url = this.getFullRouteURL(route);
      PageReuseService.cacheRouters.set(url, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
      const url = this.getFullRouteURL(route);
      return Boolean(route.data['keep']) && PageReuseService.cacheRouters.has(url);
  }

  private getFullRouteURL(route: ActivatedRouteSnapshot): string {
      const { pathFromRoot } = route;
      let fullRouteUrlPath: string[] = [];
      pathFromRoot.forEach((item: ActivatedRouteSnapshot) => {
          fullRouteUrlPath = fullRouteUrlPath.concat( this.getRouteUrlPath(item) );
      });
      return `/${fullRouteUrlPath.join('/')}`;

  }
  private getRouteUrlPath(route: ActivatedRouteSnapshot) {
      return route.url.map(urlSegment => urlSegment.path);
  }
}
