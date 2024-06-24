const appendUriToUrl = (url: string, uri: string) => url.endsWith(uri) ? url : `${url}/${uri}`;

export { appendUriToUrl };
