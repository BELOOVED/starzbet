import { type TOrm } from "./Orm";

let base: TOrm | null = null;

const ormStaticFacade: TOrm = new Proxy({} as TOrm, {
  get(_: TOrm, name: string): any {
    if (null === base) {
      throw new Error("Base ORM not set call \"setConcreteOrm\" first.");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return base[name];
  },
});

const setConcreteOrm = (orm: TOrm) => base = orm;

export { ormStaticFacade, setConcreteOrm };
