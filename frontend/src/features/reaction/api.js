import { apiDelete, apiGet, apiPost, apiPut } from "../../config/apiClient";

export async function getReactionByContentId(contId) {
    return apiGet(`/api/v1/contents/${contId}/reactions`);
}