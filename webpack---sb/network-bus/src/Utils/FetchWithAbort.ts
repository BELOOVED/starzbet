const fetchWithAbort = (input: RequestInfo, init?: RequestInit, timeout?: number): Promise<Response> => {
  if (!timeout || timeout <= 0) {
    return fetch(input, init);
  }

  const controller = new AbortController();

  if (init) {
    init.signal = controller.signal;
  }

  const timer = setTimeout(() => controller.abort(), timeout);

  return fetch(input, init).finally(() => clearTimeout(timer));
};

export { fetchWithAbort };
