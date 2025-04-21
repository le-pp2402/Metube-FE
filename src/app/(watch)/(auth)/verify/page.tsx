import { OtpForm } from "./otp-form";

interface VerifyOtpPageProps {
    searchParams: {
        email?: string;
    };
}

export default async function VerifyOtpPage({ searchParams }: VerifyOtpPageProps) {
    const emailToVerify = (await searchParams).email;

    if (!emailToVerify) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md mx-auto p-6 shadow rounded-xl border bg-white text-center">
                    <h1 className="text-2xl font-semibold mb-4 text-red-600">Verification Required</h1>
                    <p className="text-gray-700">
                        An email address is required to verify. Please ensure you followed the correct link or try registering again.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <OtpForm email={emailToVerify} />
        </div>
    );
}