import { CustomCache } from "./Cache";

export class UnityCache extends CustomCache {
    /**
     * Blobs (.unityweb) de la aplicación
     */
    private RequireToCacheList = [
        ['dataUrl', undefined],
        ['wasmCodeUrl', undefined],
        ['wasmFrameworkUrl', undefined],
        ['wasmSymbolsUrl', undefined]
    ];
    // @ts-ignore
    private RequireToCacheMap = new Map(this.RequireToCacheList);

    private baseUrl = 'assets/unity/Build/';
    constructor(private resourceUrl: string) {
        super(resourceUrl);
        this.getUnityWebCached();
    }

    public async getUnityWebCached() {
        const json = await this.getData();
        super.isBlob = true;
        Array.from(this.RequireToCacheMap.keys()).forEach(async (unityweb: string) => {
            super.url = `${this.baseUrl}${json[unityweb]}`;
            const data = await this.getData();
            this.RequireToCacheMap.set(unityweb, data)
        });


    }





}