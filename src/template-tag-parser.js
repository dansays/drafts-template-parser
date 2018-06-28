export class TemplateTagParser {
	
	constructor(template = draft.content) {
		this.template = template;
	}

	get tags() {
		const reservedTags = [
			'body',
			'clipboard',
			'created_latitude',
			'created_longitude',
			'created',
			'date',
			'draft_open_url',
			'draft',
			'latitude',
			'longitude',
			'modified_latitude',
			'modified_longitude',
			'modified',
			'selection_length',
			'selection_start',
			'selection',
			'time',
			'title',
			'uuid',
		];		

		const pattern = /\[\[([\w ]+)\]\]/g;
		let tags = new Set();
		let match;

		while (match = pattern.exec(this.template)) {
			tags.add(match[1]);
		}
		
		return Array.from(tags)
			.filter(tag => !reservedTags.includes(tag));
	}
	
	ask(title = 'Template Questions') {
		let tags = this.tags;
		if (tags.length == 0) return true;
		
		let prompt = Prompt.create();
		prompt.title = title;
		tags.forEach(tag => prompt.addTextField(tag, tag, ''));
		prompt.addButton('Okay');

		if (!prompt.show()) return false;
		tags.forEach(tag => {
			draft.setTemplateTag(tag, prompt.fieldValues[tag]);
			console.log(`Setting ${tag} to ${prompt.fieldValues[tag]}`);
		});
		
		return true;
	}
	
	parse(str) {
		let text = draft.processTemplate(str);
		let html = MultiMarkdown.create().render(text);
		return { text, html };
	}
}
