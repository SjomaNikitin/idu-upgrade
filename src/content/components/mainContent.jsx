import { h } from 'preact';
import { Grades } from './widgets/grades.jsx';

export function MainContent() {
	return (
		<div className="widgets-grid">
			<Grades />
			<div className={"widget w2 h2"}>
				<div className="inner-widget" style={{ width: `100%`, height: `100%`}}></div>
			</div>
			<div className={"widget w2 h2"}>
				<div className="inner-widget" style={{ width: `100%`, height: `100%`}}></div>
			</div>
			<div className={"widget w2 h2"}>
				<div className="inner-widget" style={{ width: `100%`, height: `100%`}}></div>
			</div>
			<div className={"widget w2 h2"}>
				<div className="inner-widget" style={{ width: `100%`, height: `100%`}}></div>
			</div>
		</div>
	);
}
