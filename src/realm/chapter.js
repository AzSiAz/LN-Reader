export const ChapterSchema = {
    name: 'Chapter',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', indexed: true },
        html: 'string'
    }
}
