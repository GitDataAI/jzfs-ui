import {apiRequest} from "../index"

export class Config {
    async getStorageConfig() {
        const response = await apiRequest('/config', {
            method: 'GET',
        });
        let cfg, storageCfg;
        switch (response.status) {
            case 200:
                cfg = await response.json();
                storageCfg = cfg.storage_config
                storageCfg.warnings = []
                if (storageCfg.blockstore_type === 'mem') {
                    storageCfg.warnings.push(`Block adapter ${storageCfg.blockstore_type} not usable in production`)
                }
                return storageCfg;
            case 409:
                throw new Error('Conflict');
            default:
                throw new Error('Unknown');
        }
    }

    async getLakeFSVersion() {
        const response = await apiRequest('/config', {
            method: 'GET',
        });
        let cfg;
        switch (response.status) {
            case 200:
                cfg =  await response.json();
                return cfg.version_config
            default:
                throw new Error('Unknown');
        }
    }
}