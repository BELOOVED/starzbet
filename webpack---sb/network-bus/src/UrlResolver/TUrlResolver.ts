type TUrlResolver = (uri: string) => string

const simpleUrlResolver = (url: string): TUrlResolver => () => url;

export { TUrlResolver, simpleUrlResolver };
