import LivePage from "./watch-live";

export default async function LiveWrapper({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;

    return <LivePage idLiveSession={resolvedParams.id} />;
}
