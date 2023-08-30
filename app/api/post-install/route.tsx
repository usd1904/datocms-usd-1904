import { NextResponse } from 'next/server';
import { ApiError, buildClient, Client } from '@datocms/cma-client-node';

const cors = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
};

async function vercelInitialization(
  vercelProjectId: string,
  vercelApiToken: string,
  baseUrl: string
) {
  return await fetch(
    `https://api.vercel.com/v10/projects/${vercelProjectId}/env`,
    {
      headers: {
        Authorization: `Bearer ${vercelApiToken}`,
      },
      method: 'post',
      body: JSON.stringify([
        {
          type: 'encrypted',
          key: 'BASE_URL',
          value: baseUrl,
          target: ['development', 'production', 'preview'],
        },
      ]),
    }
  );
}

/*
  These endpoints are called right after bootstrapping the Starter project...
  they can be removed afterwards!
*/

export async function OPTIONS() {
  return new Response('OK', cors);
}

const secretToken = 'superSecretToken';

async function installWebPreviewsPlugin(client: Client, baseUrl: string) {
  const webPreviewsPlugin = await client.plugins.create({
    package_name: 'datocms-plugin-web-previews',
  });

  await client.plugins.update(webPreviewsPlugin, {
    parameters: {
      frontends: [
        {
          name: 'Production',
          previewWebhook: `${baseUrl}/api/draft/preview-links?token=${secretToken}`,
        },
      ],
      startOpen: true,
    },
  });
}

async function installSEOAnalysisPlugin(client: Client, baseUrl: string) {
  const seoPlugin = await client.plugins.create({
    package_name: 'datocms-plugin-seo-readability-analysis',
  });

  await client.plugins.update(seoPlugin.id, {
    parameters: {
      htmlGeneratorUrl: `${baseUrl}/api/seoAnalysis?token=${secretToken}`,
      autoApplyToFieldsWithApiKey: 'seo_analysis',
      setSeoReadabilityAnalysisFieldExtensionId: true,
    },
  });
}

async function createCacheInvalidationWebhook(client: Client, baseUrl: string) {
  await client.webhooks.create({
    name: '🔄 Cache Revalidation',
    url: `${baseUrl}/api/revalidateCache?token=${secretToken}`,
    custom_payload: null,
    headers: {},
    events: [
      {
        filters: [],
        entity_type: 'item',
        event_types: ['create', 'update', 'delete', 'publish', 'unpublish'],
      },
      {
        filters: [],
        entity_type: 'item_type',
        event_types: ['create', 'update', 'delete'],
      },
      {
        filters: [],
        entity_type: 'upload',
        event_types: ['update', 'delete'],
      },
    ],
    http_basic_user: null,
    http_basic_password: null,
    enabled: true,
    payload_api_version: '3',
    nested_items_in_payload: false,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const client = buildClient({ apiToken: body.datocmsApiToken });

  const buildTriggers = await client.buildTriggers.list();

  const baseUrl = buildTriggers[0].frontend_url as string;

  await vercelInitialization(
    body.integrationInfo.vercelProjectId,
    body.integrationInfo.vercelApiToken,
    baseUrl
  );

  await client.buildTriggers.trigger(buildTriggers[0].id);

  try {
    await Promise.all([
      installWebPreviewsPlugin(client, process.env.VERCEL_BRANCH_URL!),
      createCacheInvalidationWebhook(
        client,
        process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL!
      ),
      installSEOAnalysisPlugin(client, process.env.NEXT_PUBLIC_VERCEL_URL!),
    ]);

    return NextResponse.json({ success: true }, cors);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          request: error.request,
          response: error.response,
        },
        { status: 500, ...cors }
      );
    }

    return NextResponse.json({ success: false }, { status: 500, ...cors });
  }
}
