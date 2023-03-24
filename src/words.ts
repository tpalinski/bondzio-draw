import fs from 'fs'
import path from 'path'


export interface CategoryEntry {
	name: string,
	content: string[]
}

export default class WordGenerator{

	private categoryData: CategoryEntry[] = []
	private categoryMap: Map<string, number> = new Map();


	public constructor(categories: string[]){
		categories.forEach((category, index) => {
			this.parseCategory(category)
			this.categoryMap.set(category, index);
		})
	}
	
	public getData(): CategoryEntry[]{
		return this.categoryData;
	}
	
	public getCategory(categoryName: string): CategoryEntry {
			let idx = this.categoryMap.get(categoryName);
			if(idx !== undefined) return this.categoryData[idx]
			throw new TypeError("No such category");
	}

	private parseCategory(categoryName: string){
		// Look for categoryName.json file in categories directory
		let data = fs.readFileSync(path.resolve(__dirname, '..', 'categories', categoryName + '.json'))
		 //@ts-expect-error
		 let categoryData = JSON.parse(data);
		 this.categoryData.push(WordGenerator.validateJson(categoryData))
	}

	private static validateJson(json: Object): CategoryEntry {
		if (json.hasOwnProperty('name') &&
		    json.hasOwnProperty('content')){
			let res: CategoryEntry = {
				//@ts-expect-error
				name: json.name,
				//@ts-expect-error
				content: json.content
			}
			return res;
		} else {
			throw new TypeError("Malformed category.json file")
		}
	}
}
