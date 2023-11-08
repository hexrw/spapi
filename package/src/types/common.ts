export type Severity = "ERROR" | "WARNING" | "INFO"

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface Issue {
    code: string
    message: string
    severity: Severity
    attributeNames?: Record<string, unknown>
}

export interface Money {
    currencyCode: string
    amount: string
}

export interface Points { pointsNumber: number }
