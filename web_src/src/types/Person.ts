export default interface Person {
    firstName: string
    lastName: string
    birthDay: number
    birthMonth: number
    birthYear: number
    gender: "male" | "female" | "unknown"
    email?: string
    phone?: string
}