export interface User  {
    readonly email: String,
    readonly hash: String,
    readonly name: String,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly verified: Boolean
}