import { apiDelete, apiGet, apiPost, apiPut } from "../../config/apiClient";

export async function getContent() {
    return apiGet("/api/v1/contents");
}

export async function getContentById(id) {
    return apiGet(`/api/v1/contents/${id}`);
}

export async function getContentByNichId(nichId) {
    return apiGet(`/api/v1/contents?nichId=${encodeURIComponent(nichId)}`);
}

export async function createContent(contTitle, contBody, contType, nichId) {
    return apiPost("/api/v1/contents", {contTitle, contBody, contType, nichId});
}

export async function editContentById(id, contTitle, contBody, contType) {
    return apiPut(`/api/v1/contents/${id}`, {contTitle, contBody, contType});
} 

export async function deleteContentById(id) {
    return apiDelete(`/api/v1/contents/${id}`, null);
} 