interface Request {
    id: string;
};

class DeleteDocumentLogService {
    public async execute({id}: Request): Promise<void> {
        throw new Error('for delete document logs, contact administrator');
    }
}

export default DeleteDocumentLogService;