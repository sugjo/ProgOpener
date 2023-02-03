import React from "react";

import styles from "./Icon.module.css";

type Props = {
    name: string;
    prefix: string;
    color: string;
    size: number;
}



const Icon = ({ name, prefix, color, size }: Props) => {
	const symbolId = `#${prefix}-${name}`;
	return (
		<svg style={{ width: size, height: size }} className={styles.icon}  aria-hidden="true">
			<use href={symbolId} fill={color} />
		</svg>
	);
};

Icon.defaultProps = {
	prefix: "icon",
	color: "currentColor",
	size: 32
};

export default Icon;