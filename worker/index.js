const AUDIO_ORIGIN = "https://customer-apps-techhq.s3.eu-west-2.amazonaws.com";
const AUDIO_PREFIX = "/app-floating-temple/sample_audio/";
const AUDIO_PATHS = {
  "ground-sample.m4a": "/app-floating-temple/ground-sample.m4a",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/audio/")) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", {
          status: 405,
          headers: { Allow: "GET, HEAD" },
        });
      }

      const fileName = url.pathname.slice("/audio/".length);
      if (!fileName || fileName.includes("/")) {
        return new Response("Not found", { status: 404 });
      }

      const upstreamPath = AUDIO_PATHS[fileName] || `${AUDIO_PREFIX}${fileName}`;
      const upstreamUrl = `${AUDIO_ORIGIN}${upstreamPath}`;
      const upstreamResponse = await fetch(upstreamUrl, {
        method: request.method,
        headers: request.headers.has("Range")
          ? { Range: request.headers.get("Range") }
          : undefined,
      });
      const headers = new Headers(upstreamResponse.headers);
      headers.set("Content-Type", "audio/mp4");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cache-Control", "public, max-age=3600");

      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
