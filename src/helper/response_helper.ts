

//class to structure all response within the API, as a common format
export class ResponseDTO {
    public status: number;
    public message: string;
    public data: any;

    constructor(status: number, message: string, data: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

/**
 * Creates a new instance of {@link ResponseDTO} with the provided status, message, and data.
 *
 * @param status - The HTTP status code for the response.
 * @param message - A brief description of the response.
 * @param data - The payload of the response.
 *
 * @returns A new instance of {@link ResponseDTO} with the provided parameters.
 */
export function responseSuccess(status: number, message: string, data: any): ResponseDTO {
    return new ResponseDTO(status, message, data);
}