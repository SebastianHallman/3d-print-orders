const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const logoutRequest = {
    method: "post",
    action: `${apiUrl}/logout`,
};

export default async function getCsrf() {
    const requestCsrf = await fetch(apiUrl + "/csrf", {credentials: "include"});
    const data = await requestCsrf.json();

    return data.token;

}
