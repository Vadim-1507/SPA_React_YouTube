export default class VideoService {
    _apiBase = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video'

    async GetVideo(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`No fetch, статус: ${res.status}`);
        }
        return await res.json();
    }

    async SearchVideo(search, maxRes = 12, order = 'relevance') {
        const key = 'API_key';
        const url = `&key=${key}&maxResults=${maxRes}&q=${search}&order=${order}`;
        return await this.GetVideo(url);
    }
}
