export type candidate = {
    answer:string,
    sources:string[],
    mode: 'web'|'direct',
}

export type ModeResponse = {
    q : string,
    mode : 'web'|'direct'
}

// for simple answers
