import { type TExplicitAny } from "@sb/utils";
import { CONTAINER_ID, ContainerException, type IContainer, type TFactory, type TId, type TParameters } from "./internal";

interface IContainerAware extends IContainer {
  setContainer(container: IContainer): void;
}

const isContainerAware = (instance: TExplicitAny): instance is IContainerAware =>
  typeof instance.setContainer === "function";

type TContainerFactory = { factory: TFactory<TExplicitAny>; singleton: boolean; };

class Container implements IContainer {
  private services: Record<TId, TExplicitAny> = {};

  private factories: Record<TId, TContainerFactory> = {};

  private parameters: Record<TId, TExplicitAny> = {};

  public has(id: TId): boolean {
    return Object.hasOwn(this.factories, id) || Object.hasOwn(this.services, id);
  }

  public get<T>(id: TId): T {
    const instance = this.doGet<T>(id);
    // todo ??
    if (isContainerAware(instance)) {
      instance.setContainer(this);
    }

    return instance;
  }

  public set<T>(id: TId, service: T): void {
    this.services[id] = service;
  }

  public setFactory<T>(id: TId, factory: TFactory<T>, singleton: boolean): void {
    this.factories[id] = { factory, singleton };
  }

  public getIds(): TId[] {
    return Reflect.ownKeys(this.factories);
  }

  public hasParameter(id: TId): boolean {
    return Object.hasOwn(this.parameters, id);
  }

  public getParameter<T>(id: TId): T {
    if (!Object.hasOwn(this.parameters, id)) {
      throw ContainerException.parameterNotFound(id);
    }

    return this.parameters[id] as T;
  }

  public getParameters(): TParameters {
    return this.parameters;
  }

  public setParameters(parameters: TParameters): void {
    this.parameters = parameters;
  }

  // public merge(container: Container): void {
  //   ["factories", "services", "parameters"].forEach((scope) => {
  //     Object.entries(container[scope]).forEach(
  //       ([id, value]) => (this[scope][id] = value),
  //     );
  //   });
  // }

  private doGet<T>(id: TId): T {
    if (id === CONTAINER_ID) {
      return this as unknown as T;
    }

    if (!this.has(id)) {
      throw ContainerException.serviceNotFound(id);
    }

    if (Object.hasOwn(this.services, id)) {
      return this.services[id] as T;
    }

    const { factory, singleton } = this.factories[id] as { factory: TFactory<T>; singleton: boolean; };

    if (singleton) {
      const instance = factory();

      this.set(id, instance);

      return instance;
    }

    return factory();
  }
}

export { Container };
