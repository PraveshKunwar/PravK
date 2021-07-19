export interface JokeResponse {
   id: number;
   type: string;
   setup: string;
   punchline: string;
}

export interface QuoteResponse {
   _id: string;
   tags: string[];
   content: string;
   author: string;
   authorSlug: string;
   datedAdded: string;
   dateModified: string;
}
