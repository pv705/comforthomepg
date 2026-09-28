export class RequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export async function readJson(request: Request, maxBytes = 12000): Promise<unknown> {
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    throw new RequestError('Please submit JSON data.', 415);
  }
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    throw new RequestError('Request origin is not allowed.', 403);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError('Please provide your details.', 400);
  let size = 0;
  let text = '';
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError('Your request is too large.', 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally { reader.releaseLock(); }
  try { return JSON.parse(text); }
  catch { throw new RequestError('Please provide valid form data.', 400); }
}
