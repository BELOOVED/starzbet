// eslint-disable-next-line @typescript-eslint/ban-types
type TFormExtensionKey<String extends string> = `@formExtension__${String}`

const createFormExtensionKey = <Name extends string>(name: Name): TFormExtensionKey<Name> => `@formExtension__${name}`;

export { createFormExtensionKey };

export type { TFormExtensionKey };
