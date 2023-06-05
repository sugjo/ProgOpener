import { Checkbox, CheckboxProps } from "@mantine/core";

import { settingsModel } from "@/entities/settings";
import { useActionCreators, useTypedSelector } from "@/shared/lib/store";
import { Icon } from "@/shared/ui";

type Props = {
	id: string;
}

export const Toggle = ({ id }: Props) => {
	const pathsMap = useTypedSelector((store) => store.settings.path.pathsMap);
	const actions = useActionCreators(settingsModel.actions.path);

	const { isActive } = pathsMap[id];

	const changeHandler = ({ currentTarget: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
		actions.toggle({ id, value: checked });
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
