import { node } from './DomUtils.js';
import Card from './Card.js';

class WelcomePanel extends Card {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="welcome-panel">
				<Card content={node.toString()} />
			</div>
		);
	}

	initPanel(el,content) {
		this.initEl = el;
		this.initContent = content;
	}
};

//export default WelcomePanel;
export default { WelcomePanel };
