import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SubtitleStatusCardProps {
    requested: number;
    processing: number;
    failed: number;
}

export function SubtitleStatusCard() {
    // TODO: get data from backend
    var requested = 3;
    var processing = 1;
    var failed = 2;
    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Subtitle Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-500">{requested}</span>
                        <span className="text-sm text-gray-600">Requested</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-500">{processing}</span>
                        <span className="text-sm text-gray-600">Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-red-500">{failed}</span>
                        <span className="text-sm text-gray-600">Failed</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}