import { useState } from "react";

// Components
import { Input } from "./Input";

// Assets
import EyeIcon from "../../assets/eye-icon.svg";
import EyeLockIcon from "../../assets/eye-lock-icon.svg";

export function Password({ ...props }) {
	// States
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function onEyeClick() {
		setIsPasswordVisible(!isPasswordVisible);
	}

	function PasswordEyeElement() {
		if (isPasswordVisible)
			return <img src={EyeIcon} alt="User icon" onClick={onEyeClick} />;

		return <img src={EyeLockIcon} alt="User icon" onClick={onEyeClick} />;
	}

	return (
		<Input
			type={isPasswordVisible ? "text" : "password"}
			rightElement={<PasswordEyeElement />}
			{...props}
		/>
	);
}