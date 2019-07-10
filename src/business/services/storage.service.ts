import * as localForage from 'localforage';

class StorageServiceController {
    private static instance: StorageServiceController;

    private constructor() {}

    static getInstance(): StorageServiceController {
        if (!StorageServiceController.instance) {
            StorageServiceController.instance = new StorageServiceController();
        }

        return StorageServiceController.instance;
    }

    async get(key: string) {
        return await localForage.getItem(key);
    }

    async set(key: string, value: any) {
        await localForage.setItem(key, value);
    }
}

const StorageService: StorageServiceController = StorageServiceController.getInstance();
export default StorageService;