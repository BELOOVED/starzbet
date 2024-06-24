import { type TId } from "./internal";

class ContainerException extends Error {
  public static serviceNotFound(id: TId) {
    return new ContainerException(`Service with id: ${String(id)} not found.`);
  }

  public static parameterNotFound(id: TId) {
    return new ContainerException(`Parameter with id: ${String(id)} not found.`);
  }
}

export { ContainerException };
