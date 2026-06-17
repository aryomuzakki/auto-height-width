"use client";

import * as React from "react";
import { Button } from "#/components/ui/button";
import { useContentSizeVars } from "@/hooks/use-content-size-vars";

export function AnimatedSizeBox() {
	const [open, setOpen] = React.useState(false);

	const { wrapperRef, contentRef } = useContentSizeVars();

	return (
		<div className="space-y-2">
			<Button type="button" onClick={() => setOpen((v) => !v)}>
				Toggle
			</Button>

			<div
				ref={wrapperRef}
				className="h-(--content-height) w-(--content-width) overflow-hidden rounded-md bg-green-400/50 transition-[width,height] duration-1000 ease-in-out"
			>
				<div ref={contentRef} className="w-max bg-amber-800 p-4">
					{open ? (
						<div className="">
							<h3>Expanded content</h3>
							<p>
								This content is taller and wider. The wrapper will animate to
								match this size.
							</p>
							<p>
								Because the wrapper uses measured CSS variables, width and
								height can transition smoothly.
							</p>
						</div>
					) : (
						<div>
							<h3>Small content</h3>
							<p>Short text.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
