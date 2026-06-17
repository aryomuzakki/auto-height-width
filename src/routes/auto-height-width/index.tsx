import { createFileRoute } from "@tanstack/react-router";
import { AnimatedSizeBox } from "#/components/auto-height-width-example/animated-size-box";

export const Route = createFileRoute("/auto-height-width/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-1 flex-col gap-6 p-8">
			<h2>Example</h2>
			<div className="">
				<AnimatedSizeBox />
			</div>
		</div>
	);
}
