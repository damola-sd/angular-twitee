export interface Twit {
    id: number,
    twit: string, 
    likes: number
    writer: {
        id: number,
        name: string,
    },
    comments: Array<{
        comment: string,
        writer: {
            id: number,
            name: string,
        } 
    }>
}