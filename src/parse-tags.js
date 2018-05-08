import { TemplateTagParser } from './template-tag-parser';

let parser = new TemplateTagParser();
if (parser.ask()) {

	let parts = [
		{ name: 'draft', value: draft.content },
		{ name: 'title', value: draft.title },
		{ name: 'body', value: draft.content.split('\n').slice(1).join('\n') },
		{ name: 'selection', value: editor.getSelectedText() },
		{ name: 'clipboard', value: app.getClipboard() }
	];
	
	parts.forEach(part => {
		let parsed = parser.parse(part.value);
		draft.setTemplateTag(`parsed_${part.name}`, parsed.text);
		draft.setTemplateTag(`parsed_${part.name}_html`, parsed.html);
	});

} else {
	context.cancel();
}