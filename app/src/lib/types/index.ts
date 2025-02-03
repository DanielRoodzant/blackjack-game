export interface GetNewDeckResponse {
	success?: boolean;
	deck_id?: string;
	shuffled?: boolean;
	remaining?: number;
}

export interface Images {
	svg?: string;
	png?: string;
}

export interface Card {
	code?: string;
	image?: string;
	images?: Images;
	value?: string;
	suit?: string;
}

export interface DrawCardsResponse {
	success?: boolean;
	deck_id?: string;
	cards?: Card[];
	remaining?: number;
}
