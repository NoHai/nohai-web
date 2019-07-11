import * as localForage from 'localforage';

class StorageProviderController {
    private static instance: StorageProviderController;

    private constructor() {}

    static getInstance(): StorageProviderController {
        if (!StorageProviderController.instance) {
            StorageProviderController.instance = new StorageProviderController();
        }

        return StorageProviderController.instance;
    }

    async get(key: string) {
        return await localForage.getItem<string>(key);
    }

    async set(key: string, value: any) {
        await localForage.setItem(key, value);
    }

    async remove(key: string) {
        await localForage.removeItem(key);
    }
}

const StorageProvider: StorageProviderController = StorageProviderController.getInstance();
export default StorageProvider;
