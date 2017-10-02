export const CacheSchema = {
    name: 'Cache',
    primaryKey: 'id',    
    properties: {
        id: { type: 'string', indexed: true },
        novel: { type: 'string' }
    }
}
