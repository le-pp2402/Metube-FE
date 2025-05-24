import { MdOutlineSubtitles } from "react-icons/md";

export interface SubtitleFile {
    name: string;
    content: string;
    createdAt: string;
    uploadedBy: string;
}

export interface SubtitleListProps {
    subtitles: SubtitleFile[];
    selected: SubtitleFile | null;
    onSelect: (subtitle: SubtitleFile) => void;
    onDelete: (subtitle: SubtitleFile) => void;
}

export function SubtitleList({ subtitles, selected, onSelect, onDelete }: SubtitleListProps) {
    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <MdOutlineSubtitles className="mr-2" />
                Subtitles
            </h2>
            {subtitles.length === 0 ? (
                <div className="text-gray-500 text-sm">No subtitles available</div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-2 text-left font-medium">Name</th>
                                <th className="px-4 py-2 text-left font-medium">Uploaded By</th>
                                <th className="px-4 py-2 text-left font-medium">Created At</th>
                                <th className="px-4 py-2 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subtitles.map(sub => (
                                <tr
                                    key={sub.name}
                                    className={`border-b last:border-0 ${selected?.name === sub.name ? 'bg-green-100' : 'hover:bg-gray-50'}`}
                                >
                                    <td className="px-4 py-2">
                                        <button
                                            type="button"
                                            className="hover:underline"
                                            onClick={() => onSelect(sub)}
                                        >
                                            {sub.name}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">{sub.uploadedBy}</td>
                                    <td className="px-4 py-2">{sub.createdAt}</td>
                                    <td className="px-4 py-2 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onDelete(sub)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}