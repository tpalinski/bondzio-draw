import fs from 'fs'
import path from 'path'


export interface CategoryEntry {
	name: string,
	content: string[]
}

export default class WordGenerator{

	private categoryData: CategoryEntry[] = []

	public constructor(categories: string[]){
		categories.forEach(category => {
			this.parseCategory(category)
		})
	}
	
	public getData(): CategoryEntry[]{
		return this.categoryData;
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
