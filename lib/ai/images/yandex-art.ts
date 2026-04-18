const YANDEX_ART_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/imageGenerationAsync';

interface YandexArtInput {
  prompt: string;
  width?: number;
  height?: number;
}

export async function generateImageYandexArt(input: YandexArtInput): Promise<string> {
  const response = await fetch(YANDEX_ART_URL, {
    method: 'POST',
    headers: {
      Authorization: `Api-Key ${process.env.YANDEX_ART_API_KEY}`,
      'Content-Type': 'application/json',
      'x-folder-id': process.env.YANDEX_FOLDER_ID!,
    },
    body: JSON.stringify({
      modelUri: `art://${process.env.YANDEX_FOLDER_ID}/yandex-art/latest`,
      generationOptions: {
        seed: Math.floor(Math.random() * 1000000),
        aspectRatio: {
          widthRatio: input.width ? String(input.width / 256) : '4',
          heightRatio: input.height ? String(input.height / 256) : '4',
        },
      },
      messages: [
        {
          weight: 1,
          text: input.prompt,
        },
      ],
    }),
  });

  const operation = await response.json();

  // Poll for completion
  let result = operation;
  while (!result.done) {
    await new Promise((r) => setTimeout(r, 3000));
    const pollRes = await fetch(
      `https://llm.api.cloud.yandex.net/operations/${result.id}`,
      { headers: { Authorization: `Api-Key ${process.env.YANDEX_ART_API_KEY}` } }
    );
    result = await pollRes.json();
  }

  // Returns base64 encoded image
  return result.response.image;
}
