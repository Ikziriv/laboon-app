import type { UserRec } from '../models'

export class Account {
	private props: UserRec;
	private loaded: boolean;

	private constructor(props?: UserRec, loaded?: boolean) {
		this.props = props;
		this.loaded = loaded || false;
	}

	static loggedIn(props: UserRec): Account {
		return new Account(props, true);
	}

	static loggedOut(): Account {
		return new Account(null, true);
	}

	static empty(): Account {
		return new Account();
	}

	get id(): string {
		return this.props?.uid;
	}

	get name(): string {
		return this.props?.displayName;
	}

	get email(): string {
		return this.props?.email;
	}

	get photoUrl(): string {
		return this.props?.photoURL;
	}

	get authState(): 'loggedIn' | 'loggedOut' | 'loading' {
		if (this.props) {
			return 'loggedIn';
		} else if (this.loaded) {
			return 'loggedOut';
		} else {
			return 'loading';
		}
	}
}