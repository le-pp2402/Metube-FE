import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface VideoStatusCardProps {
    uploaded: number;
    processing: number;
    failed: number;
}

export function VideoStatusCard() {
    // TODO: get data from backend
    var uploaded = 12;
    var processing = 2;
    var failed = 1;
    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Video Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">{uploaded}</span>
                        <span className="text-sm text-gray-600">Uploaded</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-yellow-500">{processing}</span>
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