import type {FieldError} from "../../types/FieldError.ts";

declare global {
    interface Array<T> {
        /**
         * Converts an Ant Design FieldError array into a key-value error object.
         * Only callable on FieldError[] lists.
         */
        hasErrorsOf(this: FieldError[]): Record<string, boolean>;
    }
}

Array.prototype.hasErrorsOf = function (this: FieldError[]): Record<string, boolean> {
    const hasErrors: Record<string, boolean> = {}
    this.forEach(error => {
        hasErrors[error.name[0]] = error.errors.length > 0
    })
    return hasErrors
}


// er.forEach(error => {
//     hasErrors[error.name[0]] = error.errors.length > 0
//     setHasErrors({
//         ...hasErrors,
//     });
// })