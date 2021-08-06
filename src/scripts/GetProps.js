// Functions to retrieve prop values

// Retrieve a prop value, allowing undefined values
export function getProp(props, field) {
	return props[field];
}

// Retrieve a prop value, throwing an error if the prop is not provided
export function getPropRequired(props, field, component_name) {
	if (props[field] === undefined) {
		// throw component_name + " component requires a \"" + field + "\" prop, but none was found.";
		throw `${component_name} component requires a \"${field}\" prop, but none was found.`;
	}
	return props[field];
}

// Retrieve a prop value, using a default value if the prop is not provided
export function getPropDefault(props, field, default_value) {
	return props[field] === undefined ? default_value : props[field];
}