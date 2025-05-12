import { Card, CardHeader, CardTitle } from '@/src/components/ui/card'

export default async function Page(propos: { 
    params: Promise<{
    taskId: string;
}>;
    searchParams: Promise<Record<string, string | string[]>>;
}) {
    const params = await propos.params;
    const searchParams = await propos.searchParams;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{JSON.stringify(params, null, 2)}</CardTitle>
                <CardTitle>{JSON.stringify(searchParams, null, 2)}</CardTitle>
            </CardHeader>
        </Card>
    );
}
