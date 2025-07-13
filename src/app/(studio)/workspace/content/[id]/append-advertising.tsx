import { Button } from "@/components/ui/button";
// import { appendAdvertising } from "@/features/workspace/api/workspace";
import { RiFileVideoLine } from "react-icons/ri";


export default function UploadSubtitleForm({ id }: { id: number }) {

    // async function insertAdvertising(id: number) {
    // await appendAdvertising(id);
    // }

    return <>
        <h2 className="text-lg font-semibold mb-2 flex items-center">
            <RiFileVideoLine className="mr-2" />
            Appended the ad
        </h2>
        <div>
            <Button onClick={() => {
                console.log("Insert Ad button clicked for video ID:", id);
                // insertAdvertising(id)
            }} className="w-full" disabled>Insert Ad</Button>
        </div>
    </>
}