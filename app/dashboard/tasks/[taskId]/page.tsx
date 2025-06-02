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
            <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-primary mb-2">Task details</CardTitle>
                <div className="flex flex-col gap-2 p-2 bg-white/80 rounded-lg border border-primary/10">
                    <span className="text-sm font-semibold text-gray-700">Parameters:</span>
                    <pre className="text-xs text-gray-600 bg-gray-50 rounded p-2 overflow-x-auto border border-gray-200">
                        {JSON.stringify(params, null, 2)}
                    </pre>
                    <span className="text-sm font-semibold text-gray-700">Search params:</span>
                    <pre className="text-xs text-gray-600 bg-gray-50 rounded p-2 overflow-x-auto border border-gray-200">
                        {JSON.stringify(searchParams, null, 2)}
                    </pre>
                </div>
            </CardHeader>
        </Card>
    );
}
