

// Define your ResponseDTO class
export class ResponseDTO {
    public meta: {
        success: boolean;
        status: number;
        message: string;
    };
    public result: any;

    constructor(success: boolean, status: number, message: string, result: any) {
        this.meta = {
            success: success,
            status: status,
            message: message
        };
        this.result = result;
    }
}

// Function to create a success response
export function flushResponse(status: number, message: string, result: any, isSuccess?:boolean): ResponseDTO {
    return new ResponseDTO(isSuccess ?? true, status, message, result);
}
