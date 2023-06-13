import { Checkbox, CheckboxProps } from "@mantine/core";
import { shallow } from "zustand/shallow";

import { settingsModel } from "@/entities/settings";
import { Icon } from "@/shared/ui";

type Props = {
	id: string;
}

export const Toggle = ({ id }: Props) => {
	const [ pathsMap, togglePath ] = settingsModel.useStore(
		(state) => [state.paths.pathsMap, state.togglePath],
		shallow
	);

	const isActive = pathsMap[id].isActive;

	const changeHandler = ({ currentTarget: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
		togglePath(id, checked);
	};

	const CheckboxIcon: CheckboxProps["icon"] = ({ className }) => (
		<Icon
			name="power_rounded"
			stroke="currentColor"
			strokeWidth={50}
			className={className}
		/>
	);

	return (
		<Checkbox
			icon={CheckboxIcon}
			size="lg"

			checked={isActive}
			onChange={changeHandler}

			indeterminate
		/>
	);
};
