"use server";

import { ResourceResponse, ResourceUpdateInfo, ResourceUpdateRequest } from "@/types/resource";
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:8080";

export default async function fetchResourcesServer(): Promise<
    ResourceResponse[]
> {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/workspace/content`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(res);
    if (!res.ok) throw new Error("Failed to fetch resources");
    const data = await res.json();
    console.log("FILE[fetchResourcesServer] | data", data);
    return data.data;
}

export async function fetchResourcesServerById(
    id: number
): Promise<ResourceUpdateInfo> {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    const res = await fetch(`${BACKEND_API_URL}/workspace/content/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch resources");
    const data = await res.json();
    console.log("FILE[fetchResourcesServer] | data", data);
    return data.data;
}

export async function updateResources(
    id: number,
    resource?: ResourceUpdateRequest
) {
    try {
        if (!resource) {
            throw new Error("Resource data is required");
        }

        const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

        const response = await fetch(
            `${BACKEND_API_URL}/workspace/content/${id}`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(resource),
            }
        );

        console.log("FILE[updateResources] | response", response);

        if (!response.ok) {
            return {
                success: false,
                error: "Failed to update resource",
                message: "Failed to update resource",
            }
        }

        const updatedResource = await response.json();

        return {
            success: true,
            data: updatedResource,
            message: "Resource updated successfully",
        };
        
    } catch (error) {
        console.error("Error updating resource:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
            message: "Failed to update resource",
        };
    }
}
