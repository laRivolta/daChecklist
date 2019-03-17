export class Todo {
	id: number;
	title: string;
	timescale: string;
	completed: boolean;

	constructor(id: number, title: string, timescale?: string, completed?: boolean) {
		this.id = id;
		this.title = title;
		this.timescale = timescale ? timescale : "";
		this.completed = completed ? completed : false;
	}
}

export class TodoUtils {

	static copy(todo: Todo) {
		const copy = new Todo(null, null);
		this.copyProperties(todo, copy);
		return copy;
	}

	static copyProperties(src: Todo, dest: Todo) {
		dest.id = src.id;
		dest.title = src.title;
		dest.timescale = src.timescale;
		dest.completed = src.completed;
	}
}

export enum TodoTimescale {
    Priority1 = 1,
    Priority2 = 2
}
