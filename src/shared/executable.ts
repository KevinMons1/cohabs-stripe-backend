export interface Executable<Request, Response> {
    execute(request: Request): Promise<Response>;
}
