import fs from 'fs'

export interface CategoryEntry {
	name: string,
	content: string[]
}

export default class WordGenerator{

	private categoryData: 

	public constructor(categories: string[]){
		
	}
	
	private parseCategory(categoryName: string){
		// Look for categoryName.json file in categories directory
		fs.readFile('../categories/' + categoryName + '.json', (err: Error, data) => {
			if (err) throw err;
			let categoryData = JSON.parse(data);

		})
	}
}
