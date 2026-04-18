const FLUX_API_URL = 'https://api.replicate.com/v1/predictions';

interface FluxGenerateInput {
  prompt: string;
  width?: number;
  height?: number;
  numOutputs?: number;
}

export async function generateImageFlux(input: FluxGenerateInput): Promise<string[]> {
  const response = await fetch(FLUX_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'black-forest-labs/flux-1.1-pro', // Latest Flux model
      input: {
        prompt: input.prompt,
        width: input.width || 1024,
        height: input.height || 1024,
        num_outputs: input.numOutputs || 1,
        output_format: 'webp',
        output_quality: 90,
      },
    }),
  });

  const prediction = await response.json();

  // Poll for result
  let result = prediction;
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise((r) => setTimeout(r, 2000));
    const pollRes = await fetch(
      `https://api.replicate.com/v1/predictions/${result.id}`,
      { headers: { Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` } }
    );
    result = await pollRes.json();
  }

  if (result.status === 'failed') {
    throw new Error('Image generation failed');
  }

  return result.output as string[];
}
