import { Input as DefaultInput } from "./Input";
import { Password as PasswordInput } from "./Password";

export function Input({ ...props }) {
	return <DefaultInput {...props} />;
}

Input.Password = PasswordInput;