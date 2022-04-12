import FlexLayout1Design from 'generated/my-components/FlexLayout1';

export default class FlexLayout1 extends FlexLayout1Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
