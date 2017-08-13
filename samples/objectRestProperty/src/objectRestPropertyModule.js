const newUser = { id: 123, name: 'John', createdAt: 10000229393, updatedAt: 10000782231 }
export const { id, name, ...metadata } = newUser

export const userCreatedAt = () => {
	return metadata.createdAt;
}