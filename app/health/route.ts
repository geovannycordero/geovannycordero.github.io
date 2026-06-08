export const dynamic = 'force-static';

export async function GET() {
  return Response.json({
    status: 'ok',
    built_at: new Date().toISOString(),
  });
}
