export const dynamic = 'force-static';

const BUILT_AT = new Date().toISOString();

export async function GET() {
  return Response.json({
    status: 'ok',
    built_at: BUILT_AT,
  });
}
