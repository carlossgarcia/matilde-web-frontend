export class CustomCache {
    protected isBlob = false;
    constructor(protected url: string) { }

    /**
     * Tomado de https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
     * @param cacheName 
     * @param url 
     */
    protected async getData() {
        const cacheVersion = 1;
        const cacheName = `myapp-${cacheVersion}`;
        const url = this.url;
        let cachedData = await this.getCachedData(cacheName, url);

        if (cachedData) {
            console.log('Retrieved cached data');
            return cachedData;
        }

        console.log('Fetching fresh data');

        const cacheStorage = await caches.open(cacheName);
        console.log(url);

        await cacheStorage.add(url);
        cachedData = await this.getCachedData(cacheName, url);
        await this.deleteOldCaches(cacheName);

        return cachedData;
    }

    /**
     * Tomado de https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
     * @param cacheName 
     * @param url 
     */
    protected async getCachedData(cacheName, url) {
        const cacheStorage = await caches.open(cacheName);
        const cachedResponse = await cacheStorage.match(url);

        if (!cachedResponse || !cachedResponse.ok) {
            return false;
        }
        if (this.isBlob) {
            return await cachedResponse.blob();
        } else {
            return await cachedResponse.json();

        }
    }

    /**
     * Tomado de https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
     * @param cacheName 
     * @param url 
     */
    protected async deleteOldCaches(currentCache) {
        const keys = await caches.keys();

        for (const key of keys) {
            const isOurCache = 'myapp-' === key.substr(0, 6);

            if (currentCache === key || !isOurCache) {
                continue;
            }

            caches.delete(key);
        }
    }
}