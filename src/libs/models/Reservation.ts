import type { AnyObject } from '$libs/utils/types';
import { Document } from './Document';
export class Reservation extends Document {
	constructor(data: AnyObject = {}) {
		super(data);
		this._load(data);
		this._dbFields.push('text', 'done');
	}

	_collection = 'reservations';
	rsvName = '';
	phone = '';
	text = '';
	email = '';
	rsvCode = '';
	complete = false;
	pendingDelete = false;
	createdAt = new Date();
}