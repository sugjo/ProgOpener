import React from "react";

type Props = {
    name: string;
    size: number;
}

function AppIcon(props: Props) {
	return (
		<img
			src={`https://ocular.icons/${props.name}`}
			style={{ width: props.size, height: props.size }}
			alt="test"
		/>
	);
}

AppIcon.defaultProps = {
	size: 32
};

export default AppIcon;